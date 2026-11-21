'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { ACADEMIC_BLUEPRINTS, LEGAL_BLUEPRINTS } from '@core/blueprints';
import { AppShell } from '@/components/AppShell';
import { useWorkspace } from '@/components/WorkspaceProvider';

type FilterTrack = 'all' | 'academic' | 'legal';

const CERT_BLUEPRINTS = [...ACADEMIC_BLUEPRINTS, ...LEGAL_BLUEPRINTS];

export default function CertificationsPage() {
  const router = useRouter();
  const { dict, locale, profile, user, addRoadmap } = useWorkspace();

  const [filter, setFilter] = useState<FilterTrack>('all');
  const [selectedId, setSelectedId] = useState(CERT_BLUEPRINTS[0].id);
  const [currentLevel, setCurrentLevel] = useState('');
  const [targetGoal, setTargetGoal] = useState('');
  const [deadlineDays, setDeadlineDays] = useState(60);
  const [dailyHours, setDailyHours] = useState(profile.dailyHours || 2.5);
  const [weakAreas, setWeakAreas] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visibleBlueprints = useMemo(() => {
    if (filter === 'all') return CERT_BLUEPRINTS;
    return CERT_BLUEPRINTS.filter((bp) => bp.category === filter);
  }, [filter]);

  const selectedBlueprint =
    CERT_BLUEPRINTS.find((bp) => bp.id === selectedId) ?? visibleBlueprints[0];

  async function handleAdapt(e: React.FormEvent) {
    e.preventDefault();
    if (currentLevel.trim().length < 2 || targetGoal.trim().length < 2) {
      setError(
        locale === 'uz'
          ? 'Hozirgi ball va maqsad natijasini kiriting.'
          : 'Please enter both your current baseline and target score.'
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
        throw new Error(data.error || 'Failed to adapt certification plan.');
      }
      await addRoadmap(data.roadmap);
      router.push(`/roadmap/${data.roadmap.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to adapt syllabus.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs text-[#6E573E]">
              IELTS · SAT · TOEFL · LSAT · SQE · Bar (UBE) · TOLES
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#1C1C1A]">
              {dict.certifications.title}
            </h1>
            <p className="text-sm text-[#6A6760] max-w-2xl">{dict.certifications.subtitle}</p>
          </div>

          {/* Interactive Track Filter */}
          <div
            role="group"
            aria-label="Certification category filter"
            className="glass-surface rounded-full p-1 inline-flex items-center gap-1 self-start sm:self-end shrink-0"
          >
            {(
              [
                { id: 'all', label: dict.certifications.filterAll },
                { id: 'academic', label: dict.certifications.filterAcademic },
                { id: 'legal', label: dict.certifications.filterLegal },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setFilter(tab.id);
                  const nextList =
                    tab.id === 'all'
                      ? CERT_BLUEPRINTS
                      : CERT_BLUEPRINTS.filter((b) => b.category === tab.id);
                  if (nextList.length > 0 && !nextList.some((b) => b.id === selectedId)) {
                    setSelectedId(nextList[0].id);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#1C1C1A] text-white'
                    : 'text-[#6A6760] hover:text-[#1C1C1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Catalog Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleBlueprints.map((bp) => {
              const selected = bp.id === selectedBlueprint.id;
              const categoryText =
                bp.category === 'legal'
                  ? dict.certifications.legalLabel
                  : dict.certifications.academicLabel;

              return (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => setSelectedId(bp.id)}
                  aria-pressed={selected}
                  className={`text-left rounded-3xl p-5 flex flex-col justify-between gap-4 transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#1C1C1A] text-white'
                      : 'glass-surface text-[#1C1C1A] hover:bg-white/90'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs ${
                          selected ? 'text-[#C7B9A5]' : 'text-[#6E573E]'
                        }`}
                      >
                        {categoryText} · {bp.code}
                      </span>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${
                          selected
                            ? 'bg-white text-[#1C1C1A] border-white'
                            : 'border-[#1C1C1A]/15 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>

                    <h2 className="font-editorial text-2xl font-medium leading-snug">
                      {bp.title[locale]}
                    </h2>
                    <p
                      className={`text-xs leading-relaxed ${
                        selected ? 'text-white/75' : 'text-[#6A6760]'
                      }`}
                    >
                      {bp.subtitle[locale]}
                    </p>
                  </div>

                  <div
                    className={`pt-3 border-t text-xs font-mono-tabular flex items-center justify-between ${
                      selected
                        ? 'border-white/15 text-white/70'
                        : 'border-[#1C1C1A]/8 text-[#6A6760]'
                    }`}
                  >
                    <span>
                      {bp.phases.length} {dict.rhetoric.phasesCount}
                    </span>
                    <span>
                      {bp.baselineTotalHours} {dict.common.hours}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Calibration Form (5 cols) */}
          <div className="lg:col-span-5 glass-surface rounded-3xl p-6 sm:p-7 space-y-6 sticky top-24">
            <div className="space-y-1">
              <p className="text-xs text-[#6E573E]">
                {dict.certifications.selectedBlueprint} · {selectedBlueprint.code}
              </p>
              <h2 className="font-editorial text-3xl font-medium text-[#1C1C1A]">
                {selectedBlueprint.title[locale]}
              </h2>
            </div>

            <form onSubmit={handleAdapt} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="cert-current-score"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.certifications.currentScoreLabel}
                </label>
                <input
                  id="cert-current-score"
                  type="text"
                  required
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  placeholder={dict.certifications.currentScorePlaceholder}
                  className="w-full rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] placeholder:text-[#6A6760]/70 focus:outline-none focus:border-[#1C1C1A]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="cert-target-score"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.certifications.targetScoreLabel}
                </label>
                <input
                  id="cert-target-score"
                  type="text"
                  required
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  placeholder={dict.certifications.targetScorePlaceholder}
                  className="w-full rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] placeholder:text-[#6A6760]/70 focus:outline-none focus:border-[#1C1C1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="cert-deadline"
                    className="block text-xs font-medium text-[#1C1C1A]"
                  >
                    {dict.certifications.deadlineLabel}
                  </label>
                  <input
                    id="cert-deadline"
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
                    htmlFor="cert-hours"
                    className="block text-xs font-medium text-[#1C1C1A]"
                  >
                    {dict.certifications.dailyHoursLabel}
                  </label>
                  <input
                    id="cert-hours"
                    type="number"
                    step={0.5}
                    min={0.5}
                    max={12}
                    value={dailyHours}
                    onChange={(e) => setDailyHours(Number(e.target.value))}
                    className="w-full font-mono-tabular rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="cert-weak-areas"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.certifications.weakAreasLabel}
                </label>
                <textarea
                  id="cert-weak-areas"
                  rows={3}
                  value={weakAreas}
                  onChange={(e) => setWeakAreas(e.target.value)}
                  placeholder={dict.certifications.weakAreasPlaceholder}
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
                    <span>{dict.certifications.generating}</span>
                  </>
                ) : (
                  <>
                    <span>{dict.certifications.generateAction}</span>
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
