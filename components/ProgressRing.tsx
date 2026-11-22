export function ProgressRing({
  value,
  size = 64,
  stroke = 5,
  tone = 'ink',
  label,
  hideLabel = false,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: 'ink' | 'light';
  label?: string;
  hideLabel?: boolean;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const track = tone === 'ink' ? 'color-mix(in oklab, var(--c-ink) 10%, transparent)' : 'rgba(255,255,255,0.16)';
  const fill = tone === 'ink' ? 'var(--c-ink)' : '#FFFFFF';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={label ?? `${Math.round(pct)}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      {!hideLabel && <span
        className={`absolute inset-0 grid place-items-center font-mono-tabular font-medium ${tone === 'ink' ? 'text-ink' : 'text-white'}`}
        style={{ fontSize: Math.round(size * 0.24) }}
      >
        {Math.round(pct)}%
      </span>}
    </div>
  );
}
