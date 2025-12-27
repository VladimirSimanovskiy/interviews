import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

import { firebaseConfig } from '@/shared/config/firebase'

export function initFirebase(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig)
}

export const firebaseApp = initFirebase()
export const auth: Auth = getAuth(firebaseApp)
