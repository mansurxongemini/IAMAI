'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Compass,
  LayoutGrid,
  ListChecks,
  Mic,
  Settings,
  UserCircle2,
  WifiOff,
} from 'lucide-react';
import { useWorkspace } from './WorkspaceProvider';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { dict, user, isOnline } = useWorkspace();

  const navItems = [
    { href: '/', label: dict.nav.dashboard, icon: LayoutGrid },
    { href: '/rhetoric', label: dict.nav.rhetoric, icon: Mic },
    { href: '/certifications', label: dict.nav.certifications, icon: BookOpen },
    { href: '/assistant', label: dict.nav.assistant, icon: ListChecks },
    { href: '/settings', label: dict.nav.settings, icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname.startsWith('/roadmap');
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top 3-Zone Floating Frosted Pill Header */}
      <header className="sticky top-0 z-40 px-4 sm:px-6 lg:px-10 pt-4 pb-2">
        <div className="max-w-[1280px] mx-auto glass-surface rounded-full px-5 sm:px-6 h-14 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Editorial Brand Wordmark */}
          <Link
            href="/"
            className="font-editorial text-2xl font-semibold tracking-tight text-[#1C1C1A] whitespace-nowrap shrink-0"
          >
            {dict.brand}
          </Link>

          {/* Zone 2: Floating Pill Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#1C1C1A] text-white'
                      : 'text-[#6A6760] hover:text-[#1C1C1A] hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Account Action */}
          <div className="flex items-center shrink-0">
            <Link
              href={user ? '/settings' : '/login'}
              className="inline-flex items-center gap-2 rounded-full bg-[#1C1C1A] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#33332F] transition-colors whitespace-nowrap shrink-0"
            >
              <UserCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="max-w-[110px] truncate">
                {user ? user.displayName?.split(' ')[0] || dict.nav.settings : dict.nav.signIn}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Non-intrusive offline badge strictly when offline */}
      {!isOnline && (
        <div
          role="status"
          className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-10 pt-2"
        >
          <div className="inline-flex items-center gap-2 text-xs text-[#6E573E]">
            <WifiOff className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.common.offlineBadge}</span>
          </div>
        </div>
      )}

      {/* Main Content + Left Floating Vertical Icon Dock Rail (Desktop) */}
      <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-5 pb-24 md:pb-14 flex gap-6 items-start">
        <aside
          aria-label="Quick navigation dock"
          className="hidden lg:flex flex-col items-center gap-2 glass-surface rounded-full p-2 sticky top-24 shrink-0"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                title={item.label}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  active
                    ? 'bg-[#1C1C1A] text-white'
                    : 'text-[#6A6760] hover:text-[#1C1C1A] hover:bg-white/75'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </Link>
            );
          })}
          <div className="w-5 h-px bg-[#1C1C1A]/10 my-1" />
          <Link
            href="/roadmap/seed-ielts-academic"
            aria-label={dict.dashboard.openWorkspace}
            title={dict.dashboard.openWorkspace}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#6E573E] hover:bg-white/75 transition-colors"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
          </Link>
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Mobile Floating Frosted Bottom Pill Bar (<15% mobile viewport height) */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-4 inset-x-4 z-40"
      >
        <div className="glass-surface rounded-full px-2 py-1.5 flex items-center justify-around shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-3 rounded-full transition-colors ${
                  active ? 'bg-[#1C1C1A] text-white' : 'text-[#6A6760]'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
