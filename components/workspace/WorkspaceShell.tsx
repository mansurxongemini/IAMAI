'use client';

/*
  Workspace shell, Linear-style: a fixed left sidebar (workspace, search, views, plans, account),
  a content column whose pages render their own top bar (breadcrumb + actions), and a drawer on phones.
  It lives in app/(app)/layout.tsx, so it never remounts between pages.
*/

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Compass, ListChecks, LogOut, Menu, Plus, Search, Settings, Sun, WifiOff, X } from 'lucide-react';
import { computeRoadmapProgress } from '@core/scheduler';
import { useWorkspace } from '@/components/WorkspaceProvider';
import { CommandPalette } from '@/components/CommandPalette';
import { BrandMark, Wordmark } from '@/components/BrandMark';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

export const WS_COPY = {
  en: { today: 'Today', goals: 'Goals', assistant: 'Assistant', settings: 'Settings', plans: 'Plans', newPlan: 'New plan', search: 'Search', signOut: 'Sign out', menu: 'Open menu', close: 'Close menu', loading: 'Loading…', offline: 'Offline — changes sync later', noPlans: 'No plans yet' },
  uz: { today: 'Bugun', goals: 'Maqsadlar', assistant: 'Yordamchi', settings: 'Sozlamalar', plans: 'Rejalar', newPlan: 'Yangi reja', search: 'Qidirish', signOut: 'Chiqish', menu: 'Menyuni ochish', close: 'Menyuni yopish', loading: 'Yuklanmoqda…', offline: 'Oflayn — oʻzgarishlar keyin sinxronlanadi', noPlans: 'Hozircha reja yoʻq' },
} as const;

function Ring({ value }: { value: number }) {
  const r = 6;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r={r} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="8" cy="8" r={r} fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (value / 100) * c} transform="rotate(-90 8 8)" />
    </svg>
  );
}

function NavItem({ href, icon: Icon, label, active, kbd, onNavigate }: { href: string; icon: typeof Sun; label: string; active: boolean; kbd?: string; onNavigate?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex items-center gap-2.5 h-8 px-2.5 rounded-lg text-[13px] transition-colors',
        active ? 'bg-ink/[0.07] text-ink font-medium' : 'text-ink-2 hover:bg-ink/[0.04] hover:text-ink'
      )}
    >
      <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-ink' : 'text-muted group-hover:text-ink')} aria-hidden="true" />
      <span className="flex-1 truncate">{label}</span>
      {kbd && <span className="hidden lg:inline text-[11px] font-mono-tabular text-muted/70">{kbd}</span>}
    </Link>
  );
}

function Sidebar({ onNavigate, onSearch }: { onNavigate?: () => void; onSearch: () => void }) {
  const pathname = usePathname();
  const { locale, roadmaps, user, signOut } = useWorkspace();
  const c = WS_COPY[locale];
  const active = roadmaps.filter((r) => r.status !== 'archived');

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-3 h-12">
        <Link href="/" className="flex-1 min-w-0"><Wordmark className="text-[22px]" /></Link>
        <ThemeToggle locale={locale} className="h-8 w-8" />
      </div>

      <div className="px-2">
        <button
          type="button"
          onClick={onSearch}
          className="w-full flex items-center gap-2.5 h-8 px-2.5 rounded-lg border border-ink/[0.08] bg-surface text-[13px] text-muted hover:text-ink hover:border-ink/15 transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          <span className="flex-1 text-left">{c.search}</span>
          <kbd>⌘K</kbd>
        </button>
      </div>

      <nav aria-label="Workspace" className="mt-3 px-2 space-y-0.5">
        <NavItem href="/today" icon={Sun} label={c.today} active={pathname.startsWith('/today')} kbd="G T" onNavigate={onNavigate} />
        <NavItem href="/goals" icon={Compass} label={c.goals} active={pathname.startsWith('/goals')} kbd="G G" onNavigate={onNavigate} />
        <NavItem href="/assistant" icon={ListChecks} label={c.assistant} active={pathname.startsWith('/assistant')} kbd="G A" onNavigate={onNavigate} />
      </nav>

      <div className="mt-6 px-2 flex-1 min-h-0 overflow-y-auto">
        <div className="flex items-center justify-between px-2.5 h-7">
          <span className="text-[11px] label-mono text-muted">{c.plans}</span>
          <Link href="/goals" onClick={onNavigate} aria-label={c.newPlan} className="w-6 h-6 grid place-items-center rounded-md text-muted hover:text-ink hover:bg-ink/[0.05]">
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
        {active.length === 0 ? (
          <p className="px-2.5 py-1.5 text-[12px] text-muted">{c.noPlans}</p>
        ) : (
          <ul className="space-y-0.5">
            {active.map((rm) => {
              const href = `/plan/${rm.id}`;
              const on = pathname === href;
              return (
                <li key={rm.id}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={on ? 'page' : undefined}
                    className={cn('flex items-center gap-2.5 h-8 px-2.5 rounded-lg text-[13px] transition-colors', on ? 'bg-ink/[0.07] text-ink font-medium' : 'text-ink-2 hover:bg-ink/[0.04] hover:text-ink')}
                  >
                    <Ring value={computeRoadmapProgress(rm).percentComplete} />
                    <span className="flex-1 truncate">{rm.title[locale]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-ink/[0.06] p-2 space-y-0.5">
        <NavItem href="/settings" icon={Settings} label={c.settings} active={pathname.startsWith('/settings')} onNavigate={onNavigate} />
        <div className="flex items-center gap-2.5 h-10 px-2.5">
          {user?.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <span className="w-6 h-6 rounded-full bg-accent text-on-accent grid place-items-center text-[11px] font-semibold">{(user?.displayName ?? 'I').slice(0, 1)}</span>
          )}
          <span className="flex-1 min-w-0">
            <span className="block text-[13px] text-ink truncate">{user?.displayName ?? ''}</span>
            <span className="block text-[11px] text-muted truncate">{user?.email ?? ''}</span>
          </span>
          <button type="button" onClick={() => void signOut()} aria-label={c.signOut} title={c.signOut} className="w-8 h-8 grid place-items-center rounded-md text-muted hover:text-ink hover:bg-ink/[0.05] cursor-pointer">
            <LogOut className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, authReady, isOnline, locale } = useWorkspace();
  const c = WS_COPY[locale];
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  // Members-only: no session → the sign-in page, then back here.
  useEffect(() => {
    if (authReady && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [authReady, user, router, pathname]);

  useEffect(() => setDrawer(false), [pathname]);

  // Keyboard: ⌘K search; G then T/G/A/S to jump (Linear's "go to").
  useEffect(() => {
    let g = 0;
    const typing = (t: EventTarget | null) => t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      if (typing(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === 'g') {
        g = Date.now();
        return;
      }
      if (Date.now() - g < 900) {
        const to = { t: '/today', g: '/goals', a: '/assistant', s: '/settings' }[k];
        if (to) {
          e.preventDefault();
          router.push(to);
        }
        g = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  if (!authReady || !user) {
    return (
      <div className="min-h-dvh grid place-items-center" role="status" aria-live="polite">
        <div className="flex flex-col items-center gap-4">
          <BrandMark className="w-10 h-10 animate-pulse" title="" />
          <span className="text-sm text-muted">{c.loading}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_1fr]">
      <a href="#main" className="skip-link">{locale === 'uz' ? 'Asosiy qismga oʻtish' : 'Skip to content'}</a>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-0 h-dvh border-r border-ink/[0.07] bg-canvas-2/60">
        <Sidebar onSearch={() => setPaletteOpen(true)} />
      </aside>

      {/* Phone/tablet: top bar + drawer */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center gap-2 h-12 px-2 border-b border-ink/[0.07] bg-canvas/90 backdrop-blur-md">
        <button type="button" onClick={() => setDrawer(true)} aria-label={c.menu} className="w-10 h-10 grid place-items-center rounded-lg text-ink hover:bg-ink/[0.05] cursor-pointer">
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>
        <Link href="/" className="flex-1 min-w-0"><Wordmark className="text-[20px]" /></Link>
        <button type="button" onClick={() => setPaletteOpen(true)} aria-label={c.search} className="w-10 h-10 grid place-items-center rounded-lg text-ink hover:bg-ink/[0.05] cursor-pointer">
          <Search className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      {drawer && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={c.menu}>
          <button type="button" aria-label={c.close} onClick={() => setDrawer(false)} className="absolute inset-0 bg-black/30 animate-fade-in cursor-default" />
          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] bg-canvas border-r border-ink/[0.08] shadow-2xl animate-drawer-in">
            <button type="button" onClick={() => setDrawer(false)} aria-label={c.close} className="absolute right-2 top-2 w-8 h-8 grid place-items-center rounded-md text-muted hover:text-ink cursor-pointer z-10">
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
            <Sidebar onNavigate={() => setDrawer(false)} onSearch={() => { setDrawer(false); setPaletteOpen(true); }} />
          </div>
        </div>
      )}

      <div className="min-w-0 flex flex-col">
        {!isOnline && (
          <div role="status" className="flex items-center gap-2 h-8 px-4 text-[12px] text-warn bg-warn/[0.08] border-b border-warn/20">
            <WifiOff className="w-3.5 h-3.5" aria-hidden="true" /> {c.offline}
          </div>
        )}
        <main id="main" key={pathname} className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
