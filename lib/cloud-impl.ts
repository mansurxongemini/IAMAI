'use client';

import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';

export { signInWithGoogle, signOutAccount } from './firebase';
export * from './firestore-repo';

export const watchAuth = (cb: (user: User | null) => void): (() => void) => onAuthStateChanged(auth, cb);

/** Fresh Firebase ID token for the signed-in user, or null for local-only visitors. */
export const getIdToken = async (): Promise<string | null> => (auth.currentUser ? auth.currentUser.getIdToken() : null);
