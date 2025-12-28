import {
  getFirestore,
  setDoc,
  doc,
  type WithFieldValue,
  type DocumentData,
} from 'firebase/firestore'

import { firebaseApp } from './app'

const db = getFirestore(firebaseApp)

export function create(path: string, data: WithFieldValue<DocumentData>, id: string) {
  const docRef = doc(db, path, id)
  return setDoc(docRef, data)
}
