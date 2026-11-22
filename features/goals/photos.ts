import type { BlueprintCategory } from '@core/schemas';

/** One photograph per track (Wikimedia Commons stand-ins; credits in public/photos/credits.json). */
export const TRACK_PHOTO: Record<BlueprintCategory, { src: string; alt: { en: string; uz: string } }> = {
  academic: { src: '/photos/lecture-hall.webp', alt: { en: 'Rows of wooden seats in a lecture hall', uz: 'Auditoriyadagi yogʻoch oʻrindiqlar qatori' } },
  legal: { src: '/photos/courtroom.webp', alt: { en: 'A wood-panelled courtroom', uz: 'Yogʻoch bilan qoplangan sud zali' } },
  rhetoric: { src: '/photos/stage.webp', alt: { en: 'A theatre stage with a dark curtain', uz: 'Qora pardali teatr sahnasi' } },
};
