import { IPagination } from '../@types/request'

type MaybeValue = string | number | boolean | undefined

type ValidateQuery = {
  [key in keyof IPagination]: (value: MaybeValue) => boolean
}

type PaginationKey = keyof IPagination

const validateQuery: ValidateQuery = {
  page: (value) => !!value && Number(value) > 0,
  limit: (limit) => !!limit && Number(limit) > 0,
  filter: (filter) => !!filter && String(filter).length > 0,
  sort: (sort) => !!sort && String(sort).length > 0,
  order: (order) => !!order && ['asc', 'desc'].includes(String(order)),
  isApproved: (isApproved) => isApproved !== undefined,
}

function isValidQueryValue(key: PaginationKey, value: MaybeValue): value is IPagination[PaginationKey] {
  return validateQuery[key](value)
}

export function transformQuery(query: IPagination, defaults: IPagination) {
  let transformedQuery: IPagination = { ...defaults }
  Object.keys(query).forEach((key) => {
    const paginationKey = key as PaginationKey

    if (isValidQueryValue(paginationKey, query[paginationKey])) {
      transformedQuery = {
        ...transformedQuery,
        [paginationKey]: query[paginationKey],
      }
    }
  })
  return transformedQuery
}
