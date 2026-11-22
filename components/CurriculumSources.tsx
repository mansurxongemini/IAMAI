import { ArrowUpRight } from 'lucide-react';
import type { CatalogEntry } from '@core/catalog';
import type { Dictionary } from '@core/i18n';

/**
 * Where a curriculum comes from: the exam/format version it follows, the day it was last checked,
 * and links to the official sources. Shown on the goal panel and the plan page.
 */
export function CurriculumSources({ entry, d, className }: { entry: CatalogEntry; d: Dictionary; className?: string }) {
  const date = new Date(`${entry.lastVerified}T00:00:00`).toLocaleDateString(d.common.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <section className={className} aria-label={d.common.sources}>
      <p className="text-[12px] font-semibold text-ink">{d.common.sources}</p>
      <p className="mt-0.5 text-[12px] text-muted">
        {entry.examVersion} · {d.common.verified(date)}
      </p>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {entry.sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full border border-ink/12 text-[11.5px] text-ink-2 hover:text-ink hover:border-ink/30 transition-colors"
            >
              {s.label}
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
