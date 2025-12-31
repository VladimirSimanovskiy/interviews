import { FirebaseApi } from '@/shared/api'
import type { IInterview, IInterviewData, InterviewGetAllOptions } from '../model/types'
import { v4 as uuidv4 } from 'uuid'
import { buildFirestoreConstraints } from '@/shared/api/firebase'
import { normalizeInterview } from '../model'

const COLLECTION_NAME = 'interviews'

function collectionPath(userId: string) {
  return `users/${userId}/${COLLECTION_NAME}`
}

export const api = {
  create: create,
  getAll: getAll,
  getById: getById,
  remove: remove,
  update: update,
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
  const items = await FirebaseApi.getAll<IInterview>(
    collectionPath(userId),
    buildFirestoreConstraints(options)
  )
  return items.map(normalizeInterview)
}

async function getById(userId: string, interviewId: string): Promise<IInterview> {
  const item = await FirebaseApi.getById<IInterview>(collectionPath(userId), interviewId)
  return normalizeInterview(item)
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

function update(userId: string, interviewId: string, interview: IInterviewData) {
  if (!userId) {
    throw new Error('userId is required to update interview')
  }
  if (!interviewId) {
    throw new Error('interviewId is required to update interview')
  }

  return FirebaseApi.update(collectionPath(userId), interviewId, interview)
}
