'use client';

/*
  Landing, in the workspace's own system: Parkinsans on a hairline grid, one pastel hue per
  curriculum, pills, hand-written notes.

  1. Stage: the multicolour wordmark, wired by leader lines to five curriculum pills. The lines
     are measured from the real letters and pills, so they stay attached at every width; under
     760px the pills drop below the lede as a plain row.
  2. Tracks: three fanned cards, a two-tone title, then all ten curricula as cards.
  3. Method: a giant multicolour word, prose with coloured phrases, the sample plan window and
     the three phases with hand-drawn arrows.
  4. FAQ, then the footer with the cropped wordmark.

  Motion: one entrance on load (letters, then lines, then pills), one IntersectionObserver for
  the reveals, hover states in CSS. Under prefers-reduced-motion everything is simply there.
*/

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { CATALOG, type CatalogEntry } from '@core/catalog';
import { useWorkspace } from '@/components/WorkspaceProvider';
import { getDictionary } from '@core/i18n';
import { TRACK_HUE, hueVars, type Hue } from '@/features/goals/hues';
import { trackArt } from '@/features/goals/photos';
import Image from 'next/image';
import './landing.css';

type LandingCopy = ReturnType<typeof getDictionary>['landing'];

/** One hue per curriculum, shared with the workspace (features/goals/hues.ts). */
const HUE_OF = TRACK_HUE;
const BY_ID = Object.fromEntries(CATALOG.map((e) => [e.id, e])) as Record<string, CatalogEntry>;

/** The wordmark: five letters, five hues. */
const MARK: { ch: string; hue: Hue }[] = [
  { ch: 'I', hue: 'mint' },
  { ch: 'A', hue: 'iris' },
  { ch: 'M', hue: 'lilac' },
  { ch: 'A', hue: 'rose' },
  { ch: 'I', hue: 'sun' },
];

/**
 * The five pills around the wordmark. `letter` is the letter its line lands on; fx/fy place the
 * pill's centre as fractions of the wordmark's width (fy measured upward from its top edge).
 */
const PORTALS: { id: string; letter: number; fx: number; fy: number }[] = [
  { id: 'ielts-academic', letter: 0, fx: -0.13, fy: 0.07 },
  { id: 'sat-digital', letter: 1, fx: 0.1, fy: 0.27 },
  { id: 'lsat', letter: 2, fx: 0.5, fy: 0.37 },
  { id: 'sqe', letter: 3, fx: 0.9, fy: 0.26 },
  { id: 'tedx-oratory', letter: 4, fx: 1.13, fy: 0.07 },
];
const DECK = ['ielts-academic', 'lsat', 'tedx-oratory'];
/** The gradient of the method word, letter by letter. */
const WORD_HUES: Hue[] = ['mint', 'lime', 'teal', 'iris', 'lilac', 'rose'];

const hue = hueVars;
const idx = (i: number, extra: CSSProperties = {}) => ({ ['--i' as string]: i, ...extra }) as CSSProperties;

/** `[phrase]{hue}` colours a phrase, `[phrase]{hue|#id}` also links it. */
function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\{(\w+)(?:\|([^}]+))?\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, t, h, href] = m;
    out.push(
      href ? (
        <a key={m.index} href={href} className="lp-hl" style={hue(h as Hue)}>{t}</a>
      ) : (
        <span key={m.index} className="lp-hl" style={hue(h as Hue)}>{t}</span>
      )
    );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Hand-drawn arrows for the margins (stroke only, drawn in on reveal). */
const ARROWS = [
  'M4 30C18 4 36 2 32 20 28 36 8 32 20 18 32 6 58 18 92 34M83 26l9 8-10 4',
  'M6 40C20 8 66 2 92 30M82 24l10 6-7 10',
  'M4 24C14 8 22 40 32 24S50 8 60 24 78 40 92 22M84 18l8 4-5 9',
];
function Arrow({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 96 48" className={`lp-arrow ${className ?? ''}`} aria-hidden="true">
      <path d={d} pathLength={1} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Stage: wordmark + leader lines + pills                              */
/* ------------------------------------------------------------------ */

type Geo = { w: number; h: number; pills: { x: number; y: number }[]; paths: string[]; dots: [number, number][] };

function Stage({
  portals,
  goTo,
  lede,
  children,
}: {
  portals: Readonly<Record<string, { readonly label: string; readonly note: string }>>;
  goTo: (p: string) => string;
  lede: string;
  children: ReactNode;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pillRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [hot, setHot] = useState(-1);

  useEffect(() => {
    let raf = 0;
    const layout = () => {
      raf = 0;
      const canvas = canvasRef.current;
      const mark = markRef.current;
      if (!canvas || !mark) return;
      if (window.innerWidth < 760) {
        setGeo(null);
        return;
      }
      const cr = canvas.getBoundingClientRect();
      const mr = mark.getBoundingClientRect();
      // Cap top of the letters: the baseline sits half-leading + ascent below the line box top.
      const cs = getComputedStyle(mark);
      const fs = parseFloat(cs.fontSize);
      let capTop = 0.14 * fs;
      const ctx = document.createElement('canvas').getContext('2d');
      if (ctx) {
        ctx.font = `800 ${fs}px ${cs.fontFamily}`;
        const tm = ctx.measureText('IAM');
        const lh = parseFloat(cs.lineHeight) || fs * 0.85;
        if (tm.fontBoundingBoxAscent && tm.fontBoundingBoxDescent) {
          capTop = (lh - (tm.fontBoundingBoxAscent + tm.fontBoundingBoxDescent)) / 2 + tm.fontBoundingBoxAscent - tm.actualBoundingBoxAscent;
        }
      }
      const pills: Geo['pills'] = [];
      const paths: string[] = [];
      const dots: Geo['dots'] = [];
      PORTALS.forEach((p, i) => {
        const pill = pillRefs.current[i];
        const letter = letterRefs.current[p.letter];
        if (!pill || !letter) return;
        const pw = pill.offsetWidth;
        const ph = pill.offsetHeight;
        const cx = mr.left - cr.left + p.fx * mr.width;
        const cy = mr.top - cr.top - p.fy * mr.width;
        pills.push({ x: cx - pw / 2, y: cy - ph / 2 });
        const lr = letter.getBoundingClientRect();
        const tx = lr.left - cr.left + lr.width / 2;
        const ty = mr.top - cr.top + capTop + 3;
        const r = 14;
        let d: string;
        if (Math.abs(tx - cx) < pw / 2 - 10) {
          d = `M ${tx.toFixed(1)} ${(cy + ph / 2).toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
        } else {
          const dir = Math.sign(tx - cx);
          const sx = cx + (dir * pw) / 2;
          d = `M ${sx.toFixed(1)} ${cy.toFixed(1)} L ${(tx - dir * r).toFixed(1)} ${cy.toFixed(1)} Q ${tx.toFixed(1)} ${cy.toFixed(1)} ${tx.toFixed(1)} ${(cy + r).toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
        }
        paths.push(d);
        dots.push([tx, ty]);
      });
      setGeo({ w: cr.width, h: cr.height, pills, paths, dots });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(layout);
    };
    layout();
    const ro = new ResizeObserver(schedule);
    if (canvasRef.current) ro.observe(canvasRef.current);
    document.fonts?.ready.then(schedule).catch(() => undefined);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [portals]);

  return (
    <div ref={canvasRef} className="lp-stage__canvas" data-wired={geo ? '1' : '0'}>
      {geo && (
        <svg className="lp-leaders" viewBox={`0 0 ${geo.w} ${geo.h}`} width={geo.w} height={geo.h} aria-hidden="true">
          {geo.paths.map((d, i) => (
            <path key={PORTALS[i]!.id} d={d} pathLength={1} className="lp-leader" data-hot={hot === i ? '1' : '0'} style={idx(i, hue(HUE_OF[PORTALS[i]!.id]!))} />
          ))}
          {geo.dots.map(([x, y], i) => (
            <circle key={PORTALS[i]!.id} cx={x} cy={y} r={5} className="lp-dot" data-hot={hot === i ? '1' : '0'} style={idx(i, hue(HUE_OF[PORTALS[i]!.id]!))} />
          ))}
        </svg>
      )}

      <h1 className="lp-mark" aria-label="IAM AI">
        <span ref={markRef} className="lp-mark__word" aria-hidden="true">
          {MARK.map((l, i) => (
            <span key={i} className="lp-mark__cell">
              {i === 3 ? <span className="lp-mark__gap"> </span> : null}
              <span
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className="lp-letter"
                data-hot={PORTALS[hot]?.letter === i ? '1' : '0'}
                style={idx(i, hue(l.hue))}
              >
                {l.ch}
              </span>
            </span>
          ))}
        </span>
      </h1>

      <p className="lp-stage__lede">{lede}</p>

      <ul className="lp-portals">
        {PORTALS.map((p, i) => {
          const info = portals[p.id];
          if (!info) return null;
          const pos = geo?.pills[i];
          return (
            <li key={p.id} className="lp-portal-slot" style={{ ...idx(i, hue(HUE_OF[p.id]!)), ...(pos ? { left: pos.x, top: pos.y } : {}) }}>
              <span className="lp-portal__note type-hand" aria-hidden="true">{info.note}</span>
              <Link
                ref={(el) => {
                  pillRefs.current[i] = el;
                }}
                href={goTo(`/goals/${p.id}`)}
                className="lp-portal"
                onPointerEnter={() => setHot(i)}
                onPointerLeave={() => setHot(-1)}
                onFocus={() => setHot(i)}
                onBlur={() => setHot(-1)}
              >
                <span className="lp-portal__fill" aria-hidden="true" />
                <span className="lp-portal__label">
                  <span className="lp-portal__roll">
                    <span>{info.label}</span>
                    <span aria-hidden="true">{info.label}</span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

function TrackCard({
  e,
  href,
  c,
  locale,
  priority,
  className,
  style,
}: {
  e: CatalogEntry;
  href: string;
  c: LandingCopy;
  locale: 'en' | 'uz';
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Link href={href} className={`lp-card ${className ?? ''}`} style={{ ...hue(HUE_OF[e.id] ?? 'iris'), ...style }}>
      <span className="lp-card__meta">{c.tracks.weeks(e.recommendedWeeks)}</span>
      <Image src={trackArt(e.id)} alt="" width={560} height={560} sizes="(min-width: 1024px) 200px, 40vw" className="lp-card__img" priority={priority} />
      <span className="lp-card__body">
        <span className="lp-card__name">
          {e.title[locale]}
          <sup>{e.code}</sup>
        </span>
        <span className="lp-card__premise">{e.subtitle[locale]}</span>
      </span>
      <span className="lp-chips">
        <span>{c.tracks.kind[e.category]}</span>
        <span>{c.tracks.hours(e.baselineTotalHours)}</span>
        <span>{c.tracks.steps(e.steps)}</span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Landing() {
  const { locale, setLocale, hydrated, user } = useWorkspace();
  const dict = getDictionary(locale);
  const c = dict.landing;
  const signedIn = hydrated && Boolean(user);
  const goTo = (path: string) => (signedIn ? path : `/login?next=${encodeURIComponent(path)}`);
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState('');

  /* Nav: glass once the page moves; the link of the section in view is marked current. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const sections = ['top', 'tracks', 'method', 'faq'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id === 'top' ? '' : e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  /* One IntersectionObserver for every reveal. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('lp-armed');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    root.querySelectorAll('[data-in]:not(.is-in), .lp-grid__card:not(.is-in), .lp-foot__in:not(.is-in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [locale]);

  const nav: [string, string, number?][] = [
    ['tracks', c.nav.tracks, CATALOG.length],
    ['method', c.nav.method],
    ['faq', c.nav.faq],
  ];
  const phaseHues: Hue[] = ['mint', 'gold', 'iris'];
  const cueHues: Hue[] = ['mint', 'gold', 'iris', 'rose'];

  return (
    <div ref={rootRef} className="lp">
      <a href="#main" className="skip-link">{c.skip}</a>

      <header className="lp-nav" data-scrolled={scrolled ? '1' : '0'}>
        <div className="lp-nav__in">
          <div className="lp-nav__start">
            <Link href="/" className="lp-logo" aria-label="IAM AI">
              {MARK.map((l, i) => (
                <span key={i} style={hue(l.hue)}>
                  {i === 3 ? ' ' : ''}
                  {l.ch}
                </span>
              ))}
            </Link>
            <span className="lp-nav__metrics" aria-hidden="true">
              {c.metrics.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </span>
          </div>
          <nav aria-label={dict.a11y.primaryNav} className="lp-nav__links">
            {nav.map(([id, label, count]) => (
              <a key={id} href={`#${id}`} className="lp-nav__link" aria-current={current === id ? 'true' : undefined}>
                {label}
                {count ? <sup className="lp-nav__count">{count}</sup> : null}
              </a>
            ))}
          </nav>
          <div className="lp-nav__end">
            <button type="button" className="lp-lang" onClick={() => setLocale(locale === 'en' ? 'uz' : 'en')} aria-label={c.lang}>
              {locale === 'en' ? 'UZ' : 'EN'}
            </button>
            <Link href={signedIn ? '/today' : '/login'} className="lp-btn lp-btn--line lp-btn--sm">
              {signedIn ? c.continue : c.signIn}
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        {/* 1 · Stage */}
        <section id="top" className="lp-stage" aria-label="IAM AI">
          <Stage key={locale} portals={c.hero.portals} goTo={goTo} lede={c.hero.lede}>
            <div className="lp-stage__actions">
              <Link href={goTo('/goals')} className="lp-btn" style={hue('iris')}>{c.start}</Link>
              <a href="#method" className="lp-btn" style={hue('rose')}>{c.more}</a>
            </div>
          </Stage>
        </section>

        {/* 2 · Tracks: the fanned deck, the two-tone title, then all ten */}
        <section id="tracks" className="lp-tracks" aria-labelledby="lp-tracks-h">
          <div className="lp-tracks__hero">
            <div className="lp-deck" data-in>
              {DECK.map((id, i) => {
                const e = BY_ID[id];
                return e ? <TrackCard key={id} e={e} href={goTo(`/goals/${id}`)} c={c} locale={locale} priority={i === 1} className="lp-deck__card" /> : null;
              })}
            </div>
            <div>
              <h2 id="lp-tracks-h" className="lp-duo" style={hue('lilac')} data-in>
                <span className="lp-duo__a">{c.tracks.a}</span> <span className="lp-duo__b">{c.tracks.b}</span>
              </h2>
              <p className="lp-tagline" data-in style={idx(1)}>{c.tracks.tagline}</p>
            </div>
          </div>

          <div className="lp-wrap">
            <p className="lp-eyebrow" data-in>
              {c.tracks.all}
              <sup>{CATALOG.length}</sup>
            </p>
            <div className="lp-grid">
              {CATALOG.map((e, i) => (
                <TrackCard key={e.id} e={e} href={goTo(`/goals/${e.id}`)} c={c} locale={locale} className="lp-grid__card" style={idx(i % 3)} />
              ))}
            </div>
          </div>
        </section>

        {/* 3 · Method */}
        <section id="method" className="lp-method" aria-labelledby="lp-method-h">
          <div className="lp-wrap">
            <h2 id="lp-method-h" className="lp-word" data-in aria-label={c.method.word}>
              {[...c.method.word].map((ch, i) => (
                <span key={i} className="lp-letter" aria-hidden="true" style={idx(i, hue(WORD_HUES[i % WORD_HUES.length]!))}>
                  {ch}
                </span>
              ))}
            </h2>
            <p className="lp-lead" data-in>
              <Rich text={c.method.lead} />
            </p>

            <div className="lp-plan">
              <div className="lp-plan__copy" data-in>
                <p>{c.method.body}</p>
                <span className="lp-plan__note type-hand" aria-hidden="true" style={hue('gold')}>
                  {c.method.plan.note}
                  <Arrow d={ARROWS[1]!} className="lp-draw" />
                </span>
              </div>
              <article className="lp-win" aria-label={c.method.plan.title} data-in style={idx(1)}>
                <header className="lp-win__bar">
                  <span className="lp-win__dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="lp-win__title">{c.method.plan.title}</span>
                  <span className="lp-win__live">
                    <i aria-hidden="true" />
                    {c.method.plan.live}
                  </span>
                </header>
                <ol className="lp-win__cues">
                  {c.method.plan.cues.map((cue, i) => (
                    <li key={cue} style={idx(i, hue(cueHues[i % cueHues.length]!))}>
                      <span className="lp-win__tick" aria-hidden="true">✓</span>
                      {cue}
                    </li>
                  ))}
                </ol>
                <dl className="lp-win__rows">
                  {[
                    [c.method.plan.rows[0], c.method.plan.lot],
                    [c.method.plan.rows[1], c.method.plan.delta],
                    [c.method.plan.rows[2], c.method.plan.dates],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="lp-win__stub">{c.method.plan.stub}</p>
              </article>
            </div>

            <h3 className="lp-h3" data-in>{c.method.phasesTitle}</h3>
            <ol className="lp-phases">
              {c.method.phases.map((ph, i) => (
                <li key={ph.t} className="lp-phase" data-in style={hue(phaseHues[i % phaseHues.length]!)}>
                  <span className="lp-phase__gutter" aria-hidden="true">
                    <span className="type-hand">{ph.note}</span>
                    <Arrow d={ARROWS[i % ARROWS.length]!} className="lp-draw" />
                  </span>
                  <p>
                    <b>{ph.t}</b> {ph.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · FAQ */}
        <section id="faq" className="lp-faq" aria-labelledby="lp-faq-h">
          <div className="lp-wrap lp-faq__grid">
            <h2 id="lp-faq-h" className="lp-duo lp-duo--sm" style={hue('teal')} data-in>
              <span className="lp-duo__a">{c.faq.a}</span> <span className="lp-duo__b">{c.faq.b}</span>
            </h2>
            <div className="lp-faq__list" data-in style={idx(1)}>
              {c.faq.items.map((f) => (
                <details key={f.q}>
                  <summary>
                    {f.q}
                    <span className="lp-plus" aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-foot">
        <div className="lp-foot__in">
          <h2 className="lp-foot__h lp-enter" style={idx(0)}>{c.close.h2}</h2>
          <div className="lp-stage__actions lp-enter" style={idx(1)}>
            <Link href={goTo('/goals')} className="lp-btn" style={hue('iris')}>{c.start}</Link>
            <Link href={signedIn ? '/today' : '/login'} className="lp-btn lp-btn--line">{signedIn ? c.continue : c.signIn}</Link>
          </div>
          <nav aria-label={c.close.all} className="lp-foot__links lp-enter" style={idx(2)}>
            {CATALOG.map((e) => (
              <Link key={e.id} href={goTo(`/goals/${e.id}`)} style={hue(HUE_OF[e.id] ?? 'iris')}>
                {e.code}
              </Link>
            ))}
          </nav>
          <p className="lp-foot__line lp-enter" style={idx(3)}>{c.footer}</p>
          <p className="lp-foot__mark" aria-hidden="true">
            {MARK.map((l, i) => (
              <span key={i} style={hue(l.hue)}>
                {i === 3 ? ' ' : ''}
                {l.ch}
              </span>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
