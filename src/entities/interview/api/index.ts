import { FirebaseApi } from '@/shared/api'
import type { IInterview, IInterviewData, InterviewGetAllOptions } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { buildFirestoreConstraints } from '@/shared/api/firebase'

const COLLECTION_NAME = 'interviews'

function collectionPath(userId: string) {
  return `users/${userId}/${COLLECTION_NAME}`
}

export const api = {
  create: create,
  getAll: getAll,
  remove: remove,
} as const

function create(userId: string, interview: IInterviewData) {
  if (!userId) {
    throw new Error('userId is required to create interview')
  }

  const payload: IInterview = {
    id: uuidv4(),
    company: interview.company,
    vacancyLink: interview.vacancyLink,
    hrName: interview.hrName,
    contactTelegram: interview.contactTelegram,
    contactWhatsApp: interview.contactWhatsApp,
    contactPhone: interview.contactPhone,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return FirebaseApi.create(collectionPath(userId), payload, payload.id)
}

async function getAll(userId: string, options?: InterviewGetAllOptions): Promise<IInterview[]> {
  return FirebaseApi.getAll<IInterview>(collectionPath(userId), buildFirestoreConstraints(options))
}

function remove(userId: string, interviewId: string) {
  if (!userId) {
    throw new Error('userId is required to remove interview')
  }
  if (!interviewId) {
    throw new Error('interviewId is required to remove interview')
  }

  return FirebaseApi.remove(collectionPath(userId), interviewId)
}
