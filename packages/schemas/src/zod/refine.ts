import type { RefinementCtx } from 'zod'
import type {
  DateType,
  EndDateType,
} from './common.schema'

export function refineDate<
  T extends { startDate: DateType, endDate: EndDateType },
  P extends RefinementCtx<T>,
>(data: T, ctx: P) {
  // if endDate is not 'false', startDate and endDate shouold be the same type
  if (data.endDate !== false && typeof data.startDate !== typeof data.endDate) {
    ctx.addIssue({
      code: 'custom',
      message: 'End date should be the same type as start date or false',
      path: ['endDate'],
    })
  }
  // endDate should be greater than or equal to startDate
  else if (typeof data.startDate === 'object' && typeof data.endDate === 'object') {
    if ((data.startDate.day && !data.endDate.day) || (data.endDate.day && !data.startDate.day)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Start date and end date should both be complete dates or both be partial dates',
        path: ['endDate'],
      })
    }
    const [s, e] = [data.startDate, data.endDate]
    Object.keys(e).forEach((key) => {
      const k = key as keyof typeof e
      if (s[k] && e[k] && s[k] > e[k]) {
        ctx.addIssue({
          code: 'custom',
          message: 'End date should be greater than or equal to start date',
          path: ['endDate'],
        })
      }
    })
  }
  else if (typeof data.startDate === 'string' && typeof data.endDate === 'string') {
    if (data.startDate > data.endDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date should be greater than or equal to start date',
        path: ['endDate'],
      })
    }
  }
}

export function refineIssExpDate<
  T extends { issueDate: DateType, expDate: EndDateType },
  P extends RefinementCtx<T>,
>(data: T, ctx: P) {
  // if endDate is not 'false', startDate and endDate shouold be the same type
  if (data.expDate !== false && typeof data.issueDate !== typeof data.expDate) {
    ctx.addIssue({
      code: 'custom',
      message: 'End date should be the same type as start date or false',
      path: ['endDate'],
    })
  }
  // endDate should be greater than or equal to startDate
  else if (typeof data.issueDate === 'object' && typeof data.expDate === 'object') {
    if ((data.issueDate.day && !data.expDate.day) || (data.expDate.day && !data.issueDate.day)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Start date and end date should both be complete dates or both be partial dates',
        path: ['endDate'],
      })
    }
    const [s, e] = [data.issueDate, data.expDate]
    Object.keys(e).forEach((key) => {
      const k = key as keyof typeof e
      if (s[k] && e[k] && s[k] > e[k]) {
        ctx.addIssue({
          code: 'custom',
          message: 'End date should be greater than or equal to start date',
          path: ['endDate'],
        })
      }
    })
  }
  else if (typeof data.issueDate === 'string' && typeof data.expDate === 'string') {
    if (data.issueDate > data.expDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date should be greater than or equal to start date',
        path: ['endDate'],
      })
    }
  }
}

export function refineDateDependentRequired<
  T extends { startDate?: DateType, endDate?: EndDateType },
  P extends RefinementCtx<T>,
>(data: T, ctx: P) {
  if (data.startDate === undefined && data.endDate === undefined) { /* empty */ }
  // startDate and endDate should be dependent required
  else if (data.startDate !== undefined && data.endDate === undefined) {
    ctx.addIssue({
      code: 'custom',
      message: 'End date is required if start date is provided',
      path: ['endDate'],
    })
  }
  else if (data.startDate === undefined && data.endDate !== undefined) {
    ctx.addIssue({
      code: 'custom',
      message: 'Start date is required if end date is provided',
      path: ['startDate'],
    })
  }
  else {
    const newDate = data as { startDate: DateType, endDate: EndDateType }
    const newCtx = ctx as RefinementCtx<typeof newDate>
    refineDate(newDate, newCtx)
  }
}
