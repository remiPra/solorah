import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let initialized = false;

function ensureInit() {
  if (!initialized && getApps().length === 0) {
    const serviceAccountJson = import.meta.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON env var');
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    initializeApp({ credential: cert(serviceAccount) });
    initialized = true;
  }
}

export function getAdminFirestore() {
  ensureInit();
  return getFirestore();
}
