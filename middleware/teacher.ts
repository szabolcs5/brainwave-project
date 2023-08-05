import { NextFunction, Request, Response } from 'express-serve-static-core'
import { errorHandler } from '../errors'
import User from '../models/User'
import { Roles } from '../utils/Constants'

export async function checkIfUserIsTeacher(req: Request, res: Response, next: NextFunction) {
  const role = res.locals.payload.role
  if (role !== Roles.Teacher) {
    return errorHandler(403, res, 'You are not a teacher.')
  }

  next()
}

export async function checkIfUserIsConfirmedTeacher(req: Request, res: Response, next: NextFunction) {
  const role = res.locals.payload.role
  const userId = res.locals.payload._id
  const teacher = await User.findById(userId)
  if (role !== Roles.Teacher || !teacher?.confirmed_at) {
    return errorHandler(403, res, 'You are not a confirmed teacher.')
  }
  next()
}
