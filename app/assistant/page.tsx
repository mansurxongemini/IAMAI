'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, Check, Circle, Loader2, Trash2 } from 'lucide-react';
import { formatIsoDate } from '@core/scheduler';
import type { MentorRole } from '@core/schemas';
import { AppShell } from '@/components/AppShell';
import { useWorkspace } from '@/components/WorkspaceProvider';

type AssistantTab = 'planner' | 'mentor';

export default function AssistantPage() {
  const {
    dict,
    locale,
    profile,
    user,
    tasks,
    dayBrief,
    setDayBrief,
    addTasks,
    toggleTask,
    clearCompletedTasks,
    mentorMessages,
    sendMentorMessage,
  } = useWorkspace();

  const [tab, setTab] = useState<AssistantTab>('planner');
  const [rawInput, setRawInput] = useState('');
  const [sequencing, setSequencing] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);

  // Multi-turn Executive Mentor state
  const [mentorRole, setMentorRole] = useState<MentorRole>('executive');
  const [mentorInput, setMentorInput] = useState('');
  const [mentorLoading, setMentorLoading] = useState(false);
  const [mentorError, setMentorError] = useState<string | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const activeThread = mentorMessages[mentorRole] ?? [];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeThread.length, mentorLoading, tab]);

  async function handleSequence(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = rawInput.trim();
    if (trimmed.length < 4) {
      setPlanError(
        locale === 'uz'
          ? 'Kamida bitta vazifa yoki majburiyat kiriting.'
          : 'Please enter at least one task or obligation to sequence.'
      );
      return;
    }

    setPlanError(null);
    setSequencing(true);
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
        throw new Error(data.error || 'Failed to sequence tasks.');
      }
      if (data.dayBrief) setDayBrief(data.dayBrief);
      if (Array.isArray(data.tasks) && data.tasks.length > 0) {
        await addTasks(data.tasks);
      }
      setRawInput('');
    } catch (err) {
      setPlanError(err instanceof Error ? err.message : 'Unable to decompose tasks.');
    } finally {
      setSequencing(false);
    }
  }

  async function handleMentorSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = mentorInput.trim();
    if (!trimmed) return;
    setMentorError(null);
    setMentorInput('');
    setMentorLoading(true);
    try {
      await sendMentorMessage(mentorRole, trimmed);
    } catch (err) {
      setMentorError(err instanceof Error ? err.message : 'Mentor request failed.');
    } finally {
      setMentorLoading(false);
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <AppShell>
      <div className="space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs text-[#6E573E]">
              {profile.preferredStartTime}–{profile.preferredEndTime}
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#1C1C1A]">
              {dict.assistant.title}
            </h1>
            <p className="text-sm text-[#6A6760] max-w-2xl">{dict.assistant.subtitle}</p>
          </div>

          <div
            role="tablist"
            aria-label="Assistant mode"
            className="glass-surface rounded-full p-1 inline-flex items-center gap-1 self-start sm:self-end shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'planner'}
              onClick={() => setTab('planner')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                tab === 'planner'
                  ? 'bg-[#1C1C1A] text-white'
                  : 'text-[#6A6760] hover:text-[#1C1C1A]'
              }`}
            >
              {dict.assistant.tabPlanner}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'mentor'}
              onClick={() => setTab('mentor')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                tab === 'mentor'
                  ? 'bg-[#1C1C1A] text-white'
                  : 'text-[#6A6760] hover:text-[#1C1C1A]'
              }`}
            >
              {dict.assistant.tabMentor}
            </button>
          </div>
        </header>

        {tab === 'planner' ? (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Task Intake (5 cols) */}
            <div className="lg:col-span-5 obsidian-surface rounded-3xl p-6 sm:p-7 space-y-5 sticky top-24">
              <div className="space-y-1">
                <p className="text-xs text-[#C7B9A5]">
                  {formatIsoDate(new Date())} · {profile.preferredStartTime}–
                  {profile.preferredEndTime}
                </p>
                <h2 className="font-editorial text-3xl font-medium text-white">
                  {dict.assistant.inputLabel}
                </h2>
              </div>

              <form onSubmit={handleSequence} className="space-y-4">
                <label htmlFor="assistant-obligations" className="sr-only">
                  {dict.assistant.inputLabel}
                </label>
                <textarea
                  id="assistant-obligations"
                  rows={6}
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  placeholder={dict.assistant.inputPlaceholder}
                  className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-white/40 resize-none"
                />

                {planError && (
                  <p role="alert" className="text-xs text-[#F3C6B8]">
                    {planError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sequencing}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#1C1C1A] px-5 py-3.5 text-sm font-medium hover:bg-[#EAE5DC] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {sequencing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>{dict.assistant.sequencing}</span>
                    </>
                  ) : (
                    <>
                      <span>{dict.assistant.sequenceAction}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Structured Time-Blocked Execution Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {dayBrief && (
                <div className="glass-surface rounded-3xl p-5 space-y-1">
                  <p className="text-xs text-[#6E573E]">{dict.assistant.dayBrief}</p>
                  <p className="text-sm text-[#1C1C1A] leading-relaxed">{dayBrief}</p>
                </div>
              )}

              <div className="glass-surface rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1C1C1A]">
                    {dict.dashboard.todaySchedule}
                  </h2>
                  {completedCount > 0 && (
                    <button
                      type="button"
                      onClick={() => void clearCompletedTasks()}
                      className="inline-flex items-center gap-1.5 text-xs text-[#6A6760] hover:text-[#1C1C1A] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{dict.assistant.clearCompleted}</span>
                    </button>
                  )}
                </div>

                {tasks.length === 0 ? (
                  <p className="text-sm text-[#6A6760] py-8">{dict.dashboard.noTasks}</p>
                ) : (
                  <div className="divide-y divide-[#1C1C1A]/8">
                    {tasks.map((task) => (
                      <article key={task.id} className="py-5 first:pt-1 last:pb-1 space-y-3">
                        <div className="flex items-start gap-4">
                          <button
                            type="button"
                            onClick={() => void toggleTask(task.id)}
                            aria-label={`Toggle task "${task.title}"`}
                            className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border transition-colors shrink-0 cursor-pointer ${
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

                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center flex-wrap gap-2 text-xs text-[#6A6760]">
                              <span className="font-mono-tabular text-[#1C1C1A] font-medium">
                                {task.startTime}–{task.endTime}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono-tabular">
                                {task.durationMinutes} {dict.common.minutes}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#6E573E]">{task.category}</span>
                            </div>

                            <h3
                              className={`font-editorial text-2xl font-medium ${
                                task.completed ? 'line-through text-[#6A6760]' : 'text-[#1C1C1A]'
                              }`}
                            >
                              {task.title}
                            </h3>

                            <div className="pt-1 space-y-2">
                              <p className="text-xs font-medium text-[#1C1C1A]">
                                {dict.assistant.executionSteps}
                              </p>
                              <ol className="space-y-1 text-xs text-[#6A6760] list-decimal list-inside">
                                {task.executionSteps.map((step, idx) => (
                                  <li key={`${task.id}-s-${idx}`} className="leading-relaxed">
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </div>

                            <p className="pt-1 text-xs text-[#6E573E]">
                              <span className="font-medium">{dict.assistant.simplification}:</span>{' '}
                              {task.simplificationNote}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          /* Multi-Turn Executive Mentor Chat Tab */
          <section className="glass-surface rounded-3xl overflow-hidden flex flex-col min-h-[580px]">
            {/* Role Selector Bar */}
            <div className="px-6 py-4 border-b border-[#1C1C1A]/8 flex flex-wrap items-center justify-between gap-3 bg-white/50">
              <span className="text-xs text-[#6A6760]">{dict.assistant.mentorRoleLabel}</span>
              <div role="group" aria-label="Mentor role" className="flex flex-wrap gap-1.5">
                {(['executive', 'rhetoric', 'legal', 'exam'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMentorRole(r)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      mentorRole === r
                        ? 'bg-[#1C1C1A] text-white'
                        : 'text-[#6A6760] hover:text-[#1C1C1A] hover:bg-white/70'
                    }`}
                  >
                    {dict.assistant.roles[r]}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Conversation Thread */}
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto px-6 py-6 space-y-4 max-h-[460px]"
            >
              {activeThread.length === 0 ? (
                <div className="py-10 text-center space-y-5 max-w-lg mx-auto">
                  <div className="space-y-2">
                    <p className="font-editorial text-3xl text-[#1C1C1A]">
                      {dict.assistant.roles[mentorRole]}
                    </p>
                    <p className="text-sm text-[#6A6760]">{dict.assistant.mentorEmpty}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                    {(
                      {
                        executive:
                          locale === 'uz'
                            ? [
                                'Bugungi 3 ta eng muhim strategik ustuvorligimni qanday ajratay?',
                                '5 daqiqalik rahbariyat brifingi tuzilmasini bering.',
                              ]
                            : [
                                'How should I sequence 3 competing executive deadlines today?',
                                'Give me a crisp 5-minute board briefing structure.',
                              ],
                        rhetoric:
                          locale === 'uz'
                            ? [
                                'TEDx nutqim uchun ilk 30 soniyalik kuchli ilgak tuzib bering.',
                                'Qarshi soʻroqda chalgʻituvchi guvohni qanday toʻxtataman?',
                              ]
                            : [
                                'How do I stop a hostile witness from giving long speeches?',
                                'Help me craft a zero-preamble 30-second TEDx opening hook.',
                              ],
                        legal:
                          locale === 'uz'
                            ? [
                                'Bar Exam MEE uchun 30 daqiqalik IRAC qolipini tushuntiring.',
                                'TOLES shartnomasida indemnity va warranty farqi nimada?',
                              ]
                            : [
                                'Contrast warranty, representation, and indemnity for TOLES.',
                                'How do I pace a 90-minute MPT closed-universe brief?',
                              ],
                        exam:
                          locale === 'uz'
                            ? [
                                'IELTS Writing Task 2 da Band 6.5 dan 7.5 ga chiqish kaliti nima?',
                                'Digital SAT 2-modulda vaqtni qanday boshqaray?',
                              ]
                            : [
                                'What separates Band 6.5 from Band 7.5+ in IELTS Task 2?',
                                'Give me a 2-pass timing system for hard Digital SAT Module 2.',
                              ],
                      }[mentorRole]
                    ).map((starter) => (
                      <button
                        key={starter}
                        type="button"
                        onClick={() => {
                          setMentorInput(starter);
                        }}
                        className="rounded-2xl bg-white/80 border border-[#1C1C1A]/10 px-4 py-3 text-xs font-medium text-[#1C1C1A] hover:bg-white transition-colors cursor-pointer"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                activeThread.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-[#1C1C1A] text-white'
                          : 'bg-white/85 border border-[#1C1C1A]/8 text-[#1C1C1A]'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}

              {mentorLoading && (
                <div className="flex items-center gap-2 text-xs text-[#6A6760]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                  <span>IAM AI...</span>
                </div>
              )}

              {mentorError && (
                <p role="alert" className="text-xs text-[#9E2A2B] bg-[#9E2A2B]/8 rounded-2xl p-3">
                  {mentorError}
                </p>
              )}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleMentorSend}
              className="p-4 border-t border-[#1C1C1A]/8 bg-white/65 flex items-center gap-3"
            >
              <label htmlFor="mentor-chat-input" className="sr-only">
                {dict.assistant.mentorPlaceholder}
              </label>
              <input
                id="mentor-chat-input"
                type="text"
                value={mentorInput}
                onChange={(e) => setMentorInput(e.target.value)}
                placeholder={dict.assistant.mentorPlaceholder}
                disabled={mentorLoading}
                className="flex-1 rounded-full bg-[#F4F1EC] border border-[#1C1C1A]/12 px-5 py-3 text-sm text-[#1C1C1A] placeholder:text-[#6A6760] focus:outline-none focus:border-[#1C1C1A]"
              />
              <button
                type="submit"
                disabled={mentorLoading || !mentorInput.trim()}
                aria-label={dict.assistant.mentorSend}
                className="inline-flex items-center gap-2 rounded-full bg-[#1C1C1A] text-white px-5 py-3 text-sm font-medium hover:bg-[#32322F] transition-colors disabled:opacity-45 shrink-0 cursor-pointer"
              >
                <span>{dict.assistant.mentorSend}</span>
                <ArrowUp className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </section>
        )}
      </div>
    </AppShell>
  );
}
