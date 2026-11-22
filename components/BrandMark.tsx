import { cn } from '@/lib/utils';

/**
 * IAM AI mark: an open book seen edge-on that doubles as a rising line —
 * study plus progress. Drawn once, used everywhere (nav, login, favicon-sized).
 */
export function BrandMark({ className, title = 'IAM AI' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn('w-8 h-8', className)} role="img" aria-label={title}>
      <rect width="32" height="32" fill="var(--c-ink)" />
      <path d="M7 21.5c3-1.6 6-1.6 9 0 3-1.6 6-1.6 9 0" fill="none" stroke="var(--c-paper)" strokeWidth="1.8" strokeLinecap="square" />
      <path d="M16 21.5V12.5" stroke="var(--c-paper)" strokeWidth="1.8" strokeLinecap="square" />
      <path d="M9.5 17.5l4-3.6 3 2.2 6-5.6" fill="none" stroke="var(--c-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The wordmark the landing uses: Anton, uppercase, “AI” in the accent. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-display uppercase leading-none tracking-[-0.01em] text-ink', className)} aria-label="IAM AI">
      IAM <span className="text-accent">AI</span>
    </span>
  );
}

export function BrandLockup({ className }: { className?: string }) {
  return <Wordmark className={cn('text-[28px]', className)} />;
}
