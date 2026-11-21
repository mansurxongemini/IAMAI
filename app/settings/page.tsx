'use client';

import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { useWorkspace } from '@/components/WorkspaceProvider';

export default function SettingsPage() {
  const { dict, locale, profile, user, setLocale, saveProfile, signIn, signOut } = useWorkspace();

  const [draft, setDraft] = useState<{
    displayName?: string;
    dailyHours?: number;
    startTime?: string;
    endTime?: string;
    busyWindowsText?: string;
  }>({});
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const displayName = draft.displayName ?? profile.displayName;
  const dailyHours = draft.dailyHours ?? profile.dailyHours;
  const startTime = draft.startTime ?? profile.preferredStartTime;
  const endTime = draft.endTime ?? profile.preferredEndTime;
  const busyWindowsText = draft.busyWindowsText ?? profile.busyWindows.join(', ');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSavedNotice(false);
    try {
      const parsedWindows = busyWindowsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 10);

      await saveProfile({
        displayName: displayName.trim() || 'Executive Member',
        locale,
        dailyHours: Math.min(12, Math.max(0.5, Number(dailyHours) || 2)),
        busyWindows: parsedWindows,
        preferredStartTime: startTime || '08:00',
        preferredEndTime: endTime || '21:30',
      });
      setDraft({});
      setSavedNotice(true);
    } finally {
      setSaving(false);
    }
  }

  async function handleGoogleConnect() {
    setAuthError(null);
    try {
      await signIn();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Unable to sign in with Google.');
    }
  }

  return (
    <AppShell>
      <div className="max-w-3xl space-y-8">
        <header className="space-y-1.5">
          <p className="text-xs text-[#6E573E]">EN / UZ · Firestore Offline Sync</p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#1C1C1A]">
            {dict.settings.title}
          </h1>
          <p className="text-sm text-[#6A6760]">{dict.settings.subtitle}</p>
        </header>

        {/* Language Section */}
        <section className="glass-surface rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-medium text-[#1C1C1A]">
              {dict.settings.languageTitle}
            </h2>
            <p className="text-xs text-[#6A6760]">{dict.settings.languageDesc}</p>
          </div>

          <div
            role="group"
            aria-label={dict.settings.languageTitle}
            className="bg-[#EAE5DC] rounded-full p-1 inline-flex items-center gap-1 self-start sm:self-center shrink-0"
          >
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                locale === 'en' ? 'bg-[#1C1C1A] text-white' : 'text-[#6A6760] hover:text-[#1C1C1A]'
              }`}
            >
              English (EN)
            </button>
            <button
              type="button"
              onClick={() => setLocale('uz')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                locale === 'uz' ? 'bg-[#1C1C1A] text-white' : 'text-[#6A6760] hover:text-[#1C1C1A]'
              }`}
            >
              Oʻzbekcha (UZ)
            </button>
          </div>
        </section>

        {/* Daily Availability Profile */}
        <section className="glass-surface rounded-3xl p-6 sm:p-7 space-y-5">
          <h2 className="font-editorial text-2xl font-medium text-[#1C1C1A]">
            {dict.settings.availabilityTitle}
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="settings-daily-hours"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.settings.dailyHoursLabel}
                </label>
                <input
                  id="settings-daily-hours"
                  type="number"
                  step={0.5}
                  min={0.5}
                  max={12}
                  value={dailyHours}
                  onChange={(e) => setDraft((d) => ({ ...d, dailyHours: Number(e.target.value) }))}
                  className="w-full font-mono-tabular rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="settings-start-time"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.settings.startTimeLabel}
                </label>
                <input
                  id="settings-start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setDraft((d) => ({ ...d, startTime: e.target.value }))}
                  className="w-full font-mono-tabular rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="settings-end-time"
                  className="block text-xs font-medium text-[#1C1C1A]"
                >
                  {dict.settings.endTimeLabel}
                </label>
                <input
                  id="settings-end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setDraft((d) => ({ ...d, endTime: e.target.value }))}
                  className="w-full font-mono-tabular rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="settings-busy-windows"
                className="block text-xs font-medium text-[#1C1C1A]"
              >
                {dict.settings.busyWindowsLabel}
              </label>
              <input
                id="settings-busy-windows"
                type="text"
                value={busyWindowsText}
                onChange={(e) => setDraft((d) => ({ ...d, busyWindowsText: e.target.value }))}
                placeholder={dict.settings.busyWindowsPlaceholder}
                className="w-full rounded-2xl bg-white/80 border border-[#1C1C1A]/12 px-4 py-2.5 text-sm text-[#1C1C1A] focus:outline-none focus:border-[#1C1C1A]"
              />
            </div>

            <div className="flex items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-[#1C1C1A] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#32322F] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                <span>{dict.settings.saveProfile}</span>
              </button>

              {savedNotice && (
                <span className="inline-flex items-center gap-1.5 text-xs text-[#6E573E]">
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{dict.settings.savedConfirmation}</span>
                </span>
              )}
            </div>
          </form>
        </section>

        {/* Account & Offline Persistence */}
        <section className="glass-surface rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl font-medium text-[#1C1C1A]">
                {dict.settings.accountTitle}
              </h2>
              <p className="text-xs text-[#6A6760]">
                {user ? `${dict.settings.signedInAs}: ${user.email}` : dict.settings.guestMode}
              </p>
            </div>

            {user ? (
              <button
                type="button"
                onClick={() => void signOut()}
                className="rounded-full border border-[#1C1C1A]/15 px-5 py-2 text-xs font-medium text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white transition-colors self-start sm:self-center shrink-0 cursor-pointer"
              >
                {dict.settings.disconnect}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void handleGoogleConnect()}
                className="rounded-full bg-[#1C1C1A] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#32322F] transition-colors self-start sm:self-center shrink-0 cursor-pointer"
              >
                {dict.settings.connectGoogle}
              </button>
            )}
          </div>

          {authError && (
            <p role="alert" className="text-xs text-[#9E2A2B]">
              {authError}
            </p>
          )}

          <div className="pt-4 border-t border-[#1C1C1A]/8 space-y-1">
            <p className="text-xs font-medium text-[#1C1C1A]">{dict.settings.offlineCacheTitle}</p>
            <p className="text-xs text-[#6A6760]">{dict.settings.offlineCacheDesc}</p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
