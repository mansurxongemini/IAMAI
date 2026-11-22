import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/** The five letters of the wordmark and the hue each one takes (tokens in app/globals.css). */
const LETTERS: [string, string][] = [
  ['I', 'mint'],
  ['A', 'iris'],
  ['M', 'lilac'],
  ['A', 'rose'],
  ['I', 'sun'],
];

/**
 * IAM AI mark: five rising bars in the wordmark's five hues, on a rounded ink tile —
 * a plan that climbs step by step. Used where the full wordmark does not fit (loading, favicon size).
 */
export function BrandMark({ className, title = 'IAM AI' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn('w-8 h-8', className)} role="img" aria-label={title || undefined} aria-hidden={title ? undefined : true}>
      <rect width="32" height="32" rx="8" fill="#1e1e20" />
      {LETTERS.map(([, h], i) => {
        const height = 6 + i * 3;
        return <rect key={i} x={6.5 + i * 4} y={25 - height} width="3" height={height} rx="1.5" fill={`var(--h-${h})`} />;
      })}
    </svg>
  );
}

/**
 * The wordmark: Parkinsans at its heaviest, one hue per letter. `colour="hover"` keeps it in ink
 * until the pointer is on it (nav and sidebar, as on the landing); `colour="always"` shows the hues.
 */
export function Wordmark({ className, colour = 'hover' }: { className?: string; colour?: 'hover' | 'always' }) {
  return (
    <span className={cn('wordmark', colour === 'always' && 'wordmark--always', className)} aria-label="IAM AI">
      {LETTERS.map(([ch, h], i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ ['--wm' as string]: `var(--h-${h})`, ['--wm-dark' as string]: `var(--h-${h}-dark)` } as CSSProperties}
        >
          {i === 3 ? ' ' : ''}
          {ch}
        </span>
      ))}
    </span>
  );
}

export function BrandLockup({ className }: { className?: string }) {
  return <Wordmark colour="always" className={cn('text-[40px]', className)} />;
}
