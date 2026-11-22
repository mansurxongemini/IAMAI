import type { CSSProperties } from 'react';

/** The nine hues of the system (tokens --h-* in app/globals.css). */
export type Hue = 'iris' | 'lilac' | 'rose' | 'ember' | 'sun' | 'gold' | 'mint' | 'lime' | 'teal';

/** One hue per curriculum: its card, its pill and its line use it on the landing and in the workspace. */
export const TRACK_HUE: Record<string, Hue> = {
  'tedx-oratory': 'mint',
  'legal-advocacy': 'lime',
  'senatorial-rhetoric': 'sun',
  'ielts-academic': 'iris',
  'sat-digital': 'gold',
  'toefl-ibt': 'teal',
  lsat: 'lilac',
  sqe: 'rose',
  'bar-ube': 'ember',
  toles: 'sun',
};

/** --hue, --hue-dark, --hue-deep and --hue-light for one hue, to set inline on a component. */
export function hueVars(h: Hue): CSSProperties {
  return {
    ['--hue' as string]: `var(--h-${h})`,
    ['--hue-dark' as string]: `var(--h-${h}-dark)`,
    ['--hue-deep' as string]: `var(--h-${h}-deep)`,
    ['--hue-light' as string]: `var(--h-${h}-light)`,
  } as CSSProperties;
}

export const trackHue = (id: string): Hue => TRACK_HUE[id] ?? 'iris';
