/*
  Plan quality: the failures found in the November 2026 audit, kept from coming back.
  Run: node --import ./node_modules/.pnpm/jiti@2.7.0/node_modules/jiti/lib/jiti-register.mjs --test packages/core/*.test.ts
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_BLUEPRINTS, getBlueprintById } from './blueprints';
import { normalizeDecomposedTasks, normalizeDeltaPatch, normalizeModulePriority, normalizeTaskPriority } from './normalize';
import { applyDeltaPatchAndSchedule, assessFeasibility, buildSeedDeltaPatch, plannedDailyMinutes, suggestDailySlot } from './scheduler';
import { planForDay, stepDueDates } from './today';
import type { AdaptRoadmapInput, GeminiDeltaPatch, Roadmap } from './schemas';

const START = new Date('2026-11-23T00:00:00.000Z');
const plus = (n: number) => new Date(START.getTime() + n * 86_400_000).toISOString().slice(0, 10);
const input = (id: string, deadlineDays: number, dailyHours: number, extra: Partial<AdaptRoadmapInput> = {}): AdaptRoadmapInput => ({
  blueprintId: id, locale: 'en', currentLevel: 'Intermediate', targetGoal: 'Pass', deadlineDays, dailyHours, busyWindows: [], ...extra,
});
const plan = (id: string, days: number, hours: number, patch?: GeminiDeltaPatch, extra: Partial<AdaptRoadmapInput> = {}): Roadmap => {
  const bp = getBlueprintById(id)!;
  const inp = input(id, days, hours, extra);
  return applyDeltaPatchAndSchedule({ roadmapId: 'rm', ownerId: 'u', blueprint: bp, input: inp, deltaPatch: patch ?? buildSeedDeltaPatch(bp, inp), startDate: START });
};

test('model priorities outside the enum are mapped, not rejected (live Gemini answered "medium", "critical", "Yuqori")', () => {
  assert.equal(normalizeModulePriority('medium'), 'normal');
  assert.equal(normalizeModulePriority('Critical'), 'high');
  assert.equal(normalizeModulePriority('Yuqori'), 'high');
  assert.equal(normalizeModulePriority("Oʻrta"), 'normal');
  assert.equal(normalizeModulePriority('skip'), 'skip');
  assert.equal(normalizeTaskPriority('Yuqori'), 'high');
  assert.equal(normalizeTaskPriority("O'rta"), 'standard');
  assert.equal(normalizeTaskPriority('urgent'), 'critical');

  const ielts = getBlueprintById('ielts-academic')!;
  const raw = {
    strategySummary: 'Writing first.',
    dailySlotRecommendation: '20:00-22:00',
    moduleAdjustments: [
      { moduleId: 'ielts-w2-cohesion', priority: 'critical', allocatedHours: 45, customFocus: 'PEEL' },
      { moduleId: 'ielts-reading-tfng', priority: 'medium', allocatedHours: '10', customFocus: '' },
      { moduleId: 'made-up', priority: 'high', allocatedHours: 99, customFocus: 'x' },
      { moduleId: 'ielts-w2-cohesion', priority: 'low', allocatedHours: 1, customFocus: 'dup' },
    ],
  };
  const patch = normalizeDeltaPatch(raw, ielts)!;
  assert.ok(patch);
  assert.deepEqual(patch.moduleAdjustments.map((a) => [a.moduleId, a.priority]), [['ielts-w2-cohesion', 'high'], ['ielts-reading-tfng', 'normal']]);
  assert.equal(normalizeDeltaPatch({ moduleAdjustments: [{ moduleId: 'nope', priority: 'high', allocatedHours: 1, customFocus: 'x' }] }, ielts), null);

  const day = normalizeDecomposedTasks({
    dayBrief: 'Kun',
    tasks: [{ title: 'Memo', startTime: '08:30', endTime: '10:30', durationMinutes: 120, priority: 'Yuqori', category: 'Ish', executionSteps: ['a', 'b'], simplificationNote: 'n' }],
  });
  assert.equal(day?.tasks[0]?.priority, 'high');
});

test('a patch that skips every module still yields a full plan', () => {
  const ielts = getBlueprintById('ielts-academic')!;
  const skipAll: GeminiDeltaPatch = {
    strategySummary: 's', dailySlotRecommendation: 'd',
    moduleAdjustments: ielts.phases.flatMap((p) => p.modules).map((m) => ({ moduleId: m.id, priority: 'skip', allocatedHours: 0, customFocus: 'x' })),
  };
  const rm = plan('ielts-academic', 60, 2, skipAll);
  const active = rm.phases.flatMap((p) => p.modules).filter((m) => m.priority !== 'skip');
  assert.equal(active.length, ielts.phases.flatMap((p) => p.modules).length);
  assert.ok(rm.totalAllocatedHours > 100);
});

test('every blueprint × budget: dated inside the deadline, contiguous, no overlap, hours within budget and cap', () => {
  const grid: [number, number][] = [[7, 0.5], [14, 1], [30, 1], [60, 2], [90, 3], [365, 4], [365, 12]];
  for (const bp of ALL_BLUEPRINTS) {
    for (const [days, hours] of grid) {
      const rm = plan(bp.id, days, hours);
      const mods = rm.phases.flatMap((p) => p.modules).filter((m) => m.priority !== 'skip');
      const label = `${bp.id} ${days}x${hours}`;
      assert.equal(mods[0]!.startDate, plus(0), `${label} starts on day 0`);
      assert.equal(mods.at(-1)!.endDate, plus(days - 1), `${label} ends the day before the deadline`);
      for (let i = 1; i < mods.length; i++) {
        assert.ok(mods[i]!.startDate > mods[i - 1]!.endDate || days < mods.length, `${label} module ${i} does not overlap the previous`);
      }
      for (const m of mods) assert.ok(m.startDate <= m.endDate, `${label} ${m.id} has a valid range`);
      const budget = days * hours;
      assert.ok(rm.totalAllocatedHours <= budget + mods.length * 0.5, `${label} stays within the budget (${rm.totalAllocatedHours} > ${budget})`);
      assert.ok(rm.totalAllocatedHours <= bp.baselineTotalHours * 2 + mods.length, `${label} is capped at 2x the baseline`);
    }
  }
});

test('one module cannot swallow the plan (live: 1,750 h of rehearsal for a 42 h course)', () => {
  const tedx = getBlueprintById('tedx-oratory')!;
  const mods = tedx.phases.flatMap((p) => p.modules);
  const greedy: GeminiDeltaPatch = {
    strategySummary: 's', dailySlotRecommendation: 'd',
    moduleAdjustments: mods.map((m, i) => ({ moduleId: m.id, priority: 'high', allocatedHours: i === mods.length - 1 ? 1750 : 10, customFocus: 'x' })),
  };
  const rm = plan('tedx-oratory', 365, 6, greedy);
  const scheduled = rm.phases.flatMap((p) => p.modules);
  const last = scheduled.at(-1)!;
  assert.ok(rm.totalAllocatedHours <= tedx.baselineTotalHours * 2 + 1);
  assert.ok(last.allocatedHours < rm.totalAllocatedHours * 0.5, `last module took ${last.allocatedHours} of ${rm.totalAllocatedHours} h`);
});

test('Today spreads the steps across the whole plan instead of finishing in a week', () => {
  for (const bp of ALL_BLUEPRINTS) {
    for (const [days, hours] of [[60, 2], [180, 2], [30, 1]] as [number, number][]) {
      let rm = plan(bp.id, days, hours);
      const budget = plannedDailyMinutes(rm);
      let lastStepDay = -1;
      for (let d = 0; d < days; d++) {
        const items = planForDay(rm, plus(d), new Set());
        const stepMinutes = items.filter((i) => i.kind === 'step').reduce((s, i) => s + i.minutes, 0);
        const total = items.reduce((s, i) => s + i.minutes, 0);
        const longest = Math.max(0, ...items.filter((i) => i.kind === 'step').map((i) => i.minutes));
        assert.ok(total <= Math.max(budget, longest), `${bp.id} ${days}x${hours} day ${d}: ${total} min > ${budget}`);
        for (const it of items.filter((i) => i.kind === 'step')) {
          rm = { ...rm, phases: rm.phases.map((p) => ({ ...p, modules: p.modules.map((m) => ({ ...m, steps: m.steps.map((s) => (s.id === it.step.id ? { ...s, completed: true } : s)) })) })) };
          lastStepDay = d;
        }
        if (stepMinutes === 0) assert.ok(items.some((i) => i.kind === 'practice'), `${bp.id} day ${d} has a practice session`);
      }
      const open = rm.phases.flatMap((p) => p.modules).filter((m) => m.priority !== 'skip').flatMap((m) => m.steps).filter((s) => !s.completed);
      // When the steps alone need more than ~80% of every planned minute, some stay open (the plan is flagged tight instead).
      const stepTotal = bp.phases.flatMap((p) => p.modules).flatMap((m) => m.steps).reduce((s, x) => s + x.estimatedMinutes, 0);
      if (stepTotal <= days * budget * 0.8) assert.equal(open.length, 0, `${bp.id} ${days}x${hours}: every step is handed out before the deadline`);
      assert.ok(lastStepDay >= days * 0.75, `${bp.id} ${days}x${hours}: last step on day ${lastStepDay}, plan runs ${days} days`);
    }
  }
});

test('missed days come back as overdue, first', () => {
  const rm = plan('ielts-academic', 60, 2);
  const items = planForDay(rm, plus(20), new Set());
  assert.ok(items[0]?.overdue);
  const due = stepDueDates(rm);
  assert.ok([...due.values()].every((d) => d >= plus(0) && d <= plus(59)));
});

test('fallback plan follows the learner, and its time window is a real clock time', () => {
  const ielts = getBlueprintById('ielts-academic')!;
  const writing = buildSeedDeltaPatch(ielts, input('ielts-academic', 60, 2, { weakAreas: 'Writing Task 2 essays' }));
  const listening = buildSeedDeltaPatch(ielts, input('ielts-academic', 60, 2, { weakAreas: 'Listening' }));
  const high = (p: GeminiDeltaPatch) => p.moduleAdjustments.filter((a) => a.priority === 'high').map((a) => a.moduleId);
  assert.ok(high(writing).some((id) => id.includes('w2') || id.includes('w1')), JSON.stringify(high(writing)));
  assert.ok(high(listening).includes('ielts-listening-basics'), JSON.stringify(high(listening)));
  assert.notDeepEqual(high(writing), high(listening));
  for (const h of [0.5, 2, 4, 6.25, 12]) {
    const slot = suggestDailySlot(h, 'en');
    for (const t of slot.match(/\d{2}:\d{2}/g) ?? []) {
      const [hh, mm] = t.split(':').map(Number);
      assert.ok(hh! < 24 && mm! < 60, `${h}h → ${slot}`);
    }
  }
});

test('feasibility: a 180 h curriculum in 30 h is flagged, a 42 h course over a year is light', () => {
  const bar = plan('bar-ube', 30, 1);
  const f = assessFeasibility(bar, 180);
  assert.equal(f.status, 'tight');
  const tedx = plan('tedx-oratory', 365, 4);
  assert.equal(assessFeasibility(tedx, 42).status, 'light');
  assert.equal(assessFeasibility(plan('ielts-academic', 60, 2), 96).status, 'ok');
});

test('the plan starts on the learner’s calendar day, whatever the server clock', () => {
  const bp = getBlueprintById('ielts-academic')!;
  const inp = input('ielts-academic', 60, 2, { startDate: '2026-11-23' });
  const rm = applyDeltaPatchAndSchedule({ roadmapId: 'rm', ownerId: 'u', blueprint: bp, input: inp, deltaPatch: buildSeedDeltaPatch(bp, inp), startDate: new Date(`${inp.startDate}T00:00:00.000Z`) });
  assert.equal(rm.phases[0]!.modules[0]!.startDate, '2026-11-23');
  assert.equal(rm.deadlineDate, '2027-01-22');
});

test('the diagnostic module is shortened, never skipped (live: Gemini skipped the TOEFL baseline test)', () => {
  const toefl = getBlueprintById('toefl-ibt')!;
  const first = toefl.phases[0]!.modules[0]!.id;
  const patch = normalizeDeltaPatch({ strategySummary: 's', dailySlotRecommendation: 'd', moduleAdjustments: [{ moduleId: first, priority: 'skip', allocatedHours: 0, customFocus: 'x' }] }, toefl);
  assert.equal(patch?.moduleAdjustments[0]?.priority, 'low');
});
