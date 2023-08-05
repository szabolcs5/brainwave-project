import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../errors'
import { Roles } from '../utils/Constants'

export function checkIfUserIsAdmin(req: Request, res: Response, next: NextFunction) {
  const role = res.locals.payload.role
  if (role !== Roles.Admin) {
    return errorHandler(403, res, 'You are not an admin')
  }

  next()
}
