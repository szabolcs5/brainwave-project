import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export interface IBodyRequest<T> extends Request {
  body: T
}

export interface IQueryRequest extends Request<ParamsDictionary, unknown, unknown, IncomingQuery> {
  query: IncomingQuery
}

export interface IncomingQuery {
  page: string
  limit: string
  filter: string
  sort: string
  order: string
  isApproved: string
}

export interface IPagination {
  page: number
  limit: number
  filter: string
  sort: string
  order: 'asc' | 'desc'
  isApproved: boolean
}
