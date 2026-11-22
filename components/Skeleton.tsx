export function SkeletonLines({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4 py-2" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="space-y-2.5">
          <div className="h-3 w-24 rounded-none bg-ink/[0.06] animate-pulse" />
          <div className="h-5 rounded-none bg-ink/[0.07] animate-pulse" style={{ width: `${72 - i * 12}%` }} />
        </div>
      ))}
    </div>
  );
}
