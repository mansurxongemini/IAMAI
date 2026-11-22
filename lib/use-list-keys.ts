'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Linear-style list keys inside a container: J/K or ↓/↑ move between rows ([data-row]),
 * X or Enter toggles the focused row ([data-toggle] inside it), O opens it ([data-open]).
 */
export function useListKeys(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = ref.current;
      if (!el) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const rows = [...el.querySelectorAll<HTMLElement>('[data-row]')];
      if (!rows.length) return;
      const cur = rows.findIndex((r) => r === document.activeElement || r.contains(document.activeElement));
      const k = e.key.toLowerCase();
      if (k === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        rows[Math.min(rows.length - 1, cur + 1)]?.focus();
      } else if (k === 'k' || e.key === 'ArrowUp') {
        if (cur === -1) return;
        e.preventDefault();
        rows[Math.max(0, cur - 1)]?.focus();
      } else if ((k === 'x' || e.key === 'Enter') && cur !== -1 && rows[cur] === document.activeElement) {
        e.preventDefault();
        rows[cur]?.querySelector<HTMLElement>('[data-toggle]')?.click();
      } else if (k === 'o' && cur !== -1) {
        e.preventDefault();
        rows[cur]?.querySelector<HTMLElement>('[data-open]')?.click();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ref]);
}
