'use client';

import { useCallback, useEffect, useState } from 'react';

export type ThemeChoice = 'system' | 'light' | 'dark';
const KEY = 'iam_theme';

function apply(choice: ThemeChoice) {
  const dark = choice === 'dark' || (choice === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const d = document.documentElement;
  d.classList.toggle('dark', dark);
  d.style.colorScheme = dark ? 'dark' : 'light';
}

/** Theme choice (dark by default, like the landing), persisted per browser, applied without reload. */
export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>('dark');

  useEffect(() => {
    let saved: ThemeChoice = 'dark';
    try {
      const v = window.localStorage.getItem(KEY);
      if (v === 'light' || v === 'dark' || v === 'system') saved = v;
    } catch {
      /* storage unavailable */
    }
    setChoice(saved);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      let cur: string | null = null;
      try {
        cur = window.localStorage.getItem(KEY);
      } catch {
        /* storage unavailable */
      }
      if (cur === 'system') apply('system');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const set = useCallback((next: ThemeChoice) => {
    setChoice(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable */
    }
    apply(next);
  }, []);

  return { choice, set };
}
