import { FirebaseApi } from '@/shared/api'
import type { IInterview, IInterviewData } from '../model/types'
import { v4 as uuidv4 } from 'uuid'

const COLLECTION_NAME = 'interviews'

function collectionPath(userId: string) {
  return `users/${userId}/${COLLECTION_NAME}`
}

export const api = {
  create: create,
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
