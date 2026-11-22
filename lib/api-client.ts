'use client';

import { loadCloud } from './cloud';

/**
 * POST to our API routes with the Firebase ID token attached, so the server can
 * verify identity and apply per-user limits. Visitors without a session still work
 * (IP-limited first-run preview).
 */
export async function apiPost<T = Awaited<ReturnType<Response['json']>>>(path: string, body: unknown): Promise<{ ok: boolean; status: number; data: T }> {
  let token: string | null = null;
  try {
    token = await (await loadCloud()).getIdToken();
  } catch {
    token = null;
  }
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  let data: T;
  try {
    data = (await res.json()) as T;
  } catch {
    data = { error: 'Unexpected server response.' } as T;
  }
  return { ok: res.ok, status: res.status, data };
}
