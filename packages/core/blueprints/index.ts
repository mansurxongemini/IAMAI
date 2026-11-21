import type { Blueprint, BlueprintCategory } from '../schemas';
import { ACADEMIC_BLUEPRINTS } from './academic';
import { LEGAL_BLUEPRINTS } from './legal';
import { RHETORIC_BLUEPRINTS } from './rhetoric';

export const ALL_BLUEPRINTS: Blueprint[] = [
  ...RHETORIC_BLUEPRINTS,
  ...ACADEMIC_BLUEPRINTS,
  ...LEGAL_BLUEPRINTS,
];

export function getBlueprintById(id: string): Blueprint | undefined {
  return ALL_BLUEPRINTS.find((bp) => bp.id === id);
}

export function getBlueprintsByCategory(category: BlueprintCategory): Blueprint[] {
  return ALL_BLUEPRINTS.filter((bp) => bp.category === category);
}

/**
 * Token-optimized compact outline sent to Gemini for delta-patching.
 * Never sends full step drill text, reducing prompt tokens by ~80%.
 */
export function getCompactBlueprintOutline(blueprint: Blueprint) {
  return {
    id: blueprint.id,
    category: blueprint.category,
    title: blueprint.title.en,
    baselineTotalHours: blueprint.baselineTotalHours,
    modules: blueprint.phases.flatMap((phase) =>
      phase.modules.map((mod) => ({
        moduleId: mod.id,
        phaseOrder: phase.order,
        title: mod.title.en,
        baselineHours: mod.baselineHours,
        difficulty: mod.difficulty,
        keyFramework: mod.keyFramework,
      }))
    ),
  };
}

export { RHETORIC_BLUEPRINTS, ACADEMIC_BLUEPRINTS, LEGAL_BLUEPRINTS };
