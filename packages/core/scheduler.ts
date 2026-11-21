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

/**
 * Deterministic 0-token schedule engine.
 * Combines a pre-authored expert Blueprint with a lightweight Gemini Delta Patch
 * and allocates exact calendar dates, week ranges, and hour budgets inside the user's deadline.
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
  const start = params.startDate ? new Date(params.startDate.getTime()) : new Date();
  const nowIso = start.toISOString();

  const adjustmentMap = new Map<string, ModuleAdjustment>();
  for (const adj of deltaPatch.moduleAdjustments) {
    adjustmentMap.set(adj.moduleId, adj);
  }

  const totalBudgetHours = Math.max(4, Number((input.deadlineDays * input.dailyHours).toFixed(1)));

  // First pass: gather raw requested/baseline hours for non-skipped modules
  const rawModuleHours = new Map<string, number>();
  let rawSum = 0;

  for (const phase of blueprint.phases) {
    for (const mod of phase.modules) {
      const adj = adjustmentMap.get(mod.id);
      const priority: PriorityLevel = adj?.priority ?? 'normal';
      if (priority === 'skip') {
        rawModuleHours.set(mod.id, 0);
        continue;
      }

      let baseWeight = adj && adj.allocatedHours > 0 ? adj.allocatedHours : mod.baselineHours;
      if (priority === 'high' && (!adj || adj.allocatedHours <= 0)) {
        baseWeight = mod.baselineHours * 1.25;
      } else if (priority === 'low' && (!adj || adj.allocatedHours <= 0)) {
        baseWeight = mod.baselineHours * 0.7;
      }
      rawModuleHours.set(mod.id, baseWeight);
      rawSum += baseWeight;
    }
  }

  // Ensure at least one module stays active if patch skipped everything accidentally
  if (rawSum <= 0) {
    for (const phase of blueprint.phases) {
      for (const mod of phase.modules) {
        rawModuleHours.set(mod.id, mod.baselineHours);
        rawSum += mod.baselineHours;
      }
    }
  }

  // Scale hours proportionally so total fits cleanly inside the user's real hour budget
  const scaleFactor = totalBudgetHours / rawSum;

  let cursorDayOffset = 0;
  let totalAllocatedHours = 0;

  const scheduledPhases: RoadmapPhase[] = blueprint.phases.map((phase) => {
    const phaseStartOffset = cursorDayOffset;
    const modules: RoadmapNode[] = phase.modules.map((mod) => {
      const adj = adjustmentMap.get(mod.id);
      const priority: PriorityLevel = adj?.priority ?? 'normal';
      const rawHours = rawModuleHours.get(mod.id) ?? 0;

      if (priority === 'skip' || rawHours <= 0) {
        const markerDate = formatIsoDate(addDays(start, Math.min(cursorDayOffset, input.deadlineDays)));
        return {
          id: mod.id,
          title: mod.title,
          summary: mod.summary,
          difficulty: mod.difficulty,
          keyFramework: mod.keyFramework,
          priority: 'skip',
          allocatedHours: 0,
          customFocus: adj?.customFocus,
          startDate: markerDate,
          endDate: markerDate,
          weekRange: '—',
          steps: mod.steps.map((step) => ({
            ...step,
            completed: true,
          })),
        };
      }

      const scaledHours = Math.max(1, Number((rawHours * scaleFactor).toFixed(1)));
      totalAllocatedHours = Number((totalAllocatedHours + scaledHours).toFixed(1));

      const spanDays = Math.max(1, Math.round(scaledHours / Math.max(0.5, input.dailyHours)));
      const modStartOffset = Math.min(cursorDayOffset, Math.max(0, input.deadlineDays - 1));
      const modEndOffset = Math.min(input.deadlineDays, modStartOffset + spanDays);
      cursorDayOffset = modEndOffset;

      const startWeek = Math.floor(modStartOffset / 7) + 1;
      const endWeek = Math.max(startWeek, Math.floor(Math.max(0, modEndOffset - 1) / 7) + 1);
      const weekRange = startWeek === endWeek ? `W${startWeek}` : `W${startWeek}–W${endWeek}`;

      return {
        id: mod.id,
        title: mod.title,
        summary: mod.summary,
        difficulty: mod.difficulty,
        keyFramework: mod.keyFramework,
        priority,
        allocatedHours: scaledHours,
        customFocus: adj?.customFocus,
        startDate: formatIsoDate(addDays(start, modStartOffset)),
        endDate: formatIsoDate(addDays(start, modEndOffset)),
        weekRange,
        steps: mod.steps.map((step) => ({
          ...step,
          completed: false,
        })),
      };
    });

    const phaseEndOffset = Math.max(phaseStartOffset + 1, cursorDayOffset);
    return {
      id: phase.id,
      order: phase.order,
      title: phase.title,
      objective: phase.objective,
      startDate: formatIsoDate(addDays(start, Math.min(phaseStartOffset, input.deadlineDays))),
      endDate: formatIsoDate(addDays(start, Math.min(phaseEndOffset, input.deadlineDays))),
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
    deadlineDate: formatIsoDate(addDays(start, input.deadlineDays)),
    deadlineDays: input.deadlineDays,
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

/**
 * Builds a deterministic initial delta patch strictly for local seed/demo records.
 * Never used to silently mask live Gemini API errors.
 */
export function buildSeedDeltaPatch(blueprint: Blueprint, input: AdaptRoadmapInput): GeminiDeltaPatch {
  const budget = Math.round(input.deadlineDays * input.dailyHours);
  const allModules = blueprint.phases.flatMap((p) => p.modules);
  const perModule = Math.max(2, Math.round(budget / Math.max(1, allModules.length)));

  const adjustments: ModuleAdjustment[] = allModules.map((mod, idx) => ({
    moduleId: mod.id,
    priority: idx === 1 || idx === 2 ? 'high' : 'normal',
    allocatedHours: idx === 1 || idx === 2 ? Math.round(perModule * 1.25) : perModule,
    customFocus:
      input.locale === 'uz'
        ? `${input.targetGoal} maqsadi uchun ${mod.keyFramework} doirasida amaliy mashqlarga ustuvorlik beriladi.`
        : `Prioritize deliberate drills inside ${mod.keyFramework} calibrated for ${input.targetGoal}.`,
  }));

  return {
    strategySummary:
      input.locale === 'uz'
        ? `${input.deadlineDays} kunlik intensiv reja (${input.dailyHours} soat/kun): ${input.currentLevel} darajadan ${input.targetGoal} maqsadiga bosqichma-bosqich yetish.`
        : `${input.deadlineDays}-day structured cadence (${input.dailyHours}h/day): targeted progression from ${input.currentLevel} to ${input.targetGoal}.`,
    moduleAdjustments: adjustments,
    dailySlotRecommendation:
      input.locale === 'uz'
        ? `19:00–${19 + Math.floor(input.dailyHours)}:${input.dailyHours % 1 >= 0.5 ? '30' : '00'} (${input.dailyHours} soat chuqur fokus)`
        : `19:00–${19 + Math.floor(input.dailyHours)}:${input.dailyHours % 1 >= 0.5 ? '30' : '00'} (${input.dailyHours}h uninterrupted focus block)`,
  };
}
