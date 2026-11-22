import 'server-only';

/**
 * Fixed-window rate limiter.
 * - Production (multiple instances): Upstash Redis over REST when
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are set — shared across instances.
 * - Local / single instance: in-memory fallback.
 */
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const memory = new Map<string, { count: number; resetAt: number }>();
let lastSweep = 0;

function memoryHit(key: string, windowSec: number): number {
  const now = Date.now();
  if (now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
  }
  const b = memory.get(key);
  if (!b || b.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return 1;
  }
  b.count += 1;
  return b.count;
}

async function redisHit(key: string, windowSec: number): Promise<number> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, String(windowSec), 'NX'],
    ]),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`rate-limit store ${res.status}`);
  const data = (await res.json()) as Array<{ result?: number }>;
  return Number(data[0]?.result ?? 0);
}

export interface Limit {
  max: number;
  windowSec: number;
}

/** Returns true if every limit still has room. Counts the request against all of them. */
export async function consume(key: string, limits: Limit[]): Promise<boolean> {
  const counts = await Promise.all(
    limits.map(async (l) => {
      const bucket = `rl:${key}:${l.windowSec}:${Math.floor(Date.now() / 1000 / l.windowSec)}`;
      if (REDIS_URL && REDIS_TOKEN) {
        try {
          return await redisHit(bucket, l.windowSec);
        } catch (err) {
          console.error('[rate-limit] Redis unavailable, using memory fallback', err);
        }
      }
      return memoryHit(bucket, l.windowSec);
    })
  );
  return counts.every((c, i) => c <= (limits[i]?.max ?? 0));
}
