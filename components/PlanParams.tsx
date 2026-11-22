'use client';

import type { Locale } from '@core/schemas';
import { getDictionary } from '@core/i18n';

function Chips<T extends number>({
  options, value, onChange, suffix, label,
}: { options: readonly T[]; value: number; onChange: (v: T) => void; suffix: string; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o)}
            className={`h-9 min-w-[3.25rem] px-3 rounded-full text-xs font-medium font-mono-tabular transition-colors cursor-pointer ${
              active ? 'bg-accent text-on-accent' : 'bg-surface/80 border border-ink/10 text-ink hover:border-ink/30'
            }`}
          >
            {o}
            <span className={active ? 'text-white/60' : 'text-muted'}> {suffix}</span>
          </button>
        );
      })}
    </div>
  );
}

export function PlanParams({
  locale, deadlineDays, setDeadlineDays, dailyHours, setDailyHours, baselineHours,
  deadlineLabel, hoursLabel, dayOptions,
}: {
  locale: Locale;
  deadlineDays: number;
  setDeadlineDays: (v: number) => void;
  dailyHours: number;
  setDailyHours: (v: number) => void;
  baselineHours: number;
  deadlineLabel: string;
  hoursLabel: string;
  dayOptions: readonly number[];
}) {
  const d = getDictionary(locale);
  const c = d.params;
  const available = Math.round(deadlineDays * dailyHours);
  const ratio = baselineHours > 0 ? available / baselineHours : 1;
  const status = ratio >= 1 ? c.comfortable : ratio >= 0.7 ? c.intensive : c.compressed;
  const tone = ratio >= 1 ? 'var(--c-success)' : ratio >= 0.7 ? 'var(--c-accent)' : 'var(--c-warn)';
  const target = new Date(Date.now() + deadlineDays * 86_400_000).toLocaleDateString(d.common.dateLocale, {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="block text-xs font-medium text-ink">{deadlineLabel}</span>
          <span className="text-[11px] text-muted">{c.target}: <span className="font-mono-tabular text-ink">{target}</span></span>
        </div>
        <Chips options={dayOptions} value={deadlineDays} onChange={setDeadlineDays} suffix={c.days} label={deadlineLabel} />
      </div>
      <div className="space-y-2">
        <span className="block text-xs font-medium text-ink">{hoursLabel}</span>
        <Chips options={[1, 1.5, 2, 3, 4] as const} value={dailyHours} onChange={setDailyHours} suffix={c.hrs} label={hoursLabel} />
      </div>
      <div className="rounded-2xl bg-surface/70 border border-ink/[0.07] p-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">{c.capacity}</span>
          <span className="font-mono-tabular text-ink">
            {available}{c.hrs === 'h' ? 'h' : ` ${c.hrs}`} <span className="text-muted">{c.of} {baselineHours}{c.hrs === 'h' ? 'h' : ` ${c.hrs}`}</span>
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-ink/[0.07] overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, ratio * 100)}%`, background: tone }} />
        </div>
        <p className="text-[11px] font-medium" style={{ color: tone }}>{status}</p>
      </div>
    </div>
  );
}
