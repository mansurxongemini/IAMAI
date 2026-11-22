import type {
  AdaptRoadmapInput,
  Blueprint,
  GeminiDeltaPatch,
  ModuleAdjustment,
  PriorityLevel,
  Roadmap,
  RoadmapNode,
  RoadmapPhase,
} from './schemas';

export interface RoadmapProgress {
  completedSteps: number;
  totalSteps: number;
  percentComplete: number;
  activeModules: number;
  skippedModules: number;
}

function addDays(baseDate: Date, days: number): Date {
  const result = new Date(baseDate.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

export function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** A plan never asks for more than this multiple of the expert baseline; the rest of the budget stays free. */
export const MAX_BUDGET_OVER_BASELINE = 2;
/** The model's per-module hours are kept within this band around the module baseline. */
const MODULE_WEIGHT_MIN = 0.4;
const MODULE_WEIGHT_MAX = 3;

/** Calendar day `n` days after a UTC-midnight `start` (plans are dated in whole days, never times). */
const dayIso = (start: Date, n: number) => formatIsoDate(addDays(start, n));

/**
 * Deterministic 0-token schedule engine.
 * Combines a pre-authored expert Blueprint with a lightweight Gemini Delta Patch:
 * - hours: the model's per-module hours are weights, clamped to 0.4–3x the module baseline; the plan
 *   fills the user's budget (deadlineDays x dailyHours) but never more than 2x the blueprint's own
 *   baseline, so a long deadline does not turn a 42-hour course into 4,000 hours;
 * - dates: every active module gets a share of the deadline proportional to its hours, back to back,
 *   inclusive start and end dates, none past the day before the deadline;
 * - a patch that skips every module is ignored (an empty plan helps nobody).
 */
export function applyDeltaPatchAndSchedule(params: {
  roadmapId: string;
  ownerId: string;
  blueprint: Blueprint;
  input: AdaptRoadmapInput;
  deltaPatch: GeminiDeltaPatch;
  startDate?: Date;
}): Roadmap {
  const { roadmapId, ownerId, blueprint, input, deltaPatch } = params;
  const now = params.startDate ? new Date(params.startDate.getTime()) : new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const nowIso = new Date().toISOString();
  const D = Math.max(1, input.deadlineDays);

  const adjustmentMap = new Map<string, ModuleAdjustment>();
  for (const adj of deltaPatch.moduleAdjustments) adjustmentMap.set(adj.moduleId, adj);

  const allModules = blueprint.phases.flatMap((p) => p.modules);
  const priorityOf = new Map<string, PriorityLevel>();
  for (const mod of allModules) priorityOf.set(mod.id, adjustmentMap.get(mod.id)?.priority ?? 'normal');
  // A patch that skips everything is treated as no patch at all.
  if (allModules.every((m) => priorityOf.get(m.id) === 'skip')) {
    for (const mod of allModules) priorityOf.set(mod.id, 'normal');
  }

  // Relative weights per active module.
  const weight = new Map<string, number>();
  let weightSum = 0;
  let activeBaseline = 0;
  for (const mod of allModules) {
    const priority = priorityOf.get(mod.id)!;
    if (priority === 'skip') continue;
    const adj = adjustmentMap.get(mod.id);
    let w: number;
    if (adj && adj.priority !== 'skip' && adj.allocatedHours > 0) {
      w = Math.min(mod.baselineHours * MODULE_WEIGHT_MAX, Math.max(mod.baselineHours * MODULE_WEIGHT_MIN, adj.allocatedHours));
    } else {
      w = mod.baselineHours * (priority === 'high' ? 1.25 : priority === 'low' ? 0.7 : 1);
    }
    weight.set(mod.id, w);
    weightSum += w;
    activeBaseline += mod.baselineHours;
  }

  const budgetHours = D * input.dailyHours;
  const plannedHours = Math.min(budgetHours, activeBaseline * MAX_BUDGET_OVER_BASELINE);

  // Whole days per module, proportional to weight. When the deadline has at least one day per module,
  // every module gets one and the rest go by largest remainder, so ranges are back to back and never
  // share a day; with fewer days than modules, ranges are proportional and may share days.
  const active = allModules.filter((m) => weight.has(m.id));
  const dayCount = new Map<string, number>();
  if (D >= active.length) {
    const spare = D - active.length;
    const exact = active.map((m) => ({ id: m.id, x: (weight.get(m.id)! / weightSum) * spare }));
    let left = spare - exact.reduce((s, e) => s + Math.floor(e.x), 0);
    for (const e of exact) dayCount.set(e.id, 1 + Math.floor(e.x));
    for (const e of [...exact].sort((a, b) => (b.x % 1) - (a.x % 1))) {
      if (left-- <= 0) break;
      dayCount.set(e.id, dayCount.get(e.id)! + 1);
    }
  }

  let cumulative = 0;
  let nextDay = 0;
  let totalAllocatedHours = 0;
  const slot = new Map<string, { hours: number; from: number; to: number }>();
  for (const mod of active) {
    const w = weight.get(mod.id)!;
    let from: number;
    let toExclusive: number;
    if (dayCount.size) {
      from = nextDay;
      toExclusive = from + dayCount.get(mod.id)!;
      nextDay = toExclusive;
    } else {
      from = Math.min(D - 1, Math.round((cumulative / weightSum) * D));
      toExclusive = Math.min(D, Math.max(from + 1, Math.round(((cumulative + w) / weightSum) * D)));
    }
    cumulative += w;
    const hours = Math.max(0.5, Number(((w / weightSum) * plannedHours).toFixed(1)));
    totalAllocatedHours = Number((totalAllocatedHours + hours).toFixed(1));
    slot.set(mod.id, { hours, from, to: toExclusive - 1 });
  }

  let lastDay = 0;
  const scheduledPhases: RoadmapPhase[] = blueprint.phases.map((phase) => {
    const modules: RoadmapNode[] = phase.modules.map((mod) => {
      const adj = adjustmentMap.get(mod.id);
      const s = slot.get(mod.id);
      const base = {
        id: mod.id,
        title: mod.title,
        summary: mod.summary,
        difficulty: mod.difficulty,
        keyFramework: mod.keyFramework,
        customFocus: adj?.customFocus,
      };
      if (!s) {
        const marker = dayIso(start, Math.min(lastDay, D - 1));
        return { ...base, priority: 'skip' as const, allocatedHours: 0, startDate: marker, endDate: marker, weekRange: '—', steps: mod.steps.map((step) => ({ ...step, completed: true })) };
      }
      lastDay = s.to;
      const startWeek = Math.floor(s.from / 7) + 1;
      const endWeek = Math.floor(s.to / 7) + 1;
      return {
        ...base,
        priority: priorityOf.get(mod.id)!,
        allocatedHours: s.hours,
        startDate: dayIso(start, s.from),
        endDate: dayIso(start, s.to),
        weekRange: startWeek === endWeek ? `W${startWeek}` : `W${startWeek}–W${endWeek}`,
        steps: mod.steps.map((step) => ({ ...step, completed: false })),
      };
    });
    const active = phase.modules.map((m) => slot.get(m.id)).filter((x): x is { hours: number; from: number; to: number } => Boolean(x));
    const from = active.length ? Math.min(...active.map((x) => x.from)) : Math.min(lastDay, D - 1);
    const to = active.length ? Math.max(...active.map((x) => x.to)) : from;
    return {
      id: phase.id,
      order: phase.order,
      title: phase.title,
      objective: phase.objective,
      startDate: dayIso(start, from),
      endDate: dayIso(start, to),
      modules,
    };
  });

  return {
    id: roadmapId,
    ownerId,
    blueprintId: blueprint.id,
    category: blueprint.category,
    title: blueprint.title,
    locale: input.locale,
    currentLevel: input.currentLevel,
    targetGoal: input.targetGoal,
    deadlineDate: dayIso(start, D),
    deadlineDays: D,
    dailyHours: input.dailyHours,
    totalAllocatedHours,
    strategySummary: deltaPatch.strategySummary,
    dailySlotRecommendation: deltaPatch.dailySlotRecommendation,
    status: 'active',
    phases: scheduledPhases,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

/** Minutes a day the plan actually asks for (≤ the user's daily hours when the budget was capped). */
export function plannedDailyMinutes(roadmap: Roadmap): number {
  const perDay = (roadmap.totalAllocatedHours / Math.max(1, roadmap.deadlineDays)) * 60;
  return Math.max(15, Math.round(Math.min(roadmap.dailyHours * 60, perDay) / 5) * 5);
}

export type Feasibility =
  | { status: 'ok' }
  /** The budget is well below what the expert curriculum needs: daily hours that would cover ~80% of it. */
  | { status: 'tight'; budgetHours: number; baselineHours: number; suggestedDailyHours: number }
  /** More time than the curriculum can use: the plan asks for less per day than offered. */
  | { status: 'light'; plannedDailyMinutes: number };

/** How realistic the user's budget is against the blueprint's baseline hours. */
export function assessFeasibility(roadmap: Roadmap, baselineTotalHours: number): Feasibility {
  const budget = roadmap.deadlineDays * roadmap.dailyHours;
  if (budget < baselineTotalHours * 0.6) {
    const suggested = Math.min(12, Math.ceil(((baselineTotalHours * 0.8) / roadmap.deadlineDays) * 2) / 2);
    return { status: 'tight', budgetHours: Math.round(budget), baselineHours: baselineTotalHours, suggestedDailyHours: suggested };
  }
  const planned = plannedDailyMinutes(roadmap);
  if (planned < roadmap.dailyHours * 60 * 0.85) return { status: 'light', plannedDailyMinutes: planned };
  return { status: 'ok' };
}

export function computeRoadmapProgress(roadmap: Roadmap): RoadmapProgress {
  let completedSteps = 0;
  let totalSteps = 0;
  let activeModules = 0;
  let skippedModules = 0;

  for (const phase of roadmap.phases) {
    for (const mod of phase.modules) {
      if (mod.priority === 'skip') {
        skippedModules += 1;
        continue;
      }
      activeModules += 1;
      for (const step of mod.steps) {
        totalSteps += 1;
        if (step.completed) {
          completedSteps += 1;
        }
      }
    }
  }

  const percentComplete = totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);
  return {
    completedSteps,
    totalSteps,
    percentComplete,
    activeModules,
    skippedModules,
  };
}

export function toggleRoadmapStep(roadmap: Roadmap, moduleId: string, stepId: string): Roadmap {
  const updatedPhases = roadmap.phases.map((phase) => ({
    ...phase,
    modules: phase.modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      return {
        ...mod,
        steps: mod.steps.map((step) =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        ),
      };
    }),
  }));

  const nextRoadmap: Roadmap = {
    ...roadmap,
    phases: updatedPhases,
    updatedAt: new Date().toISOString(),
  };

  const progress = computeRoadmapProgress(nextRoadmap);
  if (progress.totalSteps > 0 && progress.completedSteps === progress.totalSteps) {
    nextRoadmap.status = 'completed';
  } else if (nextRoadmap.status === 'completed') {
    nextRoadmap.status = 'active';
  }

  return nextRoadmap;
}

/**
 * Deterministic canonical cache key for Firestore `/blueprintCache/{nodeHash}`
 * Eliminates duplicate Gemini calls on repeated canonical questions for the same blueprint node.
 */
export function computeNodeCacheHash(
  blueprintId: string,
  nodeId: string,
  locale: 'en' | 'uz',
  question: string
): string {
  const normalized = question
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const source = `${blueprintId}:${nodeId}:${locale}:${normalized}`;
  let hash = 2166136261;
  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, '0');
  return `${blueprintId}_${nodeId}_${locale}_${hex}`.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
}

const words = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯʻʼ‘’']/g, '')
    .split(/[^a-z0-9Ѐ-ӿ]+/)
    .filter((w) => w.length >= 4);

const clock = (minutes: number) => `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

/** A realistic daily window: evenings for short days, a morning + evening split for long ones. */
export function suggestDailySlot(dailyHours: number, locale: 'en' | 'uz'): string {
  const total = Math.round(dailyHours * 60);
  if (total <= 240) {
    const from = 19 * 60;
    return locale === 'uz' ? `${clock(from)}–${clock(from + total)} (${dailyHours} soat chuqur fokus)` : `${clock(from)}–${clock(from + total)} (${dailyHours}h focus block)`;
  }
  const morning = Math.ceil(total / 2 / 15) * 15;
  const evening = total - morning;
  const a = `${clock(8 * 60)}–${clock(8 * 60 + morning)}`;
  const b = `${clock(17 * 60)}–${clock(17 * 60 + evening)}`;
  return locale === 'uz' ? `${a} va ${b} (jami ${dailyHours} soat, ikki blok)` : `${a} and ${b} (${dailyHours}h in two blocks)`;
}

/**
 * Expert-order delta patch for the mobile demo seed and the tests. The web app never uses it in place
 * of the AI: when Gemini cannot answer, the learner is told the connection was lost.
 */
export function buildSeedDeltaPatch(blueprint: Blueprint, input: AdaptRoadmapInput): GeminiDeltaPatch {
  const allModules = blueprint.phases.flatMap((p) => p.modules);
  const weak = new Set(words(`${input.weakAreas ?? ''}`));
  const matches = (mod: (typeof allModules)[number]) =>
    words(`${mod.title.en} ${mod.title.uz} ${mod.keyFramework}`).some((w) =>
      [...weak].some((x) => w.startsWith(x.slice(0, 5)) || x.startsWith(w.slice(0, 5)))
    );

  const adjustments: ModuleAdjustment[] = allModules.map((mod) => {
    const high = weak.size > 0 && matches(mod);
    return {
      moduleId: mod.id,
      priority: high ? 'high' : 'normal',
      allocatedHours: Number((mod.baselineHours * (high ? 1.4 : 1)).toFixed(1)),
      customFocus:
        input.locale === 'uz'
          ? high
            ? `Zaif tomon sifatida belgilangan: «${mod.title.uz}» boʻyicha mashqlar koʻpaytiriladi.`
            : `«${mod.title.uz}» mutaxassis rejasi asosida.`
          : high
            ? `Flagged as a weak area: extra drills in ${mod.keyFramework}.`
            : `Follows the expert plan for ${mod.keyFramework}.`,
    };
  });

  return {
    strategySummary:
      input.locale === 'uz'
        ? `${input.deadlineDays} kunlik reja (${input.dailyHours} soat/kun): ${input.currentLevel} darajadan ${input.targetGoal} maqsadiga mutaxassislar tartibida.`
        : `${input.deadlineDays}-day plan (${input.dailyHours}h/day): from ${input.currentLevel} to ${input.targetGoal} in the expert order.`,
    moduleAdjustments: adjustments,
    dailySlotRecommendation: suggestDailySlot(input.dailyHours, input.locale),
  };
}
