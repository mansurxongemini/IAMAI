'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { getCatalogEntry } from '@core/catalog';
import { PlanParams } from '@/components/PlanParams';
import { useWorkspace } from '@/components/WorkspaceProvider';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { apiPost } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import { AppShell } from '@/components/AppShell';
import { Topbar } from '@/components/workspace/Topbar';
import { CATEGORY_ICON } from '@/features/goals/GoalCatalog';
import { onboardingCopy, presetsFor } from '@/features/goals/copy';
import { TRACK_PHOTO } from '@/features/goals/photos';

const TOTAL = 4;

function ChoiceGrid({ options, value, onPick }: { options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onPick(o)}
            aria-pressed={on}
            className={cn(
              'h-14 rounded-2xl px-4 text-[15px] font-medium text-left transition-all cursor-pointer active:scale-[0.98]',
              on ? 'bg-accent text-on-accent shadow-sm' : 'bg-surface/80 border border-ink/[0.08] text-ink hover:border-ink/25'
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function OnboardingWizard({ goalId }: { goalId: string }) {
  const router = useRouter();
  const { locale, profile, addRoadmap } = useWorkspace();
  const c = onboardingCopy(locale);
  const entry = getCatalogEntry(goalId);

  const [step, setStep] = useState(0);
  const [level, setLevel] = useState('');
  const [target, setTarget] = useState('');
  const [deadlineDays, setDeadlineDays] = useState(entry?.category === 'rhetoric' ? 42 : 60);
  const [dailyHours, setDailyHours] = useState(2);
  const [focus, setFocus] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!entry) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="font-editorial text-3xl">{c.notFound}</p>
        <Link href="/goals" className="text-sm underline">/goals</Link>
      </div>
    );
  }

  const presets = presetsFor(entry.id, entry.category);
  const Icon = CATEGORY_ICON[entry.category];
  const canNext = step === 0 ? level.trim().length >= 2 : step === 1 ? target.trim().length >= 2 : true;

  async function generate() {
    if (!entry) return;
    setBusy(true);
    setError(null);
    try {
      const { ok, data } = await apiPost('/api/roadmap/adapt', {
        blueprintId: entry.id,
        locale,
        currentLevel: level.trim(),
        targetGoal: target.trim(),
        deadlineDays,
        dailyHours,
        busyWindows: profile.busyWindows,
        weakAreas: focus.trim() || undefined,
      });
      if (!ok) throw new Error(typeof data?.error === 'string' ? data.error : 'Error');
      await addRoadmap(data.roadmap);
      router.push(`/plan/${data.roadmap.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
      setBusy(false);
    }
  }

  const next = () => {
    if (!canNext) return;
    if (step < TOTAL - 1) setStep(step + 1);
    else void generate();
  };

  if (busy) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-center animate-fade-in">
        <div className="space-y-5">
          <div className="relative w-16 h-16 mx-auto">
            <span className="absolute inset-0 rounded-full border-2 border-ink/10" />
            <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-ink animate-spin" />
            <Sparkles className="absolute inset-0 m-auto w-5 h-5 text-accent" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="font-editorial text-3xl text-ink">{c.generating}</p>
            <p className="text-sm text-muted">{c.generatingSub}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Topbar crumbs={[{ label: locale === 'uz' ? 'Maqsadlar' : 'Goals', href: '/goals' }, { label: entry.title[locale] }]} />
    <AppShell wide>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-6 items-start">
    <div className="lg:col-span-6 space-y-8 page-enter" onKeyDown={(e) => e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement) && next()}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {step === 0 ? (
            <Link href="/goals" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> {c.back}
            </Link>
          ) : (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> {c.back}
            </button>
          )}
          <span className="text-xs text-muted">{c.stepOf(step + 1, TOTAL)}</span>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: TOTAL }, (_, i) => (
            <span key={i} className={cn('h-1 flex-1 rounded-none transition-colors duration-300', i <= step ? 'bg-ink' : 'bg-ink/10')} />
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-accent">
          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="font-medium">{entry.title[locale]}</span>
        </div>
      </div>

      <div key={step} className="space-y-5 animate-fade-in">
        {step === 0 && (
          <>
            <h1 className="font-editorial text-4xl font-medium tracking-tight text-ink">{c.levelQ}</h1>
            <ChoiceGrid options={presets.current.map((o) => o[locale])} value={level} onPick={setLevel} />
            <Input value={level} onChange={(e) => setLevel(e.target.value)} placeholder={c.custom} maxLength={200} aria-label={c.levelHint} />
          </>
        )}
        {step === 1 && (
          <>
            <h1 className="font-editorial text-4xl font-medium tracking-tight text-ink">{c.targetQ}</h1>
            <ChoiceGrid options={presets.target.map((o) => o[locale])} value={target} onPick={setTarget} />
            <Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder={c.custom} maxLength={200} aria-label={c.targetHint} />
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="font-editorial text-4xl font-medium tracking-tight text-ink">{c.timeQ}</h1>
            <PlanParams
              locale={locale}
              deadlineDays={deadlineDays}
              setDeadlineDays={setDeadlineDays}
              dailyHours={dailyHours}
              setDailyHours={setDailyHours}
              baselineHours={entry.baselineTotalHours}
              deadlineLabel={c.deadline}
              hoursLabel={c.daily}
              dayOptions={entry.category === 'rhetoric' ? [21, 42, 60, 90] : [30, 60, 90, 180]}
            />
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="font-editorial text-4xl font-medium tracking-tight text-ink">{c.focusQ}</h1>
            <p className="text-sm text-muted">{c.focusHint}</p>
            <Textarea rows={4} value={focus} onChange={(e) => setFocus(e.target.value)} placeholder={c.focusPlaceholder} maxLength={300} />
          </>
        )}
      </div>

      {error && <p role="alert" className="text-sm text-warn bg-warn/[0.08] rounded-2xl px-4 py-3">{error}</p>}

      <div className="flex gap-3">
        <Button size="lg" onClick={next} disabled={!canNext} className="flex-1">
          {step === TOTAL - 1 ? c.generate : c.next}
          {step === TOTAL - 1 ? <Sparkles aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </Button>
      </div>
    </div>

    <aside className="hidden lg:block lg:col-start-8 lg:col-span-5 sticky top-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-none">
        <Image src={TRACK_PHOTO[entry.category].src} alt={TRACK_PHOTO[entry.category].alt[locale]} fill sizes="40vw" className="object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 p-7 text-white space-y-3">
          <p className="text-[12px] font-mono-tabular tracking-wide text-white/70">{entry.code}</p>
          <p className="text-[28px] leading-tight font-medium tracking-[-0.03em]">{entry.title[locale]}</p>
          <p className="text-[14px] leading-relaxed text-white/80">{entry.subtitle[locale]}</p>
          <dl className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4 font-mono-tabular">
            <div><dt className="text-[11px] text-white/60">{locale === 'uz' ? 'hafta' : 'weeks'}</dt><dd className="text-[20px]">{entry.recommendedWeeks}</dd></div>
            <div><dt className="text-[11px] text-white/60">{locale === 'uz' ? 'soat' : 'hours'}</dt><dd className="text-[20px]">{entry.baselineTotalHours}</dd></div>
            <div><dt className="text-[11px] text-white/60">{locale === 'uz' ? 'qadam' : 'steps'}</dt><dd className="text-[20px]">{entry.steps}</dd></div>
          </dl>
        </div>
      </div>
    </aside>
    </div>
    </AppShell>
    </>
  );
}
