'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme, type ThemeChoice } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { getDictionary } from '@core/i18n';

const ORDER: ThemeChoice[] = ['system', 'light', 'dark'];
const ICON = { system: Monitor, light: Sun, dark: Moon } as const;

/** One button that cycles system → light → dark. */
export function ThemeToggle({ locale, className }: { locale: 'en' | 'uz'; className?: string }) {
  const { choice, set } = useTheme();
  const Icon = ICON[choice];
  const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length] ?? 'system';
  return (
    <button
      type="button"
      onClick={() => set(next)}
      aria-label={getDictionary(locale).theme.toggle[choice]}
      title={getDictionary(locale).theme.toggle[choice]}
      className={cn('h-11 w-11 grid place-items-center rounded-none text-muted hover:text-ink hover:bg-surface/70 transition-colors cursor-pointer', className)}
    >
      <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
    </button>
  );
}

/** Three-way segmented control for the settings page. */
export function ThemeSegmented({ locale }: { locale: 'en' | 'uz' }) {
  const { choice, set } = useTheme();
  const t = getDictionary(locale).theme;
  const names = t.names;
  return (
    <div role="radiogroup" aria-label={t.group} className="inline-flex rounded-none bg-surface border border-ink/10 p-1 gap-1">
      {ORDER.map((o) => {
        const Icon = ICON[o];
        const on = o === choice;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => set(o)}
            className={cn('h-10 px-4 rounded-none inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer', on ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink')}
          >
            <Icon className="w-4 h-4" aria-hidden="true" /> {names[o]}
          </button>
        );
      })}
    </div>
  );
}
