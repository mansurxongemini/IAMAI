'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpRight, GraduationCap, Mic, Scale, type LucideIcon } from 'lucide-react';
import { CATALOG } from '@core/catalog';
import type { BlueprintCategory } from '@core/schemas';
import { useWorkspace } from '@/components/WorkspaceProvider';
import { cn } from '@/lib/utils';
import { AppShell } from '@/components/AppShell';
import { Topbar } from '@/components/workspace/Topbar';
import { TRACK_PHOTO, trackArt } from './photos';
import { hueVars, trackHue } from './hues';
import { getDictionary } from '@core/i18n';

export const CATEGORY_ICON: Record<BlueprintCategory, LucideIcon> = { academic: GraduationCap, legal: Scale, rhetoric: Mic };
const ORDER: BlueprintCategory[] = ['academic', 'legal', 'rhetoric'];

export function GoalCatalog() {
  const { locale } = useWorkspace();
  const d = getDictionary(locale);
  const c = d.goals;
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get('c');
  const active: BlueprintCategory | 'all' = raw === 'academic' || raw === 'legal' || raw === 'rhetoric' ? raw : 'all';
  const setActive = (v: BlueprintCategory | 'all') => router.replace(v === 'all' ? '/goals' : `/goals?c=${v}`, { scroll: false });

  const groups = ORDER.filter((cat) => active === 'all' || cat === active);

  return (
    <>
    <Topbar crumbs={[{ label: c.title }]} />
    <AppShell wide>
    <div className="space-y-8 page-enter">
      <header className="space-y-2">
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-ink">{c.title}</h1>
        <p className="text-sm text-muted">{c.subtitle}</p>
      </header>

      <div role="tablist" className="flex gap-1.5 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        {(['all', ...ORDER] as const).map((cat) => {
          const Icon = cat === 'all' ? null : CATEGORY_ICON[cat];
          const on = active === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                'h-10 px-4 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer shrink-0',
                on ? 'bg-accent text-on-accent' : 'bg-surface/70 border border-ink/[0.08] text-ink hover:bg-surface'
              )}
            >
              {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
              {cat === 'all' ? c.all : c.categories[cat]}
            </button>
          );
        })}
      </div>

      {groups.map((cat) => {
        const Icon = CATEGORY_ICON[cat];
        const items = CATALOG.filter((e) => e.category === cat);
        return (
          <section key={cat} className="space-y-3">
            <div className="relative h-40 sm:h-56 overflow-hidden rounded-3xl bg-[#15151d]">
              {/* The scene sits on the right; its left edge fades into the banner's own dark ground */}
              <div className="absolute inset-y-0 right-0 w-[60%] sm:w-[min(62%,640px)] [mask-image:linear-gradient(to_right,transparent,#000_35%)]">
                <Image src={TRACK_PHOTO[cat].src} alt={d.photos[cat]} fill sizes="(min-width: 1024px) 640px, 80vw" className="object-cover object-[60%_58%]" />
              </div>
              <span className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                <div className="flex items-center gap-3 text-white">
                  <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur grid place-items-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-[22px] sm:text-[26px] font-medium tracking-[-0.02em] leading-tight">{c.categories[cat]}</h2>
                    <p className="text-[13px] text-white/75">{c.categoryLead[cat]}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((e) => (
                <Link
                  key={e.id}
                  href={`/goals/${e.id}`}
                  style={hueVars(trackHue(e.id))}
                  className="group rounded-3xl p-5 flex flex-col gap-4 min-h-[184px] bg-[var(--hue)] text-[var(--hue-deep)] transition-[scale] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[0.97] focus-visible:outline-[var(--hue)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Image src={trackArt(e.id)} alt="" width={560} height={560} sizes="88px" className="w-[88px] h-[88px] -ml-1 -mt-1 object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.16)] transition-[rotate,scale] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-4 group-hover:scale-105" />
                    <span className="w-8 h-8 rounded-full border border-current/30 grid place-items-center transition-colors group-hover:bg-[var(--hue-deep)] group-hover:text-[var(--hue)] group-hover:border-transparent">
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-mono text-[11px] font-medium tracking-[0.04em] opacity-80">{e.code}</p>
                    <h3 className="text-[22px] font-bold tracking-[-0.025em] leading-[1.1]">{e.title[locale]}</h3>
                    <p className="text-[13px] leading-relaxed line-clamp-2 opacity-85">{e.subtitle[locale]}</p>
                  </div>
                  <p className="mt-auto flex flex-wrap gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em]">
                    {[`${e.recommendedWeeks} ${c.weeks}`, `${e.baselineTotalHours} ${c.hours}`, `${e.steps} ${c.steps}`].map((t) => (
                      <span key={t} className="h-6 inline-flex items-center px-2.5 rounded-full border border-current/35">{t}</span>
                    ))}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
    </AppShell>
    </>
  );
}
