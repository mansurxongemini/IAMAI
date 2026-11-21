'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Loader2, X } from 'lucide-react';
import type { Roadmap, RoadmapNode, RoadmapStep } from '@core/schemas';
import { useWorkspace } from './WorkspaceProvider';

interface NodeTutorDrawerProps {
  roadmap: Roadmap;
  node: RoadmapNode | null;
  activeStep: RoadmapStep | null;
  onClose: () => void;
}

export function NodeTutorDrawer({
  roadmap,
  node,
  activeStep,
  onClose,
}: NodeTutorDrawerProps) {
  const { dict, locale, nodeThreads, askNodeTutor } = useWorkspace();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const threadKey = node ? `${roadmap.id}:${node.id}` : '';
  const messages = node ? (nodeThreads[threadKey] ?? []) : [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, loading]);

  if (!node) return null;

  async function submitQuestion(text: string) {
    if (!node) return;
    const trimmed = text.trim();
    if (trimmed.length < 2) return;
    setError(null);
    setQuestion('');
    setLoading(true);
    try {
      await askNodeTutor({
        roadmap,
        nodeId: node.id,
        nodeTitle: node.title[locale],
        stepTitle: activeStep?.title[locale],
        framework: activeStep?.framework ?? node.keyFramework,
        question: trimmed,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reach AI Tutor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1C1A]/25 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={dict.roadmap.tutorTitle}
    >
      <div className="w-full max-w-lg h-full bg-[#F4F1EC] border-l border-[#1C1C1A]/10 flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#1C1C1A]/10 flex items-start justify-between gap-4 bg-white/70">
          <div className="space-y-1 min-w-0">
            <p className="text-xs text-[#6E573E]">{dict.roadmap.tutorTitle}</p>
            <h2 className="font-editorial text-2xl font-medium text-[#1C1C1A] leading-tight">
              {node.title[locale]}
            </h2>
            {activeStep && (
              <p className="text-xs text-[#6A6760] truncate">
                {activeStep.title[locale]} · {activeStep.framework}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.common.close}
            className="w-9 h-9 rounded-full border border-[#1C1C1A]/12 flex items-center justify-center text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-4 pt-4">
              <p className="text-sm text-[#6A6760] leading-relaxed">{dict.roadmap.tutorEmpty}</p>
              <div className="space-y-2">
                {[dict.roadmap.tutorPrompt1, dict.roadmap.tutorPrompt2].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void submitQuestion(suggestion)}
                    className="w-full text-left glass-surface rounded-2xl px-4 py-3 text-xs font-medium text-[#1C1C1A] hover:bg-white transition-colors cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#1C1C1A] text-white'
                      : 'glass-surface text-[#1C1C1A]'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.cached && (
                  <span className="mt-1 text-[11px] text-[#6E573E]">
                    {dict.roadmap.cachedNote}
                  </span>
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#6A6760]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              <span>IAM AI...</span>
            </div>
          )}

          {error && (
            <p role="alert" className="text-xs text-[#9E2A2B] bg-[#9E2A2B]/8 rounded-2xl p-3">
              {error}
            </p>
          )}
        </div>

        {/* Input Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submitQuestion(question);
          }}
          className="p-4 border-t border-[#1C1C1A]/10 bg-white/75"
        >
          <div className="flex items-center gap-2">
            <label htmlFor="node-tutor-input" className="sr-only">
              {dict.roadmap.tutorPlaceholder}
            </label>
            <input
              id="node-tutor-input"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={dict.roadmap.tutorPlaceholder}
              disabled={loading}
              className="flex-1 rounded-full bg-[#F4F1EC] border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] placeholder:text-[#6A6760] focus:outline-none focus:border-[#1C1C1A]"
            />
            <button
              type="submit"
              disabled={loading || question.trim().length < 2}
              aria-label={dict.roadmap.tutorSend}
              className="w-10 h-10 rounded-full bg-[#1C1C1A] text-white flex items-center justify-center hover:bg-[#32322F] transition-colors disabled:opacity-45 shrink-0 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
