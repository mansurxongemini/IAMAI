'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Archive, ArrowLeft, ArrowRight, Check, ChevronDown, MessageSquare } from 'lucide-react';
import { computeRoadmapProgress } from '@core/scheduler';
import type { RoadmapNode, RoadmapStep } from '@core/schemas';
import { SkeletonLines } from '@/components/Skeleton';
import { AppShell } from '@/components/AppShell';
import { Topbar } from '@/components/workspace/Topbar';
import { useListKeys } from '@/lib/use-list-keys';
import { ProgressRing } from '@/components/ProgressRing';
import dynamic from 'next/dynamic';
const NodeTutorDrawer = dynamic(() => import('@/components/NodeTutorDrawer').then((m) => m.NodeTutorDrawer), { ssr: false });
import { useWorkspace } from '@/components/WorkspaceProvider';
import { TRACK_PHOTO } from '@/features/goals/photos';

export default function RoadmapWorkspacePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { dict, locale, roadmaps, toggleStep, archiveRoadmap, hydrated } = useWorkspace();

  const [tutorNode, setTutorNode] = useState<RoadmapNode | null>(null);
  const [tutorStep, setTutorStep] = useState<RoadmapStep | null>(null);
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({});
  const listRef = useRef<HTMLElement>(null);
  useListKeys(listRef);
  const [confirmArchive, setConfirmArchive] = useState(false);

  // Deep link from Today: /plan/:id?ask=<stepId> opens the tutor on that step.
  useEffect(() => {
    const ask = new URLSearchParams(window.location.search).get('ask');
    if (!ask) return;
    const rmFound = roadmaps.find((r) => r.id === params?.id);
    if (!rmFound) return;
    for (const ph of rmFound.phases)
      for (const mod of ph.modules) {
        const st = mod.steps.find((x) => x.id === ask);
        if (st) {
          setTutorNode(mod);
          setTutorStep(st);
          window.history.replaceState(null, '', window.location.pathname);
          return;
        }
      }
  }, [roadmaps, params?.id]);

  useEffect(() => {
    if (!confirmArchive) return;
    const t = setTimeout(() => setConfirmArchive(false), 3000);
    return () => clearTimeout(t);
  }, [confirmArchive]);

  const roadmap = useMemo(
    () => roadmaps.find((rm) => rm.id === params?.id),
    [roadmaps, params?.id]
  );

  if (!roadmap && !hydrated) {
    return (
      <><Topbar crumbs={[{ label: dict.nav.dashboard, href: '/today' }]} /><AppShell>
        <div className="glass-surface rounded-3xl p-8">
          <SkeletonLines rows={4} />
        </div>
      </AppShell></>
    );
  }

  if (!roadmap) {
    return (
      <><Topbar crumbs={[{ label: dict.nav.dashboard, href: '/today' }]} /><AppShell>
        <div className="glass-surface rounded-3xl p-10 text-center space-y-4">
          <h1 className="font-editorial text-3xl text-ink">{dict.roadmap.notFound}</h1>
          <Link
            href="/today"
            className="inline-flex items-center gap-2 rounded-none bg-accent px-5 py-2.5 text-xs font-medium text-on-accent"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.roadmap.backToDashboard}</span>
          </Link>
        </div>
      </AppShell></>
    );
  }

  const progress = computeRoadmapProgress(roadmap);
  const rm = roadmap;

  const DAY = 86_400_000;
  const start = new Date(rm.createdAt).getTime();
  const end = new Date(`${rm.deadlineDate}T23:59:59`).getTime();
  const now = Date.now();
  const daysLeft = Math.max(0, Math.ceil((end - now) / DAY));
  const elapsed = end > start ? Math.min(1, Math.max(0, (now - start) / (end - start))) : 1;
  const paceDelta = Math.round(progress.completedSteps - elapsed * progress.totalSteps);
  const paceLabel =
    Math.abs(paceDelta) <= 1
      ? dict.roadmap.onTrack
      : (paceDelta < 0 ? dict.roadmap.behind : dict.roadmap.ahead).replace('{n}', String(Math.abs(paceDelta)));
  const paceTone = paceDelta < -1 ? 'text-warn' : 'text-success';

  const phaseStats = rm.phases.map((phase) => {
    let done = 0;
    let total = 0;
    for (const mod of phase.modules) {
      if (mod.priority === 'skip') continue;
      for (const st of mod.steps) {
        total += 1;
        if (st.completed) done += 1;
      }
    }
    return { id: phase.id, done, total, complete: total > 0 && done === total };
  });
  const currentPhaseId = phaseStats.find((p) => !p.complete)?.id ?? null;

  let nextStep: { modId: string; stepId: string } | null = null;
  for (const phase of rm.phases) {
    for (const mod of phase.modules) {
      if (mod.priority === 'skip') continue;
      const st = mod.steps.find((x) => !x.completed);
      if (st) {
        nextStep = { modId: mod.id, stepId: st.id };
        break;
      }
    }
    if (nextStep) break;
  }

  const isPhaseOpen = (id: string) => openPhases[id] ?? !phaseStats.find((p) => p.id === id)?.complete;

  const priorityLabel = (priority: RoadmapNode['priority']) => {
    if (priority === 'skip') return dict.roadmap.skippedLabel;
    if (priority === 'high') return dict.roadmap.highPriority;
    if (priority === 'low') return dict.roadmap.lowPriority;
    return dict.roadmap.normalPriority;
  };

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function jumpToNext() {
    if (!nextStep) return;
    const phase = rm.phases.find((p) => p.modules.some((m) => m.id === nextStep?.modId));
    if (phase) setOpenPhases((prev) => ({ ...prev, [phase.id]: true }));
    requestAnimationFrame(() => scrollToId(`step-${nextStep?.stepId}`));
  }

  async function handleArchive() {
    if (!confirmArchive) {
      setConfirmArchive(true);
      return;
    }
    await archiveRoadmap(rm.id);
    router.push('/today');
  }

  return (
    <><Topbar crumbs={[{ label: locale === 'uz' ? 'Rejalar' : 'Plans', href: '/today' }, { label: rm.title[locale] }]} /><AppShell wide>
      <div className="space-y-6 page-enter">
        <div className="flex items-center justify-between gap-4">
          <Link href="/today" className="inline-flex items-center gap-2 text-xs font-medium text-muted hover:text-ink transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.roadmap.backToDashboard}</span>
          </Link>
          <button
            type="button"
            onClick={() => void handleArchive()}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-none text-xs transition-colors cursor-pointer ${
              confirmArchive ? 'bg-warn text-white' : 'text-muted hover:text-ink hover:bg-surface/70'
            }`}
          >
            <Archive className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{confirmArchive ? dict.roadmap.confirmArchive : dict.roadmap.deleteRoadmap}</span>
          </button>
        </div>

        {/* Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 glass-surface rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
            <div className="space-y-3">
              <div className="flex items-center flex-wrap gap-2 text-xs">
                <span className="rounded-none bg-ink/[0.05] px-2.5 py-1 text-muted">{rm.currentLevel}</span>
                <ArrowRight className="w-3 h-3 text-muted" aria-hidden="true" />
                <span className="rounded-none bg-accent px-2.5 py-1 text-on-accent font-medium">{rm.targetGoal}</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-ink">{rm.title[locale]}</h1>
              <p className="text-sm text-muted leading-relaxed max-w-2xl">{rm.strategySummary}</p>
            </div>
            <div className="mt-auto pt-5 border-t border-ink/[0.07] flex flex-wrap items-center gap-x-8 gap-y-4">
              <ProgressRing value={progress.percentComplete} size={60} label={dict.roadmap.overallProgress} />
              <div>
                <p className="text-xs text-muted">{dict.roadmap.stepsCompleted}</p>
                <p className="font-mono-tabular text-xl font-medium text-ink">
                  {progress.completedSteps}<span className="text-muted">/{progress.totalSteps}</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">{dict.roadmap.deadline}</p>
                <p className="font-mono-tabular text-xl font-medium text-ink">
                  {daysLeft} <span className="text-sm text-muted font-normal">{dict.roadmap.daysLeft}</span>
                </p>
              </div>
              <p className={`text-xs font-medium ${paceTone}`}>{paceLabel}</p>
              {nextStep && (
                <button
                  type="button"
                  onClick={jumpToNext}
                  className="ml-auto inline-flex items-center gap-2 h-10 px-5 rounded-none bg-accent text-on-accent text-xs font-medium hover:bg-accent/90 transition-colors cursor-pointer"
                >
                  {dict.roadmap.continueNext}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 obsidian-surface relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6">
            <Image src={TRACK_PHOTO[rm.category].src} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-40" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" aria-hidden="true" />
            <div className="relative space-y-1.5">
              <p className="text-xs text-[#C7B9A5]">{dict.roadmap.dailySlot}</p>
              <p className="text-[15px] font-medium text-white leading-relaxed">{rm.dailySlotRecommendation}</p>
            </div>
            <div className="relative grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-white/55">{dict.roadmap.deadline}</p>
                <p className="font-mono-tabular text-lg font-medium text-white mt-0.5">{rm.deadlineDate}</p>
              </div>
              <div>
                <p className="text-xs text-white/55">{dict.roadmap.allocatedHours}</p>
                <p className="font-mono-tabular text-lg font-medium text-white mt-0.5">
                  {rm.totalAllocatedHours} {dict.common.hours}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 items-start">
          {/* Phase navigator */}
          <nav aria-label={dict.roadmap.phases} className="hidden lg:block sticky top-24 glass-surface rounded-3xl p-3">
            <p className="px-3 pt-1 pb-2 text-[11px] label-mono text-muted/80">{dict.roadmap.phases}</p>
            <ol className="space-y-0.5">
              {rm.phases.map((phase, i) => {
                const st = phaseStats[i];
                const isCurrent = phase.id === currentPhaseId;
                return (
                  <li key={phase.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenPhases((prev) => ({ ...prev, [phase.id]: true }));
                        requestAnimationFrame(() => document.getElementById(`phase-${phase.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                      }}
                      className={`w-full text-left rounded-2xl px-3 py-2.5 transition-colors cursor-pointer ${isCurrent ? 'bg-surface shadow-sm' : 'hover:bg-surface/60'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-full grid place-items-center text-[10px] font-medium shrink-0 ${
                            st?.complete ? 'bg-accent text-on-accent' : isCurrent ? 'border border-ink text-ink' : 'border border-ink/20 text-muted'
                          }`}
                        >
                          {st?.complete ? <Check className="w-3 h-3" aria-hidden="true" /> : i + 1}
                        </span>
                        <span className={`text-xs leading-snug line-clamp-2 ${isCurrent ? 'text-ink font-medium' : 'text-muted'}`}>{phase.title[locale]}</span>
                      </div>
                      {st && st.total > 0 && (
                        <div className="mt-2 ml-7 h-1 rounded-none bg-ink/[0.07] overflow-hidden">
                          <div className="h-full bg-ink rounded-none transition-all duration-500" style={{ width: `${(st.done / st.total) * 100}%` }} />
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Phases */}
          <section ref={listRef} className="space-y-4 min-w-0">
            {rm.phases.map((phase, i) => {
              const st = phaseStats[i];
              const open = isPhaseOpen(phase.id);
              const isCurrent = phase.id === currentPhaseId;
              return (
                <div key={phase.id} id={`phase-${phase.id}`} className="glass-surface rounded-3xl scroll-mt-24">
                  <button
                    type="button"
                    onClick={() => setOpenPhases((prev) => ({ ...prev, [phase.id]: !open }))}
                    aria-expanded={open}
                    className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 text-xs">
                        <span className="font-mono-tabular text-accent">{phase.startDate} — {phase.endDate}</span>
                        {isCurrent && <span className="rounded-none bg-accent text-on-accent px-2 py-0.5 text-[10px] font-medium">{dict.roadmap.current}</span>}
                        {st?.complete && <span className="rounded-none bg-success/10 text-success px-2 py-0.5 text-[10px] font-medium">{dict.roadmap.phaseDone}</span>}
                      </div>
                      <h2 className="font-editorial text-2xl sm:text-[28px] font-medium text-ink leading-tight">{phase.title[locale]}</h2>
                      <p className="text-sm text-muted">{phase.objective[locale]}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 pt-1">
                      {st && st.total > 0 && <span className="font-mono-tabular text-xs text-muted">{st.done}/{st.total}</span>}
                      <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </div>
                  </button>

                  {open && (
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 divide-y divide-ink/[0.07] border-t border-ink/[0.07] animate-fade-in">
                      {phase.modules.map((mod) => {
                        const isSkipped = mod.priority === 'skip';
                        return (
                          <div key={mod.id} className={`py-6 last:pb-0 space-y-4 ${isSkipped ? 'opacity-55' : ''}`}>
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="space-y-1.5 min-w-0">
                                <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-muted">
                                  <span className="font-mono-tabular text-ink font-medium">{mod.weekRange}</span>
                                  <span aria-hidden="true">·</span>
                                  <span className={mod.priority === 'high' ? 'text-accent font-medium' : ''}>{priorityLabel(mod.priority)}</span>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-mono-tabular">{mod.allocatedHours} {dict.common.hours}</span>
                                  <span aria-hidden="true">·</span>
                                  <span>{mod.keyFramework}</span>
                                </div>
                                <h3 className="font-editorial text-[22px] font-medium text-ink leading-snug">{mod.title[locale]}</h3>
                                <p className="text-sm text-muted">{mod.customFocus || mod.summary[locale]}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setTutorNode(mod);
                                  setTutorStep(null);
                                }}
                                className="inline-flex items-center gap-2 h-9 rounded-none border border-ink/12 px-4 text-xs font-medium text-ink hover:bg-accent hover:text-on-accent hover:border-accent transition-colors whitespace-nowrap shrink-0 self-start cursor-pointer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>{dict.roadmap.askTutor}</span>
                              </button>
                            </div>

                            {!isSkipped && (
                              <ul className="space-y-1">
                                {mod.steps.map((step) => {
                                  const isNext = nextStep?.stepId === step.id;
                                  return (
                                    <li
                                      key={step.id}
                                      id={`step-${step.id}`}
                                      data-row
                                      tabIndex={0}
                                      className={`group flex items-start gap-3.5 py-3 px-3 -mx-3 rounded-2xl transition-colors scroll-mt-28 ${
                                        isNext ? 'bg-surface ring-1 ring-ink/10 shadow-sm' : 'hover:bg-surface/60'
                                      }`}
                                    >
                                      <button
                                        type="button"
                                        data-toggle
                                        tabIndex={-1}
                                        onClick={() => void toggleStep(rm.id, mod.id, step.id)}
                                        aria-label={`Toggle milestone "${step.title[locale]}"`}
                                        aria-pressed={step.completed}
                                        className={`mt-0.5 w-[22px] h-[22px] check-btn rounded-full grid place-items-center border transition-all duration-200 shrink-0 cursor-pointer active:scale-90 ${
                                          step.completed ? 'bg-accent border-accent text-on-accent' : 'border-ink/25 text-transparent hover:border-ink hover:text-ink/30'
                                        }`}
                                      >
                                        <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                                      </button>
                                      <div className="flex-1 space-y-0.5 min-w-0">
                                        <p className={`text-sm font-medium transition-colors ${step.completed ? 'line-through decoration-ink/30 text-muted' : 'text-ink'}`}>
                                          {step.title[locale]}
                                        </p>
                                        <p className="text-xs text-muted leading-relaxed">{step.drill[locale]}</p>
                                        <p className="text-[11px] text-accent font-mono-tabular pt-0.5">
                                          {step.framework} · {step.estimatedMinutes} {dict.roadmap.minutesShort}
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setTutorNode(mod);
                                          setTutorStep(step);
                                        }}
                                        data-open
                                        tabIndex={-1}
                                        aria-label={`${dict.roadmap.askTutor}: ${step.title[locale]}`}
                                        className="w-8 h-8 rounded-none grid place-items-center text-muted hover:text-ink hover:bg-surface transition-all shrink-0 cursor-pointer sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
                                      >
                                        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <NodeTutorDrawer
        roadmap={rm}
        node={tutorNode}
        activeStep={tutorStep}
        onClose={() => {
          setTutorNode(null);
          setTutorStep(null);
        }}
      />
    </AppShell></>
  );
}
