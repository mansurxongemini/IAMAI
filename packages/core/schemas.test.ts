import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_BLUEPRINTS, getBlueprintsByCategory } from './blueprints';
import { DICTIONARIES } from './i18n';
import {
  AdaptRoadmapInputSchema,
  BlueprintSchema,
  DecomposedTasksResponseSchema,
  GeminiDeltaPatchSchema,
} from './schemas';

test('all 10 pre-authored expert blueprints validate strictly against BlueprintSchema', () => {
  assert.equal(ALL_BLUEPRINTS.length, 10);
  assert.equal(getBlueprintsByCategory('rhetoric').length, 3);
  assert.equal(getBlueprintsByCategory('academic').length, 3);
  assert.equal(getBlueprintsByCategory('legal').length, 4);

  for (const bp of ALL_BLUEPRINTS) {
    const parsed = BlueprintSchema.safeParse(bp);
    assert.equal(parsed.success, true, `Blueprint ${bp.id} failed validation`);
  }
});

test('EN and UZ dictionaries contain identical structural keys and non-empty strings', () => {
  const enKeys = Object.keys(DICTIONARIES.en).sort();
  const uzKeys = Object.keys(DICTIONARIES.uz).sort();
  assert.deepEqual(enKeys, uzKeys);
  assert.ok(DICTIONARIES.uz.rhetoric.title.length > 5);
  assert.ok(DICTIONARIES.uz.certifications.title.length > 5);
});

test('Zod validation enforces boundaries on AdaptRoadmapInput and Gemini outputs', () => {
  const badInput = AdaptRoadmapInputSchema.safeParse({
    blueprintId: 'ielts-academic',
    locale: 'en',
    currentLevel: 'x',
    targetGoal: 'Band 8',
    deadlineDays: 2, // too short, min 7
    dailyHours: 2,
  });
  assert.equal(badInput.success, false);

  const validPatch = GeminiDeltaPatchSchema.safeParse({
    strategySummary: 'Focused 30-day sprint on Writing & Speaking.',
    moduleAdjustments: [
      {
        moduleId: 'ielts-w2-cohesion',
        priority: 'high',
        allocatedHours: 20,
        customFocus: 'Thesis clarity and C1 cohesion.',
      },
    ],
    dailySlotRecommendation: '19:30-21:30',
  });
  assert.equal(validPatch.success, true);

  const validTasks = DecomposedTasksResponseSchema.safeParse({
    dayBrief: 'Two focused deep-work blocks before afternoon meetings.',
    tasks: [
      {
        title: 'Draft Litigation Memo',
        startTime: '09:00',
        endTime: '10:30',
        durationMinutes: 90,
        priority: 'critical',
        category: 'Legal',
        executionSteps: ['List governing statutes', 'Apply facts to each element'],
        simplificationNote: 'Draft headings before writing analysis prose.',
      },
    ],
  });
  assert.equal(validTasks.success, true);
});
