'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Flame, ListChecks, MessageSquare, Plus } from 'lucide-react';
import type { Roadmap, RoadmapStep } from '@core/schemas';
import { computeRoadmapProgress } from '@core/scheduler';
import { useWorkspace } from '@/components/WorkspaceProvider';
import { ProgressRing } from '@/components/ProgressRing';
import { AppShell } from '@/components/AppShell';
import { BarButton, Topbar } from '@/components/workspace/Topbar';
import { useRouter } from 'next/navigation';
import { useListKeys } from '@/lib/use-list-keys';
import { SkeletonLines } from '@/components/Skeleton';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { localDay, useActivity } from './activity';
import { todayCopy } from './copy';

interface TodayItem {
  moduleId: string;
  step: RoadmapStep;
}

/** Today's batch: steps finished today (stay visible) + next open steps up to the daily time budget. */
function todaysBatch(rm: Roadmap, todayIds: Set<string>): TodayItem[] {
  const budget = Math.max(30, rm.dailyHours * 60);
  const out: TodayItem[] = [];
  let used = 0;
  for (const ph of rm.phases) {
    for (const mod of ph.modules) {
      if (mod.priority === 'skip') continue;
      for (const step of mod.steps) {
        const doneToday = todayIds.has(`step:${rm.id}:${step.id}`);
        if (step.completed && !doneToday) continue;
        if (!step.completed && used >= budget) continue;
        out.push({ moduleId: mod.id, step });
        used += step.estimatedMinutes;
      }
    }
  }
  return out.slice(0, 6);
}

const daysUntil = (iso: string) => Math.max(0, Math.ceil((new Date(`${iso}T23:59:59`).getTime() - Date.now()) / 86_400_000));

function StatusButton({ done, onToggle, label }: { done: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      data-toggle
      tabIndex={-1}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={done}
      aria-label={label}
      className={cn(
        'check-btn w-[18px] h-[18px] rounded-full grid place-items-center border-[1.5px] transition-all shrink-0 cursor-pointer active:scale-90',
        done ? 'bg-accent border-accent text-on-accent' : 'border-ink/30 text-transparent hover:border-ink/60'
      )}
    >
      <Check className="w-2.5 h-2.5" strokeWidth={3.5} aria-hidden="true" />
    </button>
  );
}

export function TodayView() {
  const router = useRouter();
  const { locale, roadmaps, tasks, toggleStep, toggleTask, hydrated, user } = useWorkspace();
  const c = todayCopy(locale);
  const { streak, todayIds, last7 } = useActivity();
  const listRef = useRef<HTMLDivElement>(null);
  useListKeys(listRef);

  const active = roadmaps.filter((r) => r.status !== 'archived');
  const today = localDay();
  const todayTasks = tasks.filter((t) => !t.completed || todayIds.has(`task:${t.id}`)).slice(0, 8);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? c.morning : hour < 18 ? c.afternoon : c.evening;
  const firstName = user?.displayName?.split(' ')[0];
  const dateLabel = new Date().toLocaleDateString(locale === 'uz' ? 'uz-UZ' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <>
      <Topbar
        crumbs={[{ label: c.todayFor }]}
        actions={
          <>
            <span className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12px] text-ink-2" title={streak > 0 ? c.streak(streak) : c.noStreak}>
              <Flame className={cn('w-3.5 h-3.5', streak > 0 ? 'text-[#C2410C]' : 'text-muted/60')} aria-hidden="true" />
              <span className="font-mono-tabular">{streak}</span>
            </span>
            <BarButton primary onClick={() => router.push('/goals')}><Plus aria-hidden="true" /> {c.newPlan}</BarButton>
          </>
        }
      />
      <AppShell>
        <div className="space-y-8 page-enter">
          <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[12px] text-muted capitalize">{dateLabel}</p>
              <h1 className="mt-1 text-[28px] sm:text-[32px] font-medium tracking-[-0.03em] text-ink">
                {greeting}{firstName ? `, ${firstName}` : ''}
              </h1>
            </div>
            <div className="flex items-center gap-3" aria-label={streak > 0 ? c.streak(streak) : c.noStreak}>
              <div className="flex gap-1.5" aria-hidden="true">
                {last7.map((d) => (
                  <div key={d.key} className="flex flex-col items-center gap-1">
                    <span className={cn('w-5 h-5 rounded-md transition-colors', d.count > 0 ? 'bg-accent' : 'bg-ink/[0.07]', d.key === today && 'ring-1 ring-ink/30 ring-offset-1 ring-offset-canvas')} />
                    <span className="text-[10px] text-muted">{c.week[d.date.getDay()]}</span>
                  </div>
                ))}
              </div>
            </div>
          </header>

          {!hydrated ? (
            <SkeletonLines rows={4} />
          ) : active.length === 0 ? (
            <Card className="overflow-hidden grid grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[220px] md:min-h-[340px]">
                <Image src="/photos/library.webp" alt={locale === 'uz' ? 'Sokin kutubxona oʻqish zali' : 'A quiet library reading room'} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center items-start gap-5">
                <h2 className="text-[28px] sm:text-[34px] leading-[1.05] font-medium tracking-[-0.03em] text-ink">{c.emptyTitle}</h2>
                <p className="text-[15px] leading-relaxed text-ink-2 max-w-md">{c.emptySub}</p>
                <Link href="/goals" className={buttonVariants({ size: 'lg' })}>
                  {c.emptyCta} <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </Card>
          ) : (
            <div ref={listRef} className="space-y-6">
              {active.map((rm) => {
                const items = todaysBatch(rm, todayIds);
                const progress = computeRoadmapProgress(rm);
                const done = items.filter((i) => i.step.completed).length;
                return (
                  <section key={rm.id} aria-label={rm.title[locale]} className="rounded-2xl border border-ink/[0.07] bg-surface overflow-hidden">
                    <div className="flex items-center gap-3 h-11 px-4 bg-surface-2 border-b border-ink/[0.06]">
                      <ProgressRing value={progress.percentComplete} size={20} stroke={2.5} label={`${progress.percentComplete}%`} hideLabel />
                      <Link href={`/plan/${rm.id}`} className="text-[13px] font-medium text-ink hover:underline underline-offset-2 truncate">{rm.title[locale]}</Link>
                      <span className="hidden sm:inline text-[12px] text-muted truncate">{rm.targetGoal}</span>
                      <span className="ml-auto text-[12px] text-muted font-mono-tabular whitespace-nowrap">
                        {c.progressToday(done, items.length)} · {daysUntil(rm.deadlineDate)} {c.daysLeft}
                      </span>
                    </div>
                    {items.length > 0 && done === items.length && (
                      <p className="px-4 py-2.5 text-[13px] text-success border-b border-ink/[0.06] ts-arrive">{c.allDone}</p>
                    )}
                    <ul>
                      {items.map(({ moduleId, step }) => (
                        <li
                          key={step.id}
                          data-row
                          tabIndex={0}
                          className="group flex items-center gap-3 min-h-11 px-4 py-2 border-b border-ink/[0.05] last:border-0 hover:bg-ink/[0.025] transition-colors"
                        >
                          <StatusButton done={step.completed} label={step.title[locale]} onToggle={() => void toggleStep(rm.id, moduleId, step.id)} />
                          <div className="flex-1 min-w-0">
                            <p className={cn('text-[14px] truncate', step.completed ? 'text-muted line-through decoration-ink/25' : 'text-ink')}>{step.title[locale]}</p>
                            {!step.completed && <p className="text-[12px] text-muted truncate">{step.drill[locale]}</p>}
                          </div>
                          <span className="hidden sm:inline text-[11px] text-muted font-mono-tabular px-1.5 py-0.5 rounded-md bg-ink/[0.04] shrink-0">{step.framework}</span>
                          <span className="text-[12px] text-muted font-mono-tabular w-12 text-right shrink-0">{step.estimatedMinutes} {c.minutes}</span>
                          <Link
                            href={`/plan/${rm.id}?ask=${step.id}`}
                            data-open
                            tabIndex={-1}
                            aria-label={c.ask}
                            className="w-7 h-7 rounded-md grid place-items-center text-muted hover:text-ink hover:bg-ink/[0.06] shrink-0 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 transition-opacity"
                          >
                            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}

              <section aria-label={c.tasks} className="rounded-2xl border border-ink/[0.07] bg-surface overflow-hidden">
                <div className="flex items-center gap-3 h-11 px-4 bg-surface-2 border-b border-ink/[0.06]">
                  <ListChecks className="w-4 h-4 text-muted" aria-hidden="true" />
                  <span className="text-[13px] font-medium text-ink">{c.tasks}</span>
                  <Link href="/assistant" className="ml-auto text-[12px] text-muted hover:text-ink inline-flex items-center gap-1">
                    {c.planDay} <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
                {todayTasks.length === 0 ? (
                  <p className="px-4 py-4 text-[13px] text-muted">{c.planDayHint}</p>
                ) : (
                  <ul>
                    {todayTasks.map((t) => (
                      <li key={t.id} data-row tabIndex={0} className="flex items-center gap-3 min-h-11 px-4 py-2 border-b border-ink/[0.05] last:border-0 hover:bg-ink/[0.025] transition-colors">
                        <StatusButton done={t.completed} label={t.title} onToggle={() => void toggleTask(t.id)} />
                        <p className={cn('flex-1 min-w-0 text-[14px] truncate', t.completed ? 'text-muted line-through decoration-ink/25' : 'text-ink')}>{t.title}</p>
                        <span className="text-[12px] text-muted font-mono-tabular shrink-0">{t.startTime}–{t.endTime}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <p className="hidden lg:block text-[11px] text-muted font-mono-tabular">{c.keys}</p>
            </div>
          )}
        </div>
      </AppShell>
    </>
  );
}
