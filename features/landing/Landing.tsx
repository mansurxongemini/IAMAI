'use client';

/*
  Landing — a long, scroll-choreographed page (landing only; the workspace keeps its own UI).
  Five pinned stages — poster hero, clip-wipe manifesto, curriculum rail, a plan slip that prints
  itself, a contour phases band — then a ruled curriculum table, the FAQ and a dark footer.
  ONE scroll handler writes every stage's progress as CSS custom properties on the root; the CSS
  turns them into motion. DOM text changes only when a phase index changes. One
  IntersectionObserver reveals ~200 words, rows and cards. Under prefers-reduced-motion nothing
  pins, nothing moves and every stage renders in its finished state.
*/

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CATALOG } from '@core/catalog';
import { useWorkspace } from '@/components/WorkspaceProvider';
import credits from '@/public/photos/credits.json';
import { ContourCanvas, PlateCanvas, SoilCanvas, type PlateKind } from './canvases';
import { RAIL, landingCopy } from './copy';
import './landing.css';

const BY_ID = Object.fromEntries(CATALOG.map((e) => [e.id, e]));
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const d = (ms: number) => ({ ['--d' as string]: `${Math.round(ms)}ms` }) as CSSProperties;

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => setR(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
  return r;
}

/** Per-word spans that rise .42em and fade on a 38 ms stagger when their parent [data-words] is revealed. */
function Words({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="kw-w" style={{ ['--w' as string]: i } as CSSProperties}>{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

/**
 * Two-line poster lockup typed in one character every 50 ms, with a caret that rides the last
 * typed glyph. Untyped glyphs keep their width (visibility only), so the poster never reflows.
 * Each line is sized from its own character count so it can never wrap or clip.
 */
function TypedLockup({ kicker, brand, instant }: { kicker: string; brand: string; instant: boolean }) {
  const k = [...kicker.toUpperCase()];
  const b = [...brand];
  const total = k.length + b.length;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (instant) {
      setN(total);
      return;
    }
    setN(0);
    let i = 0;
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      tick = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= total && tick) clearInterval(tick);
      }, 50);
    }, 420);
    return () => {
      clearTimeout(start);
      if (tick) clearInterval(tick);
    };
  }, [kicker, brand, instant, total]);

  const caret = <span className="kw-caret" data-done={n >= total ? '1' : '0'} />;
  const glyphs = (chars: string[], offset: number) =>
    chars.map((ch, i) => {
      const idx = offset + i;
      return (
        <span key={idx}>
          {idx === 0 && n === 0 ? caret : null}
          <span className={`kw-tc${idx < n ? ' on' : ''}`}>{ch}</span>
          {idx === n - 1 ? caret : null}
        </span>
      );
    });

  return (
    <h1 className="kw-h1" aria-label={`${kicker} ${brand}`}>
      <span className="kw-line kw-line--kicker" style={{ ['--chars' as string]: k.length } as CSSProperties} aria-hidden="true">
        {glyphs(k, 0)}
      </span>
      <span className="kw-line kw-line--brand" style={{ ['--chars' as string]: b.length } as CSSProperties} aria-hidden="true">
        {glyphs(b, k.length)}
      </span>
    </h1>
  );
}

export function Landing() {
  const { locale, setLocale, hydrated, user } = useWorkspace();
  const c = landingCopy(locale);
  const signedIn = hydrated && Boolean(user);
  const goTo = (path: string) => (signedIn ? path : `/login?next=${encodeURIComponent(path)}`);
  const reduced = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const mfRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slipRef = useRef<HTMLElement>(null);
  const phasesRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(3);
  const [chapter, setChapter] = useState(-1);

  /* The one scroll handler: progress of each stage → custom properties; indices → state. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(3);
      setChapter(-1);
      return;
    }
    let overflow = 0;
    let raf = 0;
    let lastPhase = -1;
    let lastChapter = -1;
    const prog = (el: HTMLElement | null) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      return span > 0 ? clamp(-r.top / span) : 0;
    };
    const measure = () => {
      const t = trackRef.current;
      overflow = t ? Math.max(0, t.scrollWidth - window.innerWidth) : 0;
    };
    const write = () => {
      raf = 0;
      const s = root.style;
      const h = prog(heroRef.current);
      s.setProperty('--hero-type-y', `${(-90 * h).toFixed(2)}px`);
      s.setProperty('--hero-type-scale', (1 - 0.26 * h).toFixed(4));
      s.setProperty('--hero-type-alpha', clamp(1.15 - 1.15 * h).toFixed(3));
      s.setProperty('--hero-meta-alpha', clamp(1 - h * 2.2).toFixed(3));

      const m = prog(mfRef.current);
      s.setProperty('--manifesto-wipe', `${(m * 100).toFixed(2)}%`);
      s.setProperty('--manifesto-scale', (1 + 0.05 * m).toFixed(4));

      const r = prog(railRef.current);
      s.setProperty('--rail-x', `${(-r * overflow).toFixed(1)}px`);
      s.setProperty('--rail-meter', r.toFixed(4));

      const p = prog(slipRef.current);
      const a = easeOut(clamp(p / 0.16));
      s.setProperty('--packet-alpha', a.toFixed(3));
      s.setProperty('--packet-enter', `${(38 * (1 - a)).toFixed(2)}px`);
      s.setProperty('--packet-scale', (0.78 + 0.22 * easeOut(clamp(p / 0.3))).toFixed(4));
      s.setProperty('--packet-cut', clamp((p - 0.8) / 0.16).toFixed(3));
      s.setProperty('--packet-meter', p.toFixed(4));
      s.setProperty('--packet-copy-x', `${(-20 * p).toFixed(2)}px`);
      const ph = Math.min(3, Math.floor(p * 4));
      if (ph !== lastPhase) {
        lastPhase = ph;
        setPhase(ph);
      }

      const q = prog(phasesRef.current);
      s.setProperty('--season-y', `${(-4 + 8 * q).toFixed(3)}%`);
      s.setProperty('--season-scale', (1.1 - 0.045 * q).toFixed(4));
      const ch = Math.min(2, Math.floor(q * 3));
      if (ch !== lastChapter) {
        lastChapter = ch;
        setChapter(ch);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    write();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(onResize).catch(() => undefined);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [locale]);

  /* One IntersectionObserver for every per-word and per-row reveal. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('kw-armed');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll('[data-rev]:not(.is-in), [data-words]:not(.is-in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [locale]);

  const typedMs = 420 + ([...c.hero.kicker].length + [...c.hero.brand].length) * 50;
  const navLinks: [string, string][] = [
    ['#method', c.nav.method],
    ['#rail', c.nav.rail],
    ['#slip', c.nav.slip],
    ['#phases', c.nav.phases],
    ['#faq', c.nav.faq],
  ];

  return (
    <div ref={rootRef} className="kw">
      <a href="#main" className="skip-link">{c.skip}</a>

      <header className="kw-nav">
        <div className="kw-nav__in">
          <Link href="/" className="kw-word" aria-label="IAM AI" data-rev style={d(0)}>
            IAM <b>AI</b>
          </Link>
          <nav aria-label="Primary" className="kw-nav__links kw-mono">
            {navLinks.map(([href, label], i) => (
              <a key={href} href={href} data-rev style={d(60 + i * 60)}>{label}</a>
            ))}
          </nav>
          <div className="kw-nav__end">
            <button type="button" className="kw-nav__lang kw-mono" onClick={() => setLocale(locale === 'en' ? 'uz' : 'en')} aria-label={c.lang} data-rev style={d(380)}>
              {locale === 'en' ? 'UZ' : 'EN'}
            </button>
            <Link href={signedIn ? '/today' : '/login'} className="kw-btn kw-btn--line kw-btn--sm" data-rev style={d(440)}>
              {signedIn ? c.continue : c.signIn}
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Stage 1 · poster hero on three independent variables */}
        <section ref={heroRef} className="kw-stage kw-stage--hero" aria-labelledby="kw-hero-h">
          <div className="kw-pin">
            <SoilCanvas className="kw-fill" />
            <div className="kw-hero__veil" />
            <div className="kw-poster">
              <div className="kw-poster__in" id="kw-hero-h">
                <TypedLockup key={locale} kicker={c.hero.kicker} brand={c.hero.brand} instant={reduced} />
                <p className="kw-poster__sub" data-words style={d(typedMs + 80)}>
                  <Words text={c.hero.sub} />
                </p>
                <div className="kw-actions kw-actions--center">
                  <Link href={goTo('/goals')} className="kw-btn kw-btn--primary" data-rev style={d(typedMs + 520)}>
                    {c.start} <ArrowRight aria-hidden="true" />
                  </Link>
                  <a href="#method" className="kw-btn kw-btn--line" data-rev style={d(typedMs + 600)}>{c.nav.method}</a>
                </div>
              </div>
            </div>
            <div className="kw-hero__meta kw-mono">
              {c.hero.meta.map((m, i) => (
                <span key={m} data-rev style={d(typedMs + 200 + i * 80)}>{m}</span>
              ))}
              <span className="kw-hero__scroll" data-rev style={d(typedMs + 520)}>{c.hero.scroll} ↓</span>
            </div>
          </div>
        </section>

        {/* Stage 2 · one sentence filled bottom-up by a clip-path wipe on an exact duplicate */}
        <section ref={mfRef} id="method" className="kw-stage kw-stage--manifesto" aria-label={c.manifesto.eyebrow}>
          <div className="kw-pin">
            <p className="kw-stage__eyebrow kw-mono" data-rev>{c.manifesto.eyebrow}</p>
            <div className="kw-manifesto">
              <p className="kw-mf" data-words>
                <span className="kw-mf__base"><Words text={c.manifesto.line} /></span>
                <span className="kw-mf__fill" aria-hidden="true"><Words text={c.manifesto.line} /></span>
              </p>
            </div>
          </div>
        </section>

        {/* Stage 3 · six cards walked sideways by exactly their own overflow */}
        <section ref={railRef} id="rail" className="kw-stage kw-stage--rail" aria-labelledby="kw-rail-h">
          <div className="kw-pin kw-pin--rail">
            <div className="kw-rail__head">
              <div>
                <p className="kw-mono kw-dim" data-rev>{c.rail.eyebrow}</p>
                <h2 id="kw-rail-h" className="kw-h2" data-words><Words text={c.rail.h2} /></h2>
              </div>
              <p className="kw-mono kw-dim kw-rail__hint" data-rev style={d(200)}>{c.rail.hint} →</p>
            </div>
            <div className="kw-rail__viewport">
              <div ref={trackRef} className="kw-rail__track">
                {RAIL.map((r, i) => {
                  const e = BY_ID[r.id];
                  if (!e) return null;
                  return (
                    <Link key={r.id} href={goTo(`/goals/${r.id}`)} className="kw-card" data-rev style={d(i * 70)}>
                      <PlateCanvas kind={r.plate as PlateKind} seed={i + 3} className="kw-card__plate" />
                      <span className="kw-card__code kw-mono" data-rev style={d(i * 70 + 120)}>{e.code}</span>
                      <span className="kw-card__t" data-rev style={d(i * 70 + 180)}>{r.name[locale]}</span>
                      <span className="kw-card__meta kw-mono" data-rev style={d(i * 70 + 240)}>
                        <span className="kw-dim">{c.rail.track[e.category]} · {c.rail.weeks(e.recommendedWeeks)}</span>
                        <span className="kw-card__price" data-rev style={d(i * 70 + 300)}>{c.rail.hours(e.baselineTotalHours)}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="kw-meter kw-rail__meter" aria-hidden="true"><i className="kw-meter__rail" /></div>
          </div>
        </section>

        {/* Stage 4 · the plan slip prints itself; text changes only when the phase index changes */}
        <section ref={slipRef} id="slip" className="kw-stage kw-stage--slip" aria-labelledby="kw-slip-h">
          <div className="kw-pin">
            <div className="kw-slip-stage">
              <div className="kw-slip-copy">
                <p className="kw-mono kw-dim" data-rev>{c.slip.eyebrow}</p>
                <h2 id="kw-slip-h" className="kw-h2" data-words><Words text={c.slip.h2} /></h2>
                <p className="kw-lede" data-words style={d(120)}><Words text={c.slip.lede} /></p>
                <ol className="kw-cues">
                  {c.slip.cues.map((cue, i) => (
                    <li key={cue} className="kw-cue kw-mono" data-lit={i <= phase ? '1' : '0'} data-now={i === phase ? '1' : '0'} data-rev style={d(i * 80)}>
                      <span>0{i + 1}</span> {cue}
                    </li>
                  ))}
                </ol>
                <p className="kw-status kw-mono" data-rev style={d(320)}>
                  <span className="kw-status__dot" aria-hidden="true" /> {c.slip.status[Math.max(0, phase)]}
                </p>
                <div className="kw-meter" aria-hidden="true"><i className="kw-meter__packet" /></div>
              </div>

              <div className="kw-slip-wrap">
                <article className="kw-slip" aria-label={c.slip.head}>
                  <header className="kw-slip__head">
                    <span className="kw-mono">{c.slip.head}</span>
                    <span className="kw-slip__name">{c.slip.name}</span>
                  </header>
                  <PlateCanvas kind="rings" seed={11} tone="paper" className="kw-slip__plate" />
                  <dl className="kw-slip__rows kw-mono">
                    {[
                      [c.slip.rows[0], c.slip.lot],
                      [c.slip.rows[1], phase >= 1 ? c.slip.delta : c.slip.pending],
                      [c.slip.rows[2], phase >= 2 ? c.slip.dates : '—'],
                    ].map(([k, v], i) => (
                      <div key={k} className="kw-slip__row" data-rev style={d(200 + i * 90)}>
                        <dt>{k}</dt>
                        <dd data-filled={v === c.slip.pending || v === '—' ? '0' : '1'}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
                <div className="kw-perf" aria-hidden="true" />
                <div className="kw-stub kw-mono">{c.slip.stub}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 5 · contour plate parallax; one chapter lit at a time */}
        <section ref={phasesRef} id="phases" className="kw-stage kw-stage--phases" aria-labelledby="kw-phases-h">
          <div className="kw-pin">
            <ContourCanvas className="kw-fill kw-season__plate" />
            <div className="kw-season__veil" />
            <div className="kw-season">
              <p className="kw-mono kw-dim" data-rev>{c.phases.eyebrow}</p>
              <h2 id="kw-phases-h" className="kw-h2 kw-h2--xl" data-words><Words text={c.phases.h2} /></h2>
              <ol className="kw-chapters">
                {c.phases.chapters.map((ch, i) => (
                  <li key={ch.t} className="kw-chapter" data-on={chapter === -1 || chapter === i ? '1' : '0'} data-rev style={d(i * 100)}>
                    <span className="kw-mono kw-chapter__l" data-rev style={d(i * 100 + 80)}>{ch.l}</span>
                    <span className="kw-chapter__t">{ch.t}</span>
                    <span className="kw-chapter__d">{ch.d}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Ruled curriculum table */}
        <section className="kw-band" aria-labelledby="kw-table-h">
          <div className="kw-wrap">
            <p className="kw-mono kw-dim" data-rev>{c.table.eyebrow}</p>
            <div className="kw-band__head">
              <h2 id="kw-table-h" className="kw-h2" data-words><Words text={c.table.h2} /></h2>
              <p className="kw-lede" data-words style={d(120)}><Words text={c.table.lede} /></p>
            </div>
            <div className="kw-table" role="table" aria-labelledby="kw-table-h">
              <div className="kw-tr kw-tr--head kw-mono" role="row" data-rev>
                {c.table.cols.map((col, j) => (
                  <span key={col} role="columnheader" className={`kw-td kw-td--${j}`}>{col}</span>
                ))}
              </div>
              {CATALOG.map((e, i) => (
                <div key={e.id} className="kw-tr" role="row" data-rev style={d(i * 50)}>
                  <span role="cell" className="kw-td kw-td--0 kw-mono" data-rev style={d(i * 50 + 40)}>{e.code}</span>
                  <span role="cell" className="kw-td kw-td--1" data-rev style={d(i * 50 + 80)}>
                    <Link href={goTo(`/goals/${e.id}`)}>{e.title[locale]}<ArrowUpRight aria-hidden="true" /></Link>
                  </span>
                  <span role="cell" className="kw-td kw-td--2 kw-mono kw-dim" data-rev style={d(i * 50 + 120)}>{c.rail.track[e.category]}</span>
                  <span role="cell" className="kw-td kw-td--3 kw-mono kw-dim" data-rev style={d(i * 50 + 160)}>{e.recommendedWeeks}</span>
                  <span role="cell" className="kw-td kw-td--4 kw-mono kw-price" data-rev style={d(i * 50 + 200)}>{e.baselineTotalHours}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ: native details rows */}
        <section id="faq" className="kw-band kw-band--alt" aria-labelledby="kw-faq-h">
          <div className="kw-wrap kw-faq-grid">
            <div>
              <p className="kw-mono kw-dim" data-rev>{c.faq.eyebrow}</p>
              <h2 id="kw-faq-h" className="kw-h2" data-words><Words text={c.faq.h2} /></h2>
            </div>
            <div className="kw-faq">
              {c.faq.items.map((f, i) => (
                <details key={f.q}>
                  <summary data-rev style={d(i * 60)}>
                    {f.q}
                    <span className="kw-plus" aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="kw-foot">
        <div className="kw-wrap">
          <h2 className="kw-foot__h" data-words><Words text={c.close.h2} /></h2>
          <div className="kw-actions">
            <Link href={goTo('/goals')} className="kw-btn kw-btn--primary" data-rev style={d(120)}>
              {c.start} <ArrowRight aria-hidden="true" />
            </Link>
            <Link href={signedIn ? '/today' : '/login'} className="kw-btn kw-btn--line" data-rev style={d(200)}>
              {signedIn ? c.continue : c.signIn}
            </Link>
          </div>
          <p className="kw-foot__mark" aria-hidden="true" data-rev style={d(100)}>IAM <b>AI</b></p>
          <nav aria-label={c.close.all} className="kw-foot__codes kw-mono" data-rev style={d(160)}>
            {CATALOG.map((e) => (
              <Link key={e.id} href={goTo(`/goals/${e.id}`)}>{e.code}</Link>
            ))}
          </nav>
          <p className="kw-foot__line kw-mono" data-rev style={d(220)}>
            {c.credits}:{' '}
            {credits.map((p, i) => (
              <span key={p.name}>
                <a href={p.page} rel="noopener noreferrer" target="_blank">{p.by}</a>{' '}
                (<a href={p.licenceUrl} rel="noopener noreferrer" target="_blank">{p.licence}</a>){i < credits.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
          <p className="kw-foot__line kw-mono kw-dim" data-rev style={d(280)}>© 2026 IAM AI · English · Oʻzbek</p>
        </div>
      </footer>
    </div>
  );
}
