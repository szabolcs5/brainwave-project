import { NextFunction, Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { errorHandler } from '../errors'
import { quizService } from '../services/QuizService'

export async function quizExists(req: Request, res: Response, next: NextFunction) {
  try {
    if (!isValidObjectId(req.params.quizId)) return next(errorHandler(404, res, 'Quiz not found'))
    const quiz = await quizService.findQuizById(req.params.quizId)
    if (!quiz) return next(errorHandler(404, res, 'Quiz not found'))
    return next()
  } catch (e) {
    return next(errorHandler(500, res))
  }
}
