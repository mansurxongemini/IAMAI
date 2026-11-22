/*
  What a plan asks of the learner on one calendar day.

  The blueprints hold far fewer step-minutes than the hours a plan allocates (9–36% of baseline),
  so handing out the next steps until the daily budget is full finished a 60-day plan in a week and
  left the dates meaningless. Instead each step is due on a day inside its module's date range,
  spread evenly; a day shows the steps due (and any overdue), and the rest of the daily minutes go
  to a practice session on the module in progress — that is where the allocated hours are spent.
*/
import { plannedDailyMinutes } from './scheduler';
import type { Roadmap, RoadmapStep } from './schemas';

export interface DayItem {
  kind: 'step' | 'practice';
  /** Stable id: step:<roadmap>:<step> for steps (the roadmap holds completion), practice:<roadmap>:<step>:<day> for sessions (the activity log holds it). */
  id: string;
  moduleId: string;
  step: RoadmapStep;
  minutes: number;
  /** Day the step is due (practice: today). */
  due: string;
  overdue: boolean;
}

const MS_DAY = 86_400_000;
const toDay = (iso: string) => Math.round(Date.parse(`${iso}T00:00:00.000Z`) / MS_DAY);

/** Due day (YYYY-MM-DD) of every active step: step j of k in a module of N days is due on day floor(j·N/k). */
export function stepDueDates(roadmap: Roadmap): Map<string, string> {
  const out = new Map<string, string>();
  for (const phase of roadmap.phases) {
    for (const mod of phase.modules) {
      if (mod.priority === 'skip') continue;
      const from = toDay(mod.startDate);
      const days = Math.max(1, toDay(mod.endDate) - from + 1);
      const k = mod.steps.length;
      mod.steps.forEach((step, j) => {
        const d = from + Math.floor((j * days) / Math.max(1, k));
        out.set(step.id, new Date(d * MS_DAY).toISOString().slice(0, 10));
      });
    }
  }
  return out;
}

/**
 * The day's list for one roadmap: steps due today or earlier and still open (overdue first), steps
 * completed today (they stay, checked), then one practice session for the module in progress,
 * sized to what is left of the planned daily minutes. Never more than `maxItems` rows.
 */
export function planForDay(roadmap: Roadmap, today: string, doneTodayIds: Set<string>, maxItems = 6): DayItem[] {
  const budget = plannedDailyMinutes(roadmap);
  const due = stepDueDates(roadmap);
  const t = toDay(today);
  const items: DayItem[] = [];
  let used = 0;
  let current: { moduleId: string; step: RoadmapStep } | null = null;

  for (const phase of roadmap.phases) {
    for (const mod of phase.modules) {
      if (mod.priority === 'skip') continue;
      const inRange = toDay(mod.startDate) <= t && t <= toDay(mod.endDate);
      for (const step of mod.steps) {
        const d = due.get(step.id)!;
        const id = `step:${roadmap.id}:${step.id}`;
        const doneToday = doneTodayIds.has(id);
        if (toDay(d) <= t && inRange) current = { moduleId: mod.id, step };
        if (step.completed && !doneToday) continue;
        if (toDay(d) > t) continue;
        // Open steps are added while they fit; one always fits so a long step is never hidden.
        if (!step.completed && used > 0 && used + step.estimatedMinutes > budget) continue;
        items.push({ kind: 'step', id, moduleId: mod.id, step, minutes: step.estimatedMinutes, due: d, overdue: toDay(d) < t });
        used += step.estimatedMinutes;
      }
    }
  }

  items.sort((a, b) => Number(b.overdue) - Number(a.overdue) || a.due.localeCompare(b.due));
  const list = items.slice(0, maxItems);

  const left = Math.floor((budget - used) / 5) * 5;
  if (current && left >= 15 && list.length < maxItems && roadmap.status === 'active') {
    list.push({
      kind: 'practice',
      id: `practice:${roadmap.id}:${current.step.id}:${today}`,
      moduleId: current.moduleId,
      step: current.step,
      minutes: left,
      due: today,
      overdue: false,
    });
  }
  return list;
}
