'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getDictionary } from '@core/i18n';
import { useWorkspace } from '@/components/WorkspaceProvider';

export interface Crumb {
  label: string;
  href?: string;
}

/** Page header bar, Linear-style: breadcrumb on the left, actions on the right. */
export function Topbar({ crumbs, actions }: { crumbs: Crumb[]; actions?: React.ReactNode }) {
  const { locale } = useWorkspace();
  return (
    <div className="sticky top-12 lg:top-0 z-30 flex items-center gap-3 h-12 px-4 sm:px-6 border-b border-ink/[0.07] bg-canvas/85 backdrop-blur-md">
      <nav aria-label={getDictionary(locale).a11y.breadcrumb} className="flex-1 min-w-0">
        <ol className="flex items-center gap-1.5 text-[13px] min-w-0">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1.5 min-w-0">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted/60 shrink-0" aria-hidden="true" />}
                {c.href && !last ? (
                  <Link href={c.href} className="text-muted hover:text-ink truncate transition-colors">{c.label}</Link>
                ) : (
                  <span aria-current={last ? 'page' : undefined} className={last ? 'text-ink font-medium truncate' : 'text-muted truncate'}>{c.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {actions && <div className="flex items-center gap-1.5 shrink-0">{actions}</div>}
    </div>
  );
}

/** Small toolbar button used in top bars. */
export function BarButton({ children, onClick, label, primary = false }: { children: React.ReactNode; onClick?: () => void; label?: string; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={
        primary
          ? 'inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-accent text-on-accent text-[13px] font-medium hover:bg-accent/90 transition-colors cursor-pointer [&_svg]:w-3.5 [&_svg]:h-3.5'
          : 'inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[13px] text-ink-2 hover:bg-ink/[0.05] hover:text-ink transition-colors cursor-pointer [&_svg]:w-3.5 [&_svg]:h-3.5'
      }
    >
      {children}
    </button>
  );
}
