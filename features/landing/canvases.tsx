'use client';

/*
  Generated plates for the landing page — all canvas, no images. The tilled-field strokes
  behind the hero, a seeded study plate for each card and the plan slip, and the contour field
  of the phases band. Animated loops size to the device pixel ratio, idle off-screen and draw
  one still frame under prefers-reduced-motion; plates draw once and redraw only on resize.
*/

import { useEffect, useRef, type RefObject } from 'react';

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

const INDIGO = '99,102,241';
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useCanvas(ref: RefObject<HTMLCanvasElement | null>, draw: Draw, animate: boolean) {
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    const start = performance.now();
    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const frame = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      drawRef.current(ctx, w, h, (now - start) / 1000 + 8);
      if (animate && visible && !reduced()) raf = requestAnimationFrame(frame);
    };
    size();
    frame(start);
    const ro = new ResizeObserver(() => {
      size();
      frame(performance.now());
    });
    ro.observe(canvas);
    let io: IntersectionObserver | undefined;
    if (animate) {
      io = new IntersectionObserver(([e]) => {
        visible = Boolean(e?.isIntersecting);
        cancelAnimationFrame(raf);
        if (visible && !reduced()) raf = requestAnimationFrame(frame);
      });
      io.observe(canvas);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
    };
  }, [ref, animate]);
}

/* ---------------- Hero: a tilled field seen from above ---------------- */

const drawSoil: Draw = (ctx, w, h, t) => {
  const step = w < 600 ? 22 : 28;
  const cols = Math.ceil(w / step) + 1;
  const rows = Math.ceil(h / step) + 1;
  ctx.lineCap = 'square';
  ctx.lineWidth = 1.5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const a = 0.05 + 0.14 * (0.5 + 0.5 * Math.sin(t * 0.7 + i * 0.37 + r * 0.21));
      const ang = -0.35 + 0.28 * Math.sin(t * 0.45 + c * 0.19 + r * 0.31);
      const drift = 3 * Math.sin(t * 0.5 + i * 0.11);
      const x = c * step + drift;
      const y = r * step + 2 * Math.cos(t * 0.4 + i * 0.07);
      const len = 6 + 4 * (0.5 + 0.5 * Math.sin(i * 1.7));
      ctx.strokeStyle = `rgba(${INDIGO},${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(x - Math.cos(ang) * len * 0.5, y - Math.sin(ang) * len * 0.5);
      ctx.lineTo(x + Math.cos(ang) * len * 0.5, y + Math.sin(ang) * len * 0.5);
      ctx.stroke();
    }
  }
};

export function SoilCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref, drawSoil, true);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ---------------- Plates: seeded, flat, drawn once ---------------- */

export type PlateKind = 'rings' | 'stems' | 'grid' | 'waves' | 'blocks' | 'arcs';

function rand(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function drawPlate(ctx: CanvasRenderingContext2D, w: number, h: number, kind: PlateKind, seed: number, ink: string) {
  const rnd = rand(seed);
  const line = (a: number) => `rgba(${ink},${a})`;
  const mark = `rgb(${INDIGO})`;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = line(0.16);
  ctx.strokeRect(0.75, 0.75, w - 1.5, h - 1.5);
  const pad = Math.round(w * 0.1);
  const iw = w - pad * 2;
  const ih = h - pad * 2;

  if (kind === 'rings') {
    const cx = w / 2;
    const cy = h * 0.46;
    const R = Math.min(iw, ih) * 0.46;
    for (let i = 1; i <= 9; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (R * i) / 9, 0, Math.PI * 2);
      ctx.strokeStyle = i === 6 ? mark : line(0.12 + i * 0.03);
      ctx.lineWidth = i === 6 ? 3 : 1.25;
      ctx.stroke();
    }
    ctx.fillStyle = mark;
    ctx.fillRect(cx - 3, cy - 3, 6, 6);
  } else if (kind === 'stems') {
    const n = 11;
    for (let i = 0; i < n; i++) {
      const x = pad + (iw * (i + 0.5)) / n;
      const hh = ih * (0.25 + 0.7 * rnd());
      ctx.strokeStyle = line(0.5);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, pad + ih);
      ctx.lineTo(x, pad + ih - hh);
      ctx.stroke();
      ctx.fillStyle = i === 7 ? mark : line(0.7);
      ctx.beginPath();
      ctx.ellipse(x, pad + ih - hh, 4, 7, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = line(0.3);
    ctx.beginPath();
    ctx.moveTo(pad, pad + ih + 0.5);
    ctx.lineTo(pad + iw, pad + ih + 0.5);
    ctx.stroke();
  } else if (kind === 'grid') {
    const cols = 7;
    const rows = 9;
    const cw = iw / cols;
    const rh = ih / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = rnd();
        const x = pad + c * cw + 3;
        const y = pad + r * rh + 3;
        if (r === 5 && c >= 2 && c <= 4) {
          ctx.fillStyle = mark;
          ctx.fillRect(x, y, cw - 6, rh - 6);
        } else if (v > 0.45) {
          ctx.fillStyle = line(0.12 + v * 0.3);
          ctx.fillRect(x, y, cw - 6, rh - 6);
        } else {
          ctx.strokeStyle = line(0.18);
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cw - 7, rh - 7);
        }
      }
    }
  } else if (kind === 'waves') {
    for (let i = 0; i < 14; i++) {
      const y0 = pad + (ih * i) / 13;
      ctx.beginPath();
      for (let x = pad; x <= pad + iw; x += 3) {
        const u = (x - pad) / iw;
        const y = y0 + Math.sin(u * Math.PI * 2 + i * 0.5 + seed) * 6 * Math.sin(u * Math.PI);
        if (x === pad) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = i === 9 ? mark : line(0.2 + (i % 3) * 0.12);
      ctx.lineWidth = i === 9 ? 2.5 : 1.25;
      ctx.stroke();
    }
  } else if (kind === 'blocks') {
    let y = pad;
    let i = 0;
    while (y < pad + ih - 8) {
      const bh = 10 + rnd() * 22;
      const bw = iw * (0.3 + rnd() * 0.7);
      ctx.fillStyle = i === 4 ? mark : line(0.14 + rnd() * 0.4);
      ctx.fillRect(pad, y, bw, Math.min(bh, pad + ih - y));
      y += bh + 6;
      i++;
    }
  } else {
    const cx = pad;
    const cy = pad + ih;
    for (let i = 1; i <= 12; i++) {
      const r = (Math.max(iw, ih) * i) / 12;
      ctx.beginPath();
      ctx.arc(cx, cy, r, -Math.PI / 2, 0);
      ctx.strokeStyle = i === 8 ? mark : line(0.14 + (i % 4) * 0.1);
      ctx.lineWidth = i === 8 ? 3 : 1.25;
      ctx.stroke();
    }
  }
}

/** A flat generated plate. `tone` picks ink for a dark card or for the paper slip. */
export function PlateCanvas({ kind, seed, tone = 'dark', className }: { kind: PlateKind; seed: number; tone?: 'dark' | 'paper'; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const ink = tone === 'paper' ? '10,10,10' : '250,250,250';
  useCanvas(ref, (ctx, w, h) => drawPlate(ctx, w, h, kind, seed, ink), false);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ---------------- Phases band: a drifting contour field ---------------- */

const drawContours: Draw = (ctx, w, h, t) => {
  const n = 22;
  for (let i = 0; i < n; i++) {
    const y0 = (h * (i + 1)) / (n + 1);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const u = x / w;
      const y =
        y0 +
        Math.sin(u * 6.2 + t * 0.32 + i * 0.42) * (10 + i * 0.6) +
        Math.sin(u * 1.9 - t * 0.11 + i * 0.17) * 26;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    const fifth = i % 5 === 4;
    ctx.strokeStyle = fifth ? `rgba(${INDIGO},0.85)` : 'rgba(250,250,250,0.13)';
    ctx.lineWidth = fifth ? 1.75 : 1;
    ctx.stroke();
  }
};

export function ContourCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref, drawContours, true);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
