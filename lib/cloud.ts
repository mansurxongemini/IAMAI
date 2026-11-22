'use client';

/**
 * Firebase (app + auth + firestore) is ~half of the client JS. It is loaded lazily,
 * after first paint, so every page renders instantly from the local cache.
 */
export type Cloud = typeof import('./cloud-impl');

let pending: Promise<Cloud> | null = null;
export const loadCloud = (): Promise<Cloud> => (pending ??= import('./cloud-impl'));
