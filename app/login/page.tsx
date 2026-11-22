'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useWorkspace } from '@/components/WorkspaceProvider';
import { BrandLockup } from '@/components/BrandMark';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getDictionary } from '@core/i18n';

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29v-3.1H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.61l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77Z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { locale, setLocale, signIn, user } = useWorkspace();
  const c = getDictionary(locale).login;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const next = new URLSearchParams(window.location.search).get('next');
    router.replace(next && next.startsWith('/') && !next.startsWith('//') ? next : '/today');
  }, [router, user]);

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signIn();
    } catch (err) {
      const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: unknown }).code) : '';
      setError(code.includes('popup-closed') || code.includes('cancelled') ? c.cancelled : code.includes('popup-blocked') ? c.blocked : c.failed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      {/* Photograph side (desktop) */}
      <div className="relative hidden lg:block">
        <Image src="/photos/library.webp" alt={c.photoAlt} fill priority sizes="50vw" className="object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" aria-hidden="true" />
        <ul className="absolute left-10 bottom-10 right-10 space-y-3 text-white">
          {c.points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[17px]">
              <span className="w-6 h-6 rounded-full bg-white/15 backdrop-blur grid place-items-center"><Check className="w-3.5 h-3.5" aria-hidden="true" /></span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Sign-in side */}
      <div className="flex flex-col px-6 sm:px-12 py-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="min-h-11 inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {c.back}
          </Link>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setLocale(locale === 'en' ? 'uz' : 'en')}
              className="h-11 min-w-11 px-3 rounded-none text-[13px] font-medium text-ink-2 hover:text-ink hover:bg-surface/70 transition-colors cursor-pointer"
              aria-label={getDictionary(locale).landing.lang}
            >
              {locale === 'en' ? 'UZ' : 'EN'}
            </button>
            <ThemeToggle locale={locale} />
          </div>
        </header>

        <main id="main" className="flex-1 grid place-items-center py-12">
          <div className="w-full max-w-[400px] page-enter">
            <BrandLockup />
            <h1 className="mt-10 text-[36px] sm:text-[42px] leading-[1.05] font-medium tracking-[-0.035em] text-ink">{c.title}</h1>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{c.sub}</p>

            <button
              type="button"
              onClick={() => void handleGoogle()}
              disabled={loading}
              className="mt-10 w-full h-14 inline-flex items-center justify-center gap-3 rounded-none bg-surface border border-ink/15 text-[16px] font-medium text-ink shadow-sm hover:border-ink/30 hover:shadow-md active:scale-[0.99] transition-[border-color,box-shadow,transform] disabled:opacity-60 cursor-pointer"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> : <GoogleG />}
              {loading ? c.working : c.google}
            </button>

            {error && (
              <p role="alert" className="mt-4 rounded-2xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
            )}

            <ul className="mt-10 space-y-2.5 lg:hidden">
              {c.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] text-ink-2">
                  <Check className="w-4 h-4 text-accent" aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>

            <p className="mt-10 text-[13px] leading-relaxed text-muted">{c.privacy}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
