import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/shared/api/firebase'
import { useUserStore } from './store'

let readyPromise: Promise<void> | null = null

export function startUserSession(): Promise<void> {
  if (readyPromise) return readyPromise

  const userStore = useUserStore()

  readyPromise = new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      userStore.userId = user?.uid ?? ''

      if (!userStore.isSessionReady) {
        userStore.isSessionReady = true
        resolve()
      }
    })
  })

  return readyPromise
}

export function ensureUserSessionReady(): Promise<void> {
  return readyPromise ?? startUserSession()
}
