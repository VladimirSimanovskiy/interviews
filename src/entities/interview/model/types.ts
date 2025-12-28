export interface IInterview {
  id: string
  company: string
  vacancyLink: string
  hrName: string
  contactTelegram?: string
  contactWhatsApp?: string
  contactPhone?: string
  createdAt: Date
  updatedAt: Date
}

export type IInterviewData = Omit<IInterview, 'id' | 'createdAt' | 'updatedAt'>

export type InterviewOrderDirection = 'asc' | 'desc'

export type InterviewWhereOp =
  | '=='
  | '!='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'in'
  | 'not-in'
  | 'array-contains'
  | 'array-contains-any'

export interface InterviewOrderBy<TField extends string = string> {
  field: TField
  direction?: InterviewOrderDirection
}

export interface InterviewWhere<TField extends string = string> {
  field: TField
  op: InterviewWhereOp
  value: unknown
}

export interface InterviewGetAllOptions<TField extends string = string> {
  where?: Array<InterviewWhere<TField>>
  orderBy?: Array<InterviewOrderBy<TField>>
  limit?: number
  startAt?: unknown | unknown[]
  startAfter?: unknown | unknown[]
  endAt?: unknown | unknown[]
  endBefore?: unknown | unknown[]
}
