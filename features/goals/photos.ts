import type { BlueprintCategory } from '@core/schemas';

/*
  Generated artwork (soft clay 3D, one style for the whole product). Files in public/art.
  Scenes sit on the dark ground with the subject in the right two-thirds, so text can sit on the left.
  Alt text: i18n `photos`.
*/

/** One scene per track: catalog banners, the onboarding panel and the plan header. */
export const TRACK_PHOTO: Record<BlueprintCategory, { src: string; small: string }> = {
  academic: { src: '/art/scene-academic.webp', small: '/art/scene-academic-800.webp' },
  legal: { src: '/art/scene-legal.webp', small: '/art/scene-legal-800.webp' },
  rhetoric: { src: '/art/scene-rhetoric.webp', small: '/art/scene-rhetoric-800.webp' },
};

/** The study desk (portrait): login panel and the Today empty state. */
export const DESK_SCENE = '/art/scene-desk.webp';

/** One object per curriculum, on a transparent ground, drawn in the curriculum's own hue. */
export const trackArt = (id: string) => `/art/card-${id}.webp`;
