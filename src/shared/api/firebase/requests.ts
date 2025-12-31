import {
  getFirestore,
  setDoc,
  doc,
  type WithFieldValue,
  type DocumentData,
  getDocs,
  collection,
  query,
  QueryConstraint,
  deleteDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

import { firebaseApp } from './app'

const db = getFirestore(firebaseApp)

export function create(path: string, data: WithFieldValue<DocumentData>, id: string) {
  const docRef = doc(db, path, id)
  return setDoc(docRef, data)
}

export async function getAll<T>(path: string, constraints: QueryConstraint[]): Promise<T[]> {
  const fbQuery = query(collection(db, path), ...constraints)
  const querySnapshot = await getDocs(fbQuery)
  return querySnapshot.docs.map((doc) => doc.data() as T)
}

export async function getById<T>(path: string, id: string): Promise<T> {
  const docRef = doc(db, path, id)
  const docSnapshot = await getDoc(docRef)
  if (!docSnapshot.exists()) {
    throw new Error(`Document ${id} not found in ${path}`)
  }
  return docSnapshot.data() as T
}

export function remove(path: string, id: string) {
  const docRef = doc(db, path, id)
  return deleteDoc(docRef)
}

export function update(path: string, id: string, data: WithFieldValue<DocumentData>) {
  const docRef = doc(db, path, id)
  return updateDoc(docRef, data)
}
