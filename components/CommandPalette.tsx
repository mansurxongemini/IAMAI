'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, BookOpen, Compass, CornerDownLeft, Languages, ListChecks, LogIn, LogOut, Map, Mic, Search, Settings, Sun,
  type LucideIcon,
} from 'lucide-react';
import { useWorkspace } from './WorkspaceProvider';
import { getDictionary } from '@core/i18n';

interface Command {
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
  keywords?: string;
  run: () => void;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { dict, locale, setLocale, roadmaps, user, signIn, signOut } = useWorkspace();
  const d = getDictionary(locale);
  const c = d.palette;
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const go = useCallback((href: string) => () => router.push(href), [router]);

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = [
      { id: 'nav-today', label: d.shell.today, group: c.go, icon: Sun, keywords: 'today bugun', run: go('/today') },
      { id: 'nav-goals', label: d.shell.goals, group: c.go, icon: Compass, keywords: 'ielts sat toefl lsat sqe bar toles tedx', run: go('/goals') },
      { id: 'nav-asst', label: dict.nav.assistant, group: c.go, icon: ListChecks, keywords: 'tasks vazifa', run: go('/assistant') },
      { id: 'nav-set', label: dict.nav.settings, group: c.go, icon: Settings, run: go('/settings') },
    ];
    for (const rm of roadmaps.filter((r) => r.status !== 'archived')) {
      list.push({ id: `rm-${rm.id}`, label: rm.title[locale], group: c.plans, icon: Map, keywords: rm.targetGoal, run: go(`/plan/${rm.id}`) });
    }
    list.push(
      { id: 'act-cert', label: c.newPlan, group: c.actions, icon: BookOpen, run: go('/goals?c=academic') },
      { id: 'act-talk', label: c.newTalk, group: c.actions, icon: Mic, run: go('/goals?c=rhetoric') },
      { id: 'act-lang', label: c.lang, group: c.actions, icon: Languages, keywords: 'language til en uz', run: () => setLocale(locale === 'en' ? 'uz' : 'en') },
      user
        ? { id: 'act-out', label: dict.nav.signOut, group: c.actions, icon: LogOut, run: () => void signOut() }
        : { id: 'act-in', label: dict.nav.signIn, group: c.actions, icon: LogIn, run: () => void signIn() },
    );
    return list;
  }, [dict, c, go, roadmaps, locale, setLocale, user, signIn, signOut]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((cmd) => `${cmd.label} ${cmd.keywords ?? ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const run = (cmd: Command | undefined) => {
    if (!cmd) return;
    onClose();
    cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(filtered[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let lastGroup = '';
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]" role="dialog" aria-modal="true" aria-label={d.a11y.commandPalette}>
      <button type="button" aria-label={d.a11y.close} onClick={onClose} className="absolute inset-0 bg-ink/20 backdrop-blur-[2px] animate-fade-in cursor-default" />
      <div className="relative w-full max-w-xl rounded-3xl bg-surface border border-ink/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] overflow-hidden animate-scale-in" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 px-5 h-14 border-b border-ink/10">
          <Search className="w-4 h-4 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.placeholder}
            className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-muted/70"
            aria-label={c.placeholder}
          />
          <kbd>Esc</kbd>
        </div>
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && <p className="px-4 py-8 text-center text-sm text-muted">{c.empty}</p>}
          {filtered.map((cmd, idx) => {
            const header = cmd.group !== lastGroup ? cmd.group : null;
            lastGroup = cmd.group;
            const Icon = cmd.icon;
            const isActive = idx === active;
            return (
              <React.Fragment key={cmd.id}>
                {header && <p className="px-3 pt-3 pb-1.5 text-[11px] label-mono text-muted/80">{header}</p>}
                <button
                  type="button"
                  data-idx={idx}
                  onMouseMove={() => setActive(idx)}
                  onClick={() => run(cmd)}
                  className={`w-full flex items-center gap-3 px-3 h-11 rounded-2xl text-left text-sm transition-colors cursor-pointer ${
                    isActive ? 'bg-accent text-on-accent' : 'text-ink'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white/80' : 'text-muted'}`} aria-hidden="true" />
                  <span className="flex-1 truncate">{cmd.label}</span>
                  {isActive ? <CornerDownLeft className="w-3.5 h-3.5 text-white/70" aria-hidden="true" /> : <ArrowRight className="w-3.5 h-3.5 text-transparent" aria-hidden="true" />}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
