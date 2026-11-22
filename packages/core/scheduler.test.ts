import test from 'node:test';
import assert from 'node:assert/strict';
import { getBlueprintById, getCompactBlueprintOutline } from './blueprints';
import {
  applyDeltaPatchAndSchedule,
  computeNodeCacheHash,
  computeRoadmapProgress,
  toggleRoadmapStep,
} from './scheduler';
import type { AdaptRoadmapInput, GeminiDeltaPatch } from './schemas';

test('deterministic scheduler applies delta patch, skips modules, and stays within budget', () => {
  const ielts = getBlueprintById('ielts-academic');
  assert.ok(ielts, 'ielts-academic blueprint must exist');

  const input: AdaptRoadmapInput = {
    blueprintId: 'ielts-academic',
    locale: 'uz',
    currentLevel: 'Band 6.0 (Writing 5.5, Speaking 6.0)',
    targetGoal: 'Band 7.5',
    deadlineDays: 60,
    dailyHours: 2.5,
    busyWindows: ['Mon-Fri 09:00-14:00'],
  };

  const patch: GeminiDeltaPatch = {
    strategySummary:
      '60 kunlik intensiv reja: Writing Task 2 argumentatsiya va Speaking Part 3 ravonligiga 55% vaqt ajratiladi.',
    moduleAdjustments: [
      {
        moduleId: 'ielts-w2-cohesion',
        priority: 'high',
        allocatedHours: 36,
        customFocus: 'Murakkab huquqiy va ijtimoiy mavzularda C1 darajadagi tezis qurish.',
      },
      {
        moduleId: 'ielts-listening-basics',
        priority: 'skip',
        allocatedHours: 0,
        customFocus: '6.0 bazaviy daraja mavjud; faqat Section 3-4 test praktikasiga otiladi.',
      },
    ],
    dailySlotRecommendation: '19:30-22:00 (2.5 soat)',
  };

  const startDate = new Date('2026-11-21T00:00:00.000Z');
  const roadmap = applyDeltaPatchAndSchedule({
    roadmapId: 'rm-test-1',
    ownerId: 'user-1',
    blueprint: ielts,
    input,
    deltaPatch: patch,
    startDate,
  });

  assert.equal(roadmap.deadlineDate, '2027-01-20');
  assert.equal(roadmap.locale, 'uz');
  // Budget = 60 * 2.5 = 150 hours; scaled sum should be very close to 150
  assert.ok(
    roadmap.totalAllocatedHours >= 145 && roadmap.totalAllocatedHours <= 155,
    `Expected totalAllocatedHours near 150, got ${roadmap.totalAllocatedHours}`
  );

  const listeningMod = roadmap.phases[0].modules.find((m) => m.id === 'ielts-listening-basics');
  assert.equal(listeningMod?.priority, 'skip');
  assert.equal(listeningMod?.allocatedHours, 0);

  const writingMod = roadmap.phases[1].modules.find((m) => m.id === 'ielts-w2-cohesion');
  assert.equal(writingMod?.priority, 'high');
  assert.ok((writingMod?.allocatedHours ?? 0) > 20);

  const progress = computeRoadmapProgress(roadmap);
  assert.equal(progress.skippedModules, 1);
  assert.equal(progress.completedSteps, 0);
  assert.ok(progress.totalSteps > 0);

  const firstActiveModule = roadmap.phases[0].modules.find((m) => m.priority !== 'skip');
  assert.ok(firstActiveModule);
  const firstStepId = firstActiveModule.steps[0].id;
  const toggled = toggleRoadmapStep(roadmap, firstActiveModule.id, firstStepId);
  const progressAfter = computeRoadmapProgress(toggled);
  assert.equal(progressAfter.completedSteps, 1);
  assert.ok(progressAfter.percentComplete > 0);
});

test('compact outline strips full step drill text for token optimization', () => {
  const advocacy = getBlueprintById('legal-advocacy');
  assert.ok(advocacy);
  const compact = getCompactBlueprintOutline(advocacy);
  assert.equal(compact.id, 'legal-advocacy');
  assert.equal(compact.modules.length, advocacy.phases.flatMap((p) => p.modules).length);
  const serializedCompact = JSON.stringify(compact);
  const serializedFull = JSON.stringify(advocacy);
  assert.ok(
    serializedCompact.length < serializedFull.length * 0.25,
    'Compact outline must reduce blueprint payload by >75%'
  );
});

test('computeNodeCacheHash normalizes punctuation and casing deterministically', () => {
  const h1 = computeNodeCacheHash(
    'legal-advocacy',
    'adv-cross-control',
    'en',
    'How do I stop a hostile witness?'
  );
  const h2 = computeNodeCacheHash(
    'legal-advocacy',
    'adv-cross-control',
    'en',
    '  how do i STOP a hostile witness  '
  );
  const h3 = computeNodeCacheHash(
    'legal-advocacy',
    'adv-cross-control',
    'uz',
    'How do I stop a hostile witness?'
  );
  assert.equal(h1, h2);
  assert.notEqual(h1, h3);
  assert.match(h1, /^[a-zA-Z0-9_-]+$/);
});
