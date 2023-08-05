import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { IQuizMessage } from '../@types/kafka'
import { IBodyRequest } from '../@types/request'
import { QuizAnswerDto } from '../dtos/incoming/QuizAnswerDto'
import { ClassroomReducedDto } from '../dtos/outgoing/ClassroomReducedDto'
import { QuizEntryDetailedDto } from '../dtos/outgoing/QuizEntryDetailedDto'
import { UserReducedDto } from '../dtos/outgoing/UserReducedDto'
import { errorHandler } from '../errors'
import { publishMessage } from '../kafka/kafka'
import { classroomService } from '../services/ClassroomService'
import { quizService } from '../services/QuizService'
import { userService } from '../services/UserService'

async function joinClassroom(req: Request, res: Response, next: NextFunction) {
  try {
    const { code } = req.params
    const classroom = await classroomService.findByCode(code)
    if (!classroom) {
      return next(errorHandler(404, res, 'Classroom not found.'))
    }
    if (classroom.isLocked) {
      return next(errorHandler(403, res, 'Classroom is locked due to high number of members.'))
    }

    const userId = res.locals.payload._id
    const user = await userService.findById(userId)
    if (!user) {
      return next(errorHandler(404, res, 'User not found'))
    }
    if (user.classrooms.find((userClassroom) => userClassroom._id === classroom._id)) {
      return next(errorHandler(403, res, 'User already joined this classroom.'))
    }
    const [newUser] = await Promise.all([
      userService.updateById(userId, { classrooms: [...user.classrooms, new ClassroomReducedDto(classroom)] }),
      classroomService.updateById(classroom._id, { students: [...classroom.students, user] }),
    ])
    if (!newUser) {
      return next(errorHandler(500, res))
    }
    return res.json(new UserReducedDto(newUser))
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function submitQuiz(req: IBodyRequest<QuizAnswerDto>, res: Response, next: NextFunction) {
  try {
    const { quizId } = req.params
    const errors = await validate(new QuizAnswerDto(req.body))
    if (errors.length > 0) {
      return next(errorHandler(422, res, errors))
    }
    const messageToSend: IQuizMessage = {
      quizId,
      studentId: res.locals.payload._id,
      answers: req.body.answers,
    }
    publishMessage(messageToSend)

    return res.status(201).json({
      message: 'Quiz submitted successfully. It will take some time for your quiz to be graded.',
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getQuizEntries(req: Request, res: Response, next: NextFunction) {
  try {
    const queryParams = {
      page: parseInt(req.query.page as string),
      limit: parseInt(req.query.limit as string),
      filter: req.query.filter as string,
      sort: req.query.sort as string,
      order: req.query.order as 'asc' | 'desc',
      isApproved: false,
    }
    const entriesWithCount = await quizService.findAllEntries(queryParams, req.params.quizId, res.locals.payload._id)
    const quizEntries = entriesWithCount.quizEntries.map((entry) => new QuizEntryDetailedDto(entry))
    return res.json({
      data: quizEntries,
      total: entriesWithCount.total,
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export default {
  joinClassroom,
  submitQuiz,
  getQuizEntries,
}
