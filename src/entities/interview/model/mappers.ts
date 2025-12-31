import type { IInterview, InterviewStage } from './types'

type FirestoreTimestampLike = {
  toDate?: () => Date
  seconds?: number
  nanoseconds?: number
}

export function toDateOrNull(value: unknown): Date | null {
  if (value == null) return null
  if (value instanceof Date) return value

  if (typeof value === 'object') {
    const ts = value as FirestoreTimestampLike
    if (typeof ts.toDate === 'function') return ts.toDate()
    if (typeof ts.seconds === 'number') return new Date(ts.seconds * 1000)
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
  }

  return null
}

export function normalizeInterviewStage(stage: InterviewStage): InterviewStage {
  return {
    ...stage,
    date: toDateOrNull(stage.date),
  }
}

export function normalizeInterview(interview: IInterview): IInterview {
  return {
    ...interview,
    createdAt: toDateOrNull(interview.createdAt) ?? new Date(0),
    updatedAt: toDateOrNull(interview.updatedAt) ?? new Date(0),
    stages: interview.stages?.map(normalizeInterviewStage),
  }
}
