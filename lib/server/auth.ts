import 'server-only';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import firebaseConfig from '@/firebase-applet-config.json';

/**
 * Verifies Firebase Auth ID tokens without the Admin SDK or service-account
 * credentials: signature against Google's public JWKS, plus issuer/audience/expiry.
 */
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'),
  { cooldownDuration: 30_000, cacheMaxAge: 6 * 60 * 60 * 1000 }
);

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId;

export interface VerifiedUser {
  uid: string;
  anonymous: boolean;
}

export async function verifyIdToken(token: string): Promise<VerifiedUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${PROJECT_ID}`,
      audience: PROJECT_ID,
      algorithms: ['RS256'],
      clockTolerance: 30,
    });
    const uid = typeof payload.sub === 'string' ? payload.sub : '';
    if (!uid || uid.length > 128) return null;
    const firebase = payload.firebase as { sign_in_provider?: string } | undefined;
    return { uid, anonymous: firebase?.sign_in_provider === 'anonymous' };
  } catch {
    return null;
  }
}
