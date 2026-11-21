'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { RHETORIC_BLUEPRINTS } from '@core/blueprints';
import { AppShell } from '@/components/AppShell';
import { useWorkspace } from '@/components/WorkspaceProvider';

export default function RhetoricStudioPage() {
  const router = useRouter();
  const { dict, locale, profile, user, addRoadmap } = useWorkspace();

  const [selectedId, setSelectedId] = useState(RHETORIC_BLUEPRINTS[0].id);
  const [currentLevel, setCurrentLevel] = useState('');
  const [targetGoal, setTargetGoal] = useState('');
  const [deadlineDays, setDeadlineDays] = useState(42);
  const [dailyHours, setDailyHours] = useState(profile.dailyHours || 1.5);
  const [weakAreas, setWeakAreas] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedBlueprint =
    RHETORIC_BLUEPRINTS.find((bp) => bp.id === selectedId) ?? RHETORIC_BLUEPRINTS[0];

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (currentLevel.trim().length < 2 || targetGoal.trim().length < 2) {
      setError(
        locale === 'uz'
          ? 'Hozirgi daraja va maqsad natijasini kiriting.'
          : 'Please specify both your current speaking baseline and target outcome.'
      );
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/roadmap/adapt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blueprintId: selectedBlueprint.id,
          locale,
          currentLevel: currentLevel.trim(),
          targetGoal: targetGoal.trim(),
          deadlineDays: Number(deadlineDays),
          dailyHours: Number(dailyHours),
          busyWindows: profile.busyWindows,
          weakAreas: weakAreas.trim() || undefined,
          ownerId: user?.uid ?? 'local-executive',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate roadmap.');
      }
      await addRoadmap(data.roadmap);
      router.push(`/roadmap/${data.roadmap.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to adapt blueprint.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <header className="space-y-1.5">
          <p className="text-xs text-[#6E573E]">TEDx · Trial Advocacy · Senate & Policy</p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#1C1C1A]">
            {dict.rhetoric.title}
          </h1>
          <p className="text-sm text-[#6A6760] max-w-2xl">{dict.rhetoric.subtitle}</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Archetype Selector Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xs font-medium text-[#6A6760]">{dict.rhetoric.selectArchetype}</h2>
            <div className="space-y-4">
              {RHETORIC_BLUEPRINTS.map((bp) => {
                const selected = bp.id === selectedBlueprint.id;
                const moduleCount = bp.phases.reduce((sum, p) => sum + p.modules.length, 0);
                return (
                  <button
                    key={bp.id}
                    type="button"
                    onClick={() => setSelectedId(bp.id)}
                    aria-pressed={selected}
                    className={`w-full text-left rounded-3xl p-6 transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#1C1C1A] text-white'
                        : 'glass-surface text-[#1C1C1A] hover:bg-white/90'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div
                          className={`flex items-center gap-2 text-xs ${
                            selected ? 'text-[#C7B9A5]' : 'text-[#6E573E]'
                          }`}
                        >
                          <span>{bp.archetypeLabel[locale]}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {bp.phases.length} {dict.rhetoric.phasesCount}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {bp.baselineTotalHours}
                            {dict.rhetoric.hoursEstimate}
                          </span>
                        </div>
                        <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight">
                          {bp.title[locale]}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${
                            selected ? 'text-white/75' : 'text-[#6A6760]'
                          }`}
                        >
                          {bp.subtitle[locale]}
                        </p>
                      </div>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                          selected
                            ? 'bg-white text-[#1C1C1A] border-white'
                            : 'border-[#1C1C1A]/15 text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>

                    <div
                      className={`mt-4 pt-4 border-t text-xs flex flex-wrap gap-x-4 gap-y-1 ${
                        selected
                          ? 'border-white/15 text-white/70'
                          : 'border-[#1C1C1A]/8 text-[#6A6760]'
                      }`}
                    >
                      {bp.phases.map((phase) => (
                        <span key={phase.id}>{phase.title[locale]}</span>
                      ))}
                      <span className="font-mono-tabular ml-auto">{moduleCount} modules</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calibration Form (5 cols) */}
          <div className="lg:col-span-5 glass-surface rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="space-y-1">
              <p className="text-xs text-[#6E573E]">{selectedBlueprint.archetypeLabel[locale]}</p>
              <h2 className="font-editorial text-3xl font-medium text-[#1C1C1A]">
                {dict.rhetoric.configureTitle}
              </h2>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="rhetoric-level"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.rhetoric.currentLevelLabel}
                </label>
                <input
                  id="rhetoric-level"
                  type="text"
                  required
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  placeholder={dict.rhetoric.currentLevelPlaceholder}
                  className="w-full rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] placeholder:text-[#6A6760]/70 focus:outline-none focus:border-[#1C1C1A]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="rhetoric-goal"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.rhetoric.targetGoalLabel}
                </label>
                <input
                  id="rhetoric-goal"
                  type="text"
                  required
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  placeholder={dict.rhetoric.targetGoalPlaceholder}
                  className="w-full rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] placeholder:text-[#6A6760]/70 focus:outline-none focus:border-[#1C1C1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="rhetoric-deadline"
                    className="block text-xs font-medium text-[#1C1C1A]"
                  >
                    {dict.rhetoric.deadlineLabel}
                  </label>
                  <input
                    id="rhetoric-deadline"
                    type="number"
                    min={7}
                    max={365}
                    value={deadlineDays}
                    onChange={(e) => setDeadlineDays(Number(e.target.value))}
                    className="w-full font-mono-tabular rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="rhetoric-hours"
                    className="block text-xs font-medium text-[#1C1C1A]"
                  >
                    {dict.rhetoric.dailyHoursLabel}
                  </label>
                  <input
                    id="rhetoric-hours"
                    type="number"
                    step={0.5}
                    min={0.5}
                    max={10}
                    value={dailyHours}
                    onChange={(e) => setDailyHours(Number(e.target.value))}
                    className="w-full font-mono-tabular rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="rhetoric-focus"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.rhetoric.focusLabel}
                </label>
                <textarea
                  id="rhetoric-focus"
                  rows={3}
                  value={weakAreas}
                  onChange={(e) => setWeakAreas(e.target.value)}
                  placeholder={dict.rhetoric.focusPlaceholder}
                  className="w-full rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] placeholder:text-[#6A6760]/70 focus:outline-none focus:border-[#1C1C1A] resize-none"
                />
              </div>

              {error && (
                <p role="alert" className="text-xs text-[#9E2A2B] bg-[#9E2A2B]/8 rounded-2xl p-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1C1C1A] text-white px-5 py-3.5 text-sm font-medium hover:bg-[#32322F] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>{dict.rhetoric.generating}</span>
                  </>
                ) : (
                  <>
                    <span>{dict.rhetoric.generateAction}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
