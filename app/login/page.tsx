'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useWorkspace } from '@/components/WorkspaceProvider';

export default function LoginPage() {
  const router = useRouter();
  const { dict, locale, setLocale, signIn, user } = useWorkspace();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' || user) {
        router.replace('/');
      }
    }
  }, [router, user]);

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);
    try {
      await signIn();
      router.push('/');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Google sign-in was cancelled or unavailable.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-8 max-w-[1160px] mx-auto">
      <header className="flex items-center justify-between gap-8">
        <Link
          href="/"
          className="font-editorial text-2xl font-semibold tracking-tight text-[#1C1C1A] whitespace-nowrap"
        >
          {dict.brand}
        </Link>

        <div
          role="group"
          aria-label="Language"
          className="glass-surface rounded-full p-1 inline-flex items-center gap-1"
        >
          <button
            type="button"
            onClick={() => setLocale('en')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              locale === 'en' ? 'bg-[#1C1C1A] text-white' : 'text-[#6A6760]'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLocale('uz')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              locale === 'uz' ? 'bg-[#1C1C1A] text-white' : 'text-[#6A6760]'
            }`}
          >
            UZ
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12">
        <div className="lg:col-span-7 space-y-6">
          <h1 className="font-editorial text-5xl sm:text-6xl font-medium tracking-tight leading-[1.05] text-[#1C1C1A]">
            {dict.login.headline}
          </h1>
          <p className="text-base text-[#6A6760] max-w-lg leading-relaxed">
            {dict.login.subline}
          </p>

          <div className="pt-4 border-t border-[#1C1C1A]/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="font-mono-tabular text-xs text-[#6E573E]">01</span>
              <p className="text-sm font-medium text-[#1C1C1A]">{dict.login.pillar1}</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono-tabular text-xs text-[#6E573E]">02</span>
              <p className="text-sm font-medium text-[#1C1C1A]">{dict.login.pillar2}</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono-tabular text-xs text-[#6E573E]">03</span>
              <p className="text-sm font-medium text-[#1C1C1A]">{dict.login.pillar3}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass-surface rounded-3xl p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="font-editorial text-3xl font-medium text-[#1C1C1A]">
                {dict.nav.signIn}
              </h2>
              <p className="text-xs text-[#6A6760]">Firebase Google OAuth · Cloud Firestore</p>
            </div>

            {error && (
              <p role="alert" className="text-xs text-[#9E2A2B] bg-[#9E2A2B]/8 rounded-2xl p-3">
                {error}
              </p>
            )}

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => void handleGoogleLogin()}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1C1C1A] text-white px-5 py-3.5 text-sm font-medium hover:bg-[#32322F] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.24-.92 2.29-1.97 2.99v2.48h3.18c1.86-1.71 2.93-4.24 2.93-7.24 0-.41-.04-.82-.23-1.21Z"
                    />
                    <path
                      fill="currentColor"
                      d="M12.17 22c2.65 0 4.88-.88 6.51-2.38l-3.18-2.48c-.88.59-2 .94-3.33.94-2.56 0-4.73-1.73-5.51-4.05H3.38v2.55A9.83 9.83 0 0 0 12.17 22Z"
                    />
                    <path
                      fill="currentColor"
                      d="M6.66 14.03a5.9 5.9 0 0 1 0-3.79V7.69H3.38a9.84 9.84 0 0 0 0 8.89l3.28-2.55Z"
                    />
                    <path
                      fill="currentColor"
                      d="M12.17 6.19c1.44 0 2.74.5 3.76 1.47l2.82-2.82C17.04 3.24 14.82 2.27 12.17 2.27a9.83 9.83 0 0 0-8.79 5.42l3.28 2.55c.78-2.32 2.95-4.05 5.51-4.05Z"
                    />
                  </svg>
                )}
                <span>{dict.login.googleButton}</span>
              </button>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#1C1C1A]/15 px-5 py-3 text-sm font-medium text-[#1C1C1A] hover:bg-white/70 transition-colors"
              >
                <span>{dict.login.continuePreview}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-xs text-[#6A6760] flex items-center justify-between pt-4 border-t border-[#1C1C1A]/8">
        <span>IAM AI</span>
        <span>EN / UZ</span>
      </footer>
    </div>
  );
}
