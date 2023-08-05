import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../errors'
import Classroom from '../models/Classroom'

export async function classroomMember(req: Request, res: Response, next: NextFunction) {
  const classroomID = req.params.id
  const classroom = await Classroom.findById(classroomID)
  if (!classroom) {
    return next(errorHandler(404, res, 'Classroom not found'))
  }
  const userID = res.locals.payload._id
  const isMember = classroom.teacher._id == userID || classroom.students.find((student) => student._id == userID)
  if (!isMember) {
    return next(
      errorHandler(
        403,
        res,
        'You are not a member of this classroom. Please join the classroom to access this resource',
      ),
    )
  }
  next()
}
