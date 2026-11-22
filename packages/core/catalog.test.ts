import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_BLUEPRINTS } from './blueprints';
import { CATALOG } from './catalog';

test('catalog metadata stays in sync with blueprints', () => {
  assert.equal(CATALOG.length, ALL_BLUEPRINTS.length);
  for (const bp of ALL_BLUEPRINTS) {
    const e = CATALOG.find((c) => c.id === bp.id);
    assert.ok(e, `missing catalog entry for ${bp.id}`);
    assert.equal(e.category, bp.category);
    assert.equal(e.baselineTotalHours, bp.baselineTotalHours);
    assert.deepEqual(e.title, bp.title);
    const steps = bp.phases.reduce((n, p) => n + p.modules.reduce((m, md) => m + md.steps.length, 0), 0);
    assert.equal(e.steps, steps);
  }
});
