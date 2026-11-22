import type { BlueprintCategory } from '@core/schemas';
import type { Dictionary } from '@core/i18n';

/** One-tap answers per goal so most users never type. Scores read the same in every language. */
const SCORE_PRESETS: Record<string, { current: readonly string[]; target: readonly string[] }> = {
  'ielts-academic': { current: ['Band 5.0', 'Band 5.5', 'Band 6.0', 'Band 6.5'], target: ['Band 6.5', 'Band 7.0', 'Band 7.5', 'Band 8.0'] },
  'sat-digital': { current: ['1050', '1200', '1300', '1400'], target: ['1350', '1450', '1500', '1550'] },
  'toefl-ibt': { current: ['Band 3.5', 'Band 4.0', 'Band 4.5', 'Band 5.0'], target: ['Band 4.5', 'Band 5.0', 'Band 5.5', 'Band 6.0'] },
  lsat: { current: ['145', '150', '155', '160'], target: ['160', '165', '170', '175'] },
};

/** Score presets where a goal has a score; otherwise the worded presets from i18n `onboarding.presets`. */
export function presetsFor(id: string, category: BlueprintCategory, d: Dictionary) {
  return SCORE_PRESETS[id] ?? (category === 'rhetoric' ? d.onboarding.presets.rhetoric : d.onboarding.presets.legal);
}
