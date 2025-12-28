import {
  endAt as fbEndAt,
  endBefore as fbEndBefore,
  limit as fbLimit,
  orderBy as fbOrderBy,
  startAfter as fbStartAfter,
  startAt as fbStartAt,
  where as fbWhere,
  type QueryConstraint,
  type WhereFilterOp,
} from 'firebase/firestore'

export type FirestoreOrderDirection = 'asc' | 'desc'

export interface FirestoreOrderBy<TField extends string = string> {
  field: TField
  direction?: FirestoreOrderDirection
}

export interface FirestoreWhere<TField extends string = string> {
  field: TField
  op: string
  value: unknown
}

export interface FirestoreGetAllOptions<TField extends string = string> {
  where?: Array<FirestoreWhere<TField>>
  orderBy?: Array<FirestoreOrderBy<TField>>
  limit?: number
  startAt?: unknown | unknown[]
  startAfter?: unknown | unknown[]
  endAt?: unknown | unknown[]
  endBefore?: unknown | unknown[]
}

function normalizeValues(values: unknown | unknown[]) {
  return Array.isArray(values) ? values : [values]
}

export function buildFirestoreConstraints(options?: FirestoreGetAllOptions): QueryConstraint[] {
  if (!options) return []

  const constraints: QueryConstraint[] = []

  if (options.where?.length) {
    constraints.push(...options.where.map((w) => fbWhere(w.field, w.op as WhereFilterOp, w.value)))
  }

  if (options.orderBy?.length) {
    constraints.push(...options.orderBy.map((o) => fbOrderBy(o.field, o.direction)))
  }

  if (typeof options.limit === 'number') {
    constraints.push(fbLimit(options.limit))
  }

  if (options.startAt !== undefined) {
    constraints.push(fbStartAt(...normalizeValues(options.startAt)))
  }
  if (options.startAfter !== undefined) {
    constraints.push(fbStartAfter(...normalizeValues(options.startAfter)))
  }
  if (options.endAt !== undefined) {
    constraints.push(fbEndAt(...normalizeValues(options.endAt)))
  }
  if (options.endBefore !== undefined) {
    constraints.push(fbEndBefore(...normalizeValues(options.endBefore)))
  }

  return constraints
}
