/*
  Model output is close to the schema but not always inside it: in live runs Gemini answered
  priority "medium" / "critical", and in Uzbek it translated the enum ("Yuqori", "O'rta").
  Strict validation then rejected every plan. These helpers map what the model meant onto the
  schema before validation, and drop what cannot be trusted (unknown module ids, absurd hours).
*/
import {
  DecomposedTasksResponseSchema,
  GeminiDeltaPatchSchema,
  type Blueprint,
  type DecomposedTasksResponse,
  type GeminiDeltaPatch,
  type PriorityLevel,
} from './schemas';

const fold = (v: unknown) =>
  String(v ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯʻʼ‘’'`]/g, '')
    .replace(/[^a-zЀ-ӿ ]+/g, ' ')
    .trim();

const MODULE_PRIORITY: [PriorityLevel, string[]][] = [
  ['skip', ['skip', 'skipped', 'none', 'omit', 'exclude', 'otkazib', 'otkazish', 'tashlab', 'kerak emas']],
  ['high', ['high', 'critical', 'urgent', 'top', 'intensive', 'very high', 'yuqori', 'muhim', 'juda muhim', 'kritik', 'ustuvor', 'shoshilinch']],
  ['low', ['low', 'minor', 'light', 'minimal', 'reduced', 'past', 'quyi', 'kam']],
  ['normal', ['normal', 'medium', 'moderate', 'standard', 'average', 'regular', 'orta', 'oddiy', 'odatiy']],
];

/** Maps a model's priority word (any language, any casing) onto the four levels; null when unknowable. */
export function normalizeModulePriority(v: unknown): PriorityLevel | null {
  const f = fold(v);
  if (!f) return null;
  for (const [level, words] of MODULE_PRIORITY) if (words.includes(f)) return level;
  for (const [level, words] of MODULE_PRIORITY) if (words.some((w) => f.includes(w))) return level;
  return null;
}

const TASK_PRIORITY: ['critical' | 'high' | 'standard', string[]][] = [
  ['critical', ['critical', 'urgent', 'blocker', 'kritik', 'shoshilinch', 'juda muhim', 'eng muhim']],
  ['high', ['high', 'important', 'yuqori', 'muhim', 'ustuvor']],
  ['standard', ['standard', 'normal', 'medium', 'low', 'regular', 'orta', 'oddiy', 'past', 'odatiy']],
];

/** Task priority in any language → critical | high | standard (default standard). */
export function normalizeTaskPriority(v: unknown): 'critical' | 'high' | 'standard' {
  const f = fold(v);
  for (const [level, words] of TASK_PRIORITY) if (words.includes(f)) return level;
  for (const [level, words] of TASK_PRIORITY) if (words.some((w) => f.includes(w))) return level;
  return 'standard';
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const num = (v: unknown) => {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
};

/**
 * A model delta patch made safe for the scheduler: only modules of this blueprint, each once,
 * priorities mapped, hours finite and non-negative. Returns null when nothing usable remains.
 */
export function normalizeDeltaPatch(raw: unknown, blueprint: Blueprint): GeminiDeltaPatch | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const modules = new Map(blueprint.phases.flatMap((p) => p.modules).map((m) => [m.id, m]));
  const seen = new Set<string>();
  const adjustments = (Array.isArray(r.moduleAdjustments) ? r.moduleAdjustments : [])
    .map((a) => (a && typeof a === 'object' ? (a as Record<string, unknown>) : null))
    .filter((a): a is Record<string, unknown> => Boolean(a))
    .flatMap((a) => {
      const id = str(a.moduleId, 120);
      const mod = modules.get(id);
      if (!mod || seen.has(id)) return [];
      seen.add(id);
      const priority = normalizeModulePriority(a.priority) ?? 'normal';
      const hours = priority === 'skip' ? 0 : Math.max(0, num(a.allocatedHours));
      return [{ moduleId: id, priority, allocatedHours: Number(hours.toFixed(1)), customFocus: str(a.customFocus, 400) || mod.keyFramework }];
    });
  if (adjustments.length === 0) return null;
  const parsed = GeminiDeltaPatchSchema.safeParse({
    strategySummary: str(r.strategySummary, 600) || '—',
    dailySlotRecommendation: str(r.dailySlotRecommendation, 300) || '—',
    moduleAdjustments: adjustments,
  });
  return parsed.success ? parsed.data : null;
}

/** Decomposed day plan with priorities mapped and over-long fields trimmed; null when invalid. */
export function normalizeDecomposedTasks(raw: unknown): DecomposedTasksResponse | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const tasks = (Array.isArray(r.tasks) ? r.tasks : []).slice(0, 8).map((t) => {
    const x = (t && typeof t === 'object' ? t : {}) as Record<string, unknown>;
    return {
      title: str(x.title, 160),
      startTime: str(x.startTime, 20),
      endTime: str(x.endTime, 20),
      durationMinutes: Math.min(480, Math.max(5, Math.round(num(x.durationMinutes)))),
      priority: normalizeTaskPriority(x.priority),
      category: str(x.category, 60) || '—',
      executionSteps: (Array.isArray(x.executionSteps) ? x.executionSteps : []).map((s) => str(s, 280)).filter(Boolean).slice(0, 5),
      simplificationNote: str(x.simplificationNote, 280) || '—',
    };
  });
  const parsed = DecomposedTasksResponseSchema.safeParse({ dayBrief: str(r.dayBrief, 400) || '—', tasks });
  return parsed.success ? parsed.data : null;
}
