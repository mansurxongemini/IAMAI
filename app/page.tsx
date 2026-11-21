'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, Circle, Loader2, Plus } from 'lucide-react';
import { computeRoadmapProgress, formatIsoDate } from '@core/scheduler';
import { AppShell } from '@/components/AppShell';
import { useWorkspace } from '@/components/WorkspaceProvider';

export default function DashboardPage() {
  const router = useRouter();
  const {
    dict,
    locale,
    setLocale,
    roadmaps,
    tasks,
    profile,
    user,
    toggleTask,
    addTasks,
    setDayBrief,
  } = useWorkspace();

  const [quickInput, setQuickInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);

  const activeRoadmaps = useMemo(
    () => roadmaps.filter((rm) => rm.status !== 'archived'),
    [roadmaps]
  );

  const metrics = useMemo(() => {
    let totalSteps = 0;
    let completedSteps = 0;
    let totalHours = 0;
    for (const rm of activeRoadmaps) {
      const p = computeRoadmapProgress(rm);
      totalSteps += p.totalSteps;
      completedSteps += p.completedSteps;
      totalHours += rm.totalAllocatedHours;
    }
    const completionRate = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    const completedTasks = tasks.filter((t) => t.completed).length;
    return {
      activeCount: activeRoadmaps.length,
      completionRate,
      totalHours: Math.round(totalHours),
      completedTasks,
      totalTasks: tasks.length,
    };
  }, [activeRoadmaps, tasks]);

  async function handleQuickCapture(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = quickInput.trim();
    if (trimmed.length < 4) {
      setQuickError(
        locale === 'uz'
          ? 'Kamida bitta aniq vazifa kiriting.'
          : 'Enter at least one clear task or obligation.'
      );
      return;
    }
    setQuickError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/tasks/decompose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawInput: trimmed,
          locale,
          date: formatIsoDate(new Date()),
          availableStart: profile.preferredStartTime,
          availableEnd: profile.preferredEndTime,
          busyWindows: profile.busyWindows,
          ownerId: user?.uid ?? 'local-executive',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not sequence tasks.');
      }
      if (data.dayBrief) setDayBrief(data.dayBrief);
      if (Array.isArray(data.tasks) && data.tasks.length > 0) {
        await addTasks(data.tasks);
      }
      setQuickInput('');
      router.push('/assistant');
    } catch (err) {
      setQuickError(err instanceof Error ? err.message : 'Unable to sequence tasks.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Editorial Header Row + Inline Language Segmented Control */}
        <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs text-[#6A6760]">
              {user ? dict.dashboard.syncCloud : dict.dashboard.localWorkspace}
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <span className="font-mono-tabular">{formatIsoDate(new Date())}</span>
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#1C1C1A]">
              {dict.dashboard.greeting}
            </h1>
            <p className="text-sm text-[#6A6760] max-w-xl">{dict.dashboard.subtitle}</p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end shrink-0">
            <div
              role="group"
              aria-label="Language"
              className="glass-surface rounded-full p-1 inline-flex items-center gap-1"
            >
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  locale === 'en'
                    ? 'bg-[#1C1C1A] text-white'
                    : 'text-[#6A6760] hover:text-[#1C1C1A]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale('uz')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  locale === 'uz'
                    ? 'bg-[#1C1C1A] text-white'
                    : 'text-[#6A6760] hover:text-[#1C1C1A]'
                }`}
              >
                UZ
              </button>
            </div>

            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 rounded-full bg-[#1C1C1A] px-4 py-2 text-xs font-medium text-white hover:bg-[#32322F] transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{dict.dashboard.newRoadmap}</span>
            </Link>
          </div>
        </section>

        {/* 4-Column Tabular Metrics Strip */}
        <section
          aria-label="Key metrics"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="glass-surface rounded-3xl p-5 flex flex-col justify-between gap-2">
            <span className="text-xs text-[#6A6760]">{dict.dashboard.metrics.activePlans}</span>
            <span className="font-mono-tabular text-3xl font-medium text-[#1C1C1A]">
              {metrics.activeCount}
            </span>
          </div>
          <div className="glass-surface rounded-3xl p-5 flex flex-col justify-between gap-2">
            <span className="text-xs text-[#6A6760]">{dict.dashboard.metrics.completionRate}</span>
            <span className="font-mono-tabular text-3xl font-medium text-[#1C1C1A]">
              {metrics.completionRate}%
            </span>
          </div>
          <div className="glass-surface rounded-3xl p-5 flex flex-col justify-between gap-2">
            <span className="text-xs text-[#6A6760]">{dict.dashboard.metrics.scheduledHours}</span>
            <span className="font-mono-tabular text-3xl font-medium text-[#1C1C1A]">
              {metrics.totalHours}
              <span className="text-base text-[#6A6760] ml-1">{dict.common.hours}</span>
            </span>
          </div>
          <div className="glass-surface rounded-3xl p-5 flex flex-col justify-between gap-2">
            <span className="text-xs text-[#6A6760]">{dict.dashboard.metrics.tasksCompleted}</span>
            <span className="font-mono-tabular text-3xl font-medium text-[#1C1C1A]">
              {metrics.completedTasks}
              <span className="text-base text-[#6A6760]">/{metrics.totalTasks}</span>
            </span>
          </div>
        </section>

        {/* Asymmetric Bento Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 Columns: Active Roadmaps + Today's Time-Blocked Sequence */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active Roadmaps */}
            <div className="glass-surface rounded-3xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight">
                  {dict.dashboard.activeRoadmaps}
                </h2>
                <Link
                  href="/rhetoric"
                  className="text-xs font-medium text-[#6E573E] hover:text-[#1C1C1A] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                >
                  <span>{dict.nav.rhetoric}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              {activeRoadmaps.length === 0 ? (
                <div className="py-10 text-center space-y-4">
                  <p className="text-sm text-[#6A6760] max-w-md mx-auto">
                    {dict.dashboard.noRoadmaps}
                  </p>
                  <div className="flex justify-center gap-3">
                    <Link
                      href="/rhetoric"
                      className="rounded-full bg-[#1C1C1A] px-4 py-2 text-xs font-medium text-white"
                    >
                      {dict.nav.rhetoric}
                    </Link>
                    <Link
                      href="/certifications"
                      className="rounded-full border border-[#1C1C1A]/15 px-4 py-2 text-xs font-medium text-[#1C1C1A]"
                    >
                      {dict.nav.certifications}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-[#1C1C1A]/8">
                  {activeRoadmaps.map((rm) => {
                    const progress = computeRoadmapProgress(rm);
                    const categoryLabel =
                      rm.category === 'rhetoric'
                        ? dict.nav.rhetoric
                        : rm.category === 'legal'
                          ? dict.certifications.legalLabel
                          : dict.certifications.academicLabel;

                    return (
                      <div
                        key={rm.id}
                        className="py-5 first:pt-1 last:pb-1 flex items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2 text-xs text-[#6A6760]">
                            <span className="text-[#6E573E] font-medium">{categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">{rm.deadlineDate}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">
                              {rm.totalAllocatedHours} {dict.common.hours}
                            </span>
                          </div>

                          <Link
                            href={`/roadmap/${rm.id}`}
                            className="block font-editorial text-2xl font-medium text-[#1C1C1A] hover:text-[#6E573E] transition-colors leading-snug"
                          >
                            {rm.title[locale]}
                          </Link>

                          <p className="text-xs text-[#6A6760] line-clamp-1">
                            {rm.targetGoal} — {rm.strategySummary}
                          </p>

                          <div className="flex items-center gap-3 pt-1">
                            <div className="h-1.5 flex-1 max-w-xs rounded-full bg-[#1C1C1A]/10 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#1C1C1A] transition-all duration-200"
                                style={{ width: `${progress.percentComplete}%` }}
                              />
                            </div>
                            <span className="font-mono-tabular text-xs text-[#6A6760]">
                              {progress.completedSteps}/{progress.totalSteps} ({progress.percentComplete}%)
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/roadmap/${rm.id}`}
                          aria-label={`${dict.dashboard.openWorkspace}: ${rm.title[locale]}`}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#1C1C1A]/12 flex items-center justify-center text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white transition-colors shrink-0"
                        >
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Today's Time-Blocked Execution Schedule */}
            <div className="glass-surface rounded-3xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight">
                  {dict.dashboard.todaySchedule}
                </h2>
                <Link
                  href="/assistant"
                  className="text-xs font-medium text-[#6E573E] hover:text-[#1C1C1A] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                >
                  <span>{dict.dashboard.openAssistant}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              {tasks.length === 0 ? (
                <p className="text-sm text-[#6A6760] py-6">{dict.dashboard.noTasks}</p>
              ) : (
                <ul className="divide-y divide-[#1C1C1A]/8">
                  {tasks.slice(0, 6).map((task) => (
                    <li
                      key={task.id}
                      className="py-4 first:pt-1 last:pb-1 flex items-start gap-4"
                    >
                      <button
                        type="button"
                        onClick={() => void toggleTask(task.id)}
                        aria-label={`Toggle task "${task.title}"`}
                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border transition-colors shrink-0 cursor-pointer ${
                          task.completed
                            ? 'bg-[#1C1C1A] border-[#1C1C1A] text-white'
                            : 'border-[#1C1C1A]/30 text-transparent hover:border-[#1C1C1A]'
                        }`}
                      >
                        {task.completed ? (
                          <Check className="w-3 h-3" aria-hidden="true" />
                        ) : (
                          <Circle className="w-3 h-3" aria-hidden="true" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center flex-wrap gap-2 text-xs text-[#6A6760]">
                          <span className="font-mono-tabular text-[#1C1C1A] font-medium">
                            {task.startTime}–{task.endTime}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{task.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {task.durationMinutes} {dict.common.minutes}
                          </span>
                        </div>
                        <p
                          className={`text-sm font-medium ${
                            task.completed ? 'line-through text-[#6A6760]' : 'text-[#1C1C1A]'
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-xs text-[#6A6760]">{task.simplificationNote}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right 4 Columns: High-Contrast Obsidian Quick AI Action Card + Studio Entries */}
          <div className="lg:col-span-4 space-y-6">
            <div className="obsidian-surface rounded-3xl p-6 sm:p-7 space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs text-[#C7B9A5] tracking-wide">{dict.nav.assistant}</p>
                <h2 className="font-editorial text-3xl font-medium tracking-tight text-white">
                  {dict.dashboard.quickCaptureTitle}
                </h2>
              </div>

              <form onSubmit={handleQuickCapture} className="space-y-4">
                <label htmlFor="quick-task-input" className="sr-only">
                  {dict.dashboard.quickCaptureTitle}
                </label>
                <textarea
                  id="quick-task-input"
                  rows={4}
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder={dict.dashboard.quickCapturePlaceholder}
                  className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-white/40 resize-none"
                />
                {quickError && (
                  <p role="alert" className="text-xs text-[#F3C6B8]">
                    {quickError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#1C1C1A] px-5 py-3 text-sm font-medium hover:bg-[#EAE5DC] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>{dict.assistant.sequencing}</span>
                    </>
                  ) : (
                    <>
                      <span>{dict.dashboard.quickCaptureAction}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Direct Studio Portals */}
            <div className="glass-surface rounded-3xl p-6 divide-y divide-[#1C1C1A]/8">
              <Link
                href="/rhetoric"
                className="py-4 first:pt-0 flex items-center justify-between gap-4 group"
              >
                <div className="space-y-0.5">
                  <p className="text-xs text-[#6E573E]">TEDx · Trial Advocacy · Senate</p>
                  <p className="font-editorial text-2xl font-medium text-[#1C1C1A] group-hover:text-[#6E573E] transition-colors">
                    {dict.rhetoric.title}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full border border-[#1C1C1A]/12 flex items-center justify-center group-hover:bg-[#1C1C1A] group-hover:text-white transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>

              <Link
                href="/certifications"
                className="py-4 last:pb-0 flex items-center justify-between gap-4 group"
              >
                <div className="space-y-0.5">
                  <p className="text-xs text-[#6E573E]">IELTS · SAT · LSAT · SQE · Bar</p>
                  <p className="font-editorial text-2xl font-medium text-[#1C1C1A] group-hover:text-[#6E573E] transition-colors">
                    {dict.certifications.title}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full border border-[#1C1C1A]/12 flex items-center justify-center group-hover:bg-[#1C1C1A] group-hover:text-white transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
