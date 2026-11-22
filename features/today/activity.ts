'use client';

import { useEffect, useState } from 'react';

/**
 * Local activity log: which roadmap steps / tasks were completed on which day.
 * Powers the streak, the 7-day strip, and a stable "today" list (steps finished
 * today stay visible, checked, instead of vanishing).
 */
const KEY = 'iam_ai_activity_v1';
const EVENT = 'iam-activity';

export type ActivityLog = Record<string, string[]>; // yyyy-mm-dd -> completed item ids

export const localDay = (d = new Date()): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function read(): ActivityLog {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? (parsed as ActivityLog) : {};
  } catch {
    return {};
  }
}

function write(log: ActivityLog) {
  try {
    const days = Object.keys(log).sort().slice(-400);
    const trimmed: ActivityLog = {};
    for (const d of days) trimmed[d] = log[d] ?? [];
    window.localStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {
    /* storage unavailable */
  }
  // Deferred: callers may run inside a React state updater; never set state mid-render.
  setTimeout(() => window.dispatchEvent(new Event(EVENT)), 0);
}

export function recordCompletion(itemId: string, done: boolean) {
  if (typeof window === 'undefined') return;
  const log = read();
  const today = localDay();
  const set = new Set(log[today] ?? []);
  if (done) set.add(itemId);
  else set.delete(itemId);
  if (set.size) log[today] = [...set];
  else delete log[today];
  write(log);
}

export function computeStreak(log: ActivityLog, now = new Date()): number {
  let streak = 0;
  const d = new Date(now);
  // Today not done yet doesn't break the streak.
  if (!log[localDay(d)]?.length) d.setDate(d.getDate() - 1);
  while (log[localDay(d)]?.length) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function useActivity() {
  const [log, setLog] = useState<ActivityLog>({});
  useEffect(() => {
    const sync = () => setLog(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  const today = localDay();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = localDay(d);
    return { key, date: d, count: log[key]?.length ?? 0 };
  });
  return { log, streak: computeStreak(log), todayIds: new Set(log[today] ?? []), last7 };
}
