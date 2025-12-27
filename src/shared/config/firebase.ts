import type { FirebaseOptions } from 'firebase/app'

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
} = import.meta.env

const missing = [
  !VITE_API_KEY && 'VITE_API_KEY',
  !VITE_AUTH_DOMAIN && 'VITE_AUTH_DOMAIN',
  !VITE_PROJECT_ID && 'VITE_PROJECT_ID',
  !VITE_STORAGE_BUCKET && 'VITE_STORAGE_BUCKET',
  !VITE_MESSAGING_SENDER_ID && 'VITE_MESSAGING_SENDER_ID',
  !VITE_APP_ID && 'VITE_APP_ID',
].filter(Boolean)

if (missing.length > 0) {
  throw new Error(`Missing Firebase env vars: ${missing.join(', ')}`)
}

export const firebaseConfig: FirebaseOptions = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
}
