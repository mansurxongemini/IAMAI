'use client';

import { loadCloud } from './cloud';

/** Error code the API routes send when the AI model could not answer. */
export const AI_UNAVAILABLE = 'ai_unavailable';

/** Text for a failed AI call: the localized "connection to the AI model was lost" for AI failures, else the server's message. */
export function apiErrorText(data: unknown, aiUnavailable: string, fallback: string): string {
  const d = (data ?? {}) as { code?: unknown; error?: unknown };
  if (d.code === AI_UNAVAILABLE) return aiUnavailable;
  return typeof d.error === 'string' && d.error ? d.error : fallback;
}

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
  let res: Response;
  try {
    res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch {
    // No answer at all: to the learner this is the same as losing the AI model.
    return { ok: false, status: 0, data: { code: AI_UNAVAILABLE } as T };
  }
  let data: T;
  try {
    data = (await res.json()) as T;
  } catch {
    data = { error: 'Unexpected server response.' } as T;
  }
  return { ok: res.ok, status: res.status, data };
}
