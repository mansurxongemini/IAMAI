import type { BlueprintCategory } from '@core/schemas';

/** One photograph per track (Wikimedia Commons stand-ins; credits in public/photos/credits.json). Alt text: i18n `photos`. */
export const TRACK_PHOTO: Record<BlueprintCategory, { src: string }> = {
  academic: { src: '/photos/lecture-hall.webp' },
  legal: { src: '/photos/courtroom.webp' },
  rhetoric: { src: '/photos/stage.webp' },
};
