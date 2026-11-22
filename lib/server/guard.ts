import 'server-only';
import { NextResponse } from 'next/server';
import { verifyIdToken, type VerifiedUser } from './auth';
import { consume, type Limit } from './rate-limit';

export type RouteName = 'adapt' | 'decompose' | 'tutor' | 'mentor';

/**
 * Per-route budgets. Verified Google users get the most room, anonymous Firebase
 * users less, and token-less visitors (first-run preview) the least — keyed by IP.
 */
const LIMITS: Record<RouteName, Record<'user' | 'anon' | 'ip', Limit[]>> = {
  adapt: {
    user: [{ max: 6, windowSec: 60 }, { max: 40, windowSec: 86_400 }],
    anon: [{ max: 3, windowSec: 60 }, { max: 10, windowSec: 86_400 }],
    ip: [{ max: 2, windowSec: 60 }, { max: 6, windowSec: 86_400 }],
  },
  decompose: {
    user: [{ max: 8, windowSec: 60 }, { max: 60, windowSec: 86_400 }],
    anon: [{ max: 4, windowSec: 60 }, { max: 15, windowSec: 86_400 }],
    ip: [{ max: 3, windowSec: 60 }, { max: 8, windowSec: 86_400 }],
  },
  tutor: {
    user: [{ max: 15, windowSec: 60 }, { max: 200, windowSec: 86_400 }],
    anon: [{ max: 8, windowSec: 60 }, { max: 40, windowSec: 86_400 }],
    ip: [{ max: 5, windowSec: 60 }, { max: 20, windowSec: 86_400 }],
  },
  mentor: {
    user: [{ max: 15, windowSec: 60 }, { max: 200, windowSec: 86_400 }],
    anon: [{ max: 8, windowSec: 60 }, { max: 40, windowSec: 86_400 }],
    ip: [{ max: 5, windowSec: 60 }, { max: 20, windowSec: 86_400 }],
  },
};

/** Hard ceiling per IP across all routes, whatever the identity — stops token farming. */
const IP_CEILING: Limit[] = [{ max: 40, windowSec: 60 }, { max: 600, windowSec: 86_400 }];

const MAX_BODY_BYTES = 32 * 1024;
// Members-only by default; set REQUIRE_AUTH=0 only for local experiments.
const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== '0';

/**
 * Client IP. X-Forwarded-For is client-controllable at its start; the trustworthy
 * entry is the one appended by our own proxy. TRUSTED_PROXY_HOPS = number of
 * proxies in front of the app (Cloud Run direct: 1; behind Google LB: 2).
 */
export function clientIp(request: Request): string {
  const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS ?? 1));
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((p) => p.trim()).filter(Boolean);
    const ip = parts[Math.max(0, parts.length - hops)];
    if (ip) return ip.slice(0, 64);
  }
  return (request.headers.get('x-real-ip') ?? 'local').slice(0, 64);
}

export type GuardResult = { ok: true; user: VerifiedUser | null; ip: string } | { ok: false; response: NextResponse };

const fail = (status: number, error: string): GuardResult => ({ ok: false, response: NextResponse.json({ error }, { status }) });

export async function guard(request: Request, route: RouteName): Promise<GuardResult> {
  const len = Number(request.headers.get('content-length') ?? 0);
  if (len > MAX_BODY_BYTES) return fail(413, 'Request too large.');

  const ip = clientIp(request);
  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  const user = token ? await verifyIdToken(token) : null;

  if (token && !user) return fail(401, 'Session expired. Please sign in again.');
  if (!user && REQUIRE_AUTH) return fail(401, 'Sign in required.');

  const tier = user ? (user.anonymous ? 'anon' : 'user') : 'ip';
  const subject = user ? `u:${user.uid}` : `ip:${ip}`;

  const [ipOk, subjectOk] = await Promise.all([
    consume(`all:ip:${ip}`, IP_CEILING),
    consume(`${route}:${subject}`, LIMITS[route][tier]),
  ]);
  if (!ipOk || !subjectOk) {
    return fail(429, user ? 'Daily AI limit reached. Try again later.' : 'Limit reached. Sign in for a higher limit.');
  }
  return { ok: true, user, ip };
}

export class ClientError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
  }
}

/** Parses JSON with a hard size cap (content-length can be absent or wrong). */
export async function readJson(request: Request): Promise<unknown> {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new ClientError(413, 'Request too large.');
  try {
    return JSON.parse(text);
  } catch {
    throw new ClientError(400, 'Invalid JSON.');
  }
}

/** Never leak internal error text (keys, stack, upstream messages) to clients. */
export function serverError(route: RouteName, error: unknown): NextResponse {
  if (error instanceof ClientError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error(`[api:${route}]`, error);
  return NextResponse.json({ error: 'AI service is temporarily unavailable. Please try again.' }, { status: 503 });
}
