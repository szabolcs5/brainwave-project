import { NextFunction, Request, Response } from 'express-serve-static-core'
import { errorHandler } from '../errors'
import { Roles } from '../utils/Constants'

export async function checkIfUserIsStudent(req: Request, res: Response, next: NextFunction) {
  const role = res.locals.payload.role
  if (role !== Roles.Student) {
    return errorHandler(403, res, 'You are not a student')
  }

  next()
}
