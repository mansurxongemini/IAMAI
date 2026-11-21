'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Archive, ArrowLeft, Check, Circle, MessageSquare } from 'lucide-react';
import { computeRoadmapProgress } from '@core/scheduler';
import type { RoadmapNode, RoadmapStep } from '@core/schemas';
import { AppShell } from '@/components/AppShell';
import { NodeTutorDrawer } from '@/components/NodeTutorDrawer';
import { useWorkspace } from '@/components/WorkspaceProvider';

export default function RoadmapWorkspacePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { dict, locale, roadmaps, toggleStep, archiveRoadmap } = useWorkspace();

  const [tutorNode, setTutorNode] = useState<RoadmapNode | null>(null);
  const [tutorStep, setTutorStep] = useState<RoadmapStep | null>(null);

  const roadmap = useMemo(
    () => roadmaps.find((rm) => rm.id === params?.id),
    [roadmaps, params?.id]
  );

  if (!roadmap) {
    return (
      <AppShell>
        <div className="glass-surface rounded-3xl p-10 text-center space-y-4">
          <h1 className="font-editorial text-3xl text-[#1C1C1A]">{dict.roadmap.notFound}</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#1C1C1A] px-5 py-2.5 text-xs font-medium text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.roadmap.backToDashboard}</span>
          </Link>
        </div>
      </AppShell>
    );
  }

  const progress = computeRoadmapProgress(roadmap);

  const priorityLabel = (priority: RoadmapNode['priority']) => {
    if (priority === 'skip') return dict.roadmap.skippedLabel;
    if (priority === 'high') return dict.roadmap.highPriority;
    if (priority === 'low') return dict.roadmap.lowPriority;
    return dict.roadmap.normalPriority;
  };

  async function handleArchive() {
    if (!roadmap) return;
    await archiveRoadmap(roadmap.id);
    router.push('/');
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Top Breadcrumb + Archive Action */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#6A6760] hover:text-[#1C1C1A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.roadmap.backToDashboard}</span>
          </Link>

          <button
            type="button"
            onClick={() => void handleArchive()}
            className="inline-flex items-center gap-1.5 text-xs text-[#6A6760] hover:text-[#1C1C1A] transition-colors cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.roadmap.deleteRoadmap}</span>
          </button>
        </div>

        {/* Roadmap Editorial Header + Strategy Brief */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 glass-surface rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center flex-wrap gap-2 text-xs text-[#6E573E]">
                <span>{roadmap.currentLevel}</span>
                <span aria-hidden="true">→</span>
                <span className="font-medium text-[#1C1C1A]">{roadmap.targetGoal}</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#1C1C1A]">
                {roadmap.title[locale]}
              </h1>
              <p className="text-sm text-[#6A6760] leading-relaxed max-w-2xl">
                {roadmap.strategySummary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1C1C1A]/8 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#6A6760]">
                <span>{dict.roadmap.overallProgress}</span>
                <span className="font-mono-tabular text-[#1C1C1A] font-medium">
                  {progress.completedSteps}/{progress.totalSteps} ({progress.percentComplete}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#1C1C1A]/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1C1C1A] transition-all duration-200"
                  style={{ width: `${progress.percentComplete}%` }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 obsidian-surface rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-[#C7B9A5]">{dict.roadmap.dailySlot}</p>
                <p className="text-sm font-medium text-white leading-relaxed">
                  {roadmap.dailySlotRecommendation}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/12">
              <div>
                <p className="text-xs text-white/60">{dict.roadmap.deadline}</p>
                <p className="font-mono-tabular text-lg font-medium text-white mt-0.5">
                  {roadmap.deadlineDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60">{dict.roadmap.allocatedHours}</p>
                <p className="font-mono-tabular text-lg font-medium text-white mt-0.5">
                  {roadmap.totalAllocatedHours} {dict.common.hours}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase Timeline */}
        <section className="space-y-6">
          {roadmap.phases.map((phase) => (
            <div key={phase.id} className="glass-surface rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#1C1C1A]/8">
                <div className="space-y-1">
                  <p className="font-mono-tabular text-xs text-[#6E573E]">
                    {phase.startDate} — {phase.endDate}
                  </p>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1C1C1A]">
                    {phase.title[locale]}
                  </h2>
                  <p className="text-sm text-[#6A6760]">{phase.objective[locale]}</p>
                </div>
              </div>

              <div className="divide-y divide-[#1C1C1A]/8">
                {phase.modules.map((mod) => {
                  const isSkipped = mod.priority === 'skip';
                  return (
                    <div
                      key={mod.id}
                      className={`py-6 first:pt-1 last:pb-1 space-y-4 ${
                        isSkipped ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center flex-wrap gap-2 text-xs text-[#6A6760]">
                            <span className="font-mono-tabular text-[#1C1C1A] font-medium">
                              {mod.weekRange}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#6E573E]">{priorityLabel(mod.priority)}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">
                              {mod.allocatedHours} {dict.common.hours}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{mod.keyFramework}</span>
                          </div>
                          <h3 className="font-editorial text-2xl font-medium text-[#1C1C1A]">
                            {mod.title[locale]}
                          </h3>
                          <p className="text-sm text-[#6A6760]">
                            {mod.customFocus || mod.summary[locale]}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setTutorNode(mod);
                            setTutorStep(null);
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-[#1C1C1A]/15 px-4 py-2 text-xs font-medium text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white transition-colors whitespace-nowrap shrink-0 self-start cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{dict.roadmap.askTutor}</span>
                        </button>
                      </div>

                      {/* Checkable Steps */}
                      {!isSkipped && (
                        <ul className="space-y-2.5 pl-0 sm:pl-2">
                          {mod.steps.map((step) => (
                            <li
                              key={step.id}
                              className="flex items-start justify-between gap-4 py-2.5 px-3 rounded-2xl hover:bg-white/60 transition-colors"
                            >
                              <div className="flex items-start gap-3.5 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => void toggleStep(roadmap.id, mod.id, step.id)}
                                  aria-label={`Toggle milestone "${step.title[locale]}"`}
                                  className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border transition-colors shrink-0 cursor-pointer ${
                                    step.completed
                                      ? 'bg-[#1C1C1A] border-[#1C1C1A] text-white'
                                      : 'border-[#1C1C1A]/30 text-transparent hover:border-[#1C1C1A]'
                                  }`}
                                >
                                  {step.completed ? (
                                    <Check className="w-3 h-3" aria-hidden="true" />
                                  ) : (
                                    <Circle className="w-3 h-3" aria-hidden="true" />
                                  )}
                                </button>

                                <div className="space-y-0.5 min-w-0">
                                  <p
                                    className={`text-sm font-medium ${
                                      step.completed
                                        ? 'line-through text-[#6A6760]'
                                        : 'text-[#1C1C1A]'
                                    }`}
                                  >
                                    {step.title[locale]}
                                  </p>
                                  <p className="text-xs text-[#6A6760] leading-relaxed">
                                    {step.drill[locale]}
                                  </p>
                                  <p className="text-[11px] text-[#6E573E] font-mono-tabular pt-0.5">
                                    {step.framework} · {step.estimatedMinutes} {dict.common.minutes}
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setTutorNode(mod);
                                  setTutorStep(step);
                                }}
                                aria-label={`${dict.roadmap.askTutor}: ${step.title[locale]}`}
                                className="text-xs text-[#6A6760] hover:text-[#1C1C1A] whitespace-nowrap shrink-0 py-1 px-2 cursor-pointer"
                              >
                                {dict.roadmap.tutorSend} →
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>

      <NodeTutorDrawer
        roadmap={roadmap}
        node={tutorNode}
        activeStep={tutorStep}
        onClose={() => {
          setTutorNode(null);
          setTutorStep(null);
        }}
      />
    </AppShell>
  );
}
