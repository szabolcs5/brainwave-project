import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import { IBodyRequest } from '../@types/request'
import { ClassroomCreateDto } from '../dtos/incoming/ClassroomCreateDto'
import { QuizCreateDto } from '../dtos/incoming/QuizCreateDto'
import { ClassroomDetailedDto } from '../dtos/outgoing/ClassroomDetailedDto'
import { ClassroomReducedDto } from '../dtos/outgoing/ClassroomReducedDto'
import { QuizDetailedDto } from '../dtos/outgoing/QuizDetailedDto'
import { QuizQuestionReducedDto } from '../dtos/outgoing/QuizQuestionReducedDto'
import { errorHandler } from '../errors'
import { IClassroom } from '../models/Classroom'
import Quiz from '../models/Quiz'
import QuizQuestion from '../models/QuizQuestion'
import User from '../models/User'
import { classroomService } from '../services/ClassroomService'
import { quizService } from '../services/QuizService'
import { teacherService } from '../services/TeacherService'
import { userService } from '../services/UserService'
import { generateJoinCode } from '../utils/CodeGenerator'
import { Levels } from '../utils/Constants'
import { QuizStatisticsDetailedDto } from '../dtos/outgoing/QuizStatisticsDetailedDto'

async function createClassroom(req: IBodyRequest<ClassroomCreateDto>, res: Response, next: NextFunction) {
  try {
    const classroom = new ClassroomCreateDto(req.body)
    const errors = await validate(classroom)
    if (errors.length > 0) {
      return next(errorHandler(422, res, errors))
    }
    const teacherId = res.locals.payload._id
    const teacher = await User.findById(teacherId)
    const classroomLanguage = {
      level: classroom.level,
      language: classroom.language,
    }
    if (!teacher?.languages) return next(errorHandler(422, res, 'Teacher does not have any languages set'))

    if (teacherService.isTeacherEligible(teacher?.languages, classroomLanguage) == -1)
      return next(errorHandler(422, res, 'Teacher is not eligible to teach this language and level'))

    if (
      teacher?.classrooms.find(
        (teacherClass) =>
          teacherClass.language === classroomLanguage.language && teacherClass.level === classroomLanguage.level,
      )
    ) {
      return next(errorHandler(422, res, 'Teacher already has a classroom for this language and level'))
    }
    const joinCode = await generateJoinCode()
    const classroomToCreate = {
      level: classroom.level,
      language: classroom.language,
      description: classroom.description,
      teacher,
      name: `${classroom.language} - ${Object.keys(Levels)[classroom.level]}`,
      students: [],
      joinCode,
    }
    const createdClassroom = (await classroomService.save(classroomToCreate)) as IClassroom
    await userService.updateById(teacherId, {
      classrooms: [...teacher.classrooms, new ClassroomReducedDto(createdClassroom)],
    })
    return res.status(201).json({
      status: 201,
      classroom: new ClassroomDetailedDto(createdClassroom),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function createQuiz(req: IBodyRequest<QuizCreateDto>, res: Response, next: NextFunction) {
  try {
    const quiz = new QuizCreateDto(req.body)
    const errors = await validate(quiz)
    if (errors.length > 0) {
      return next(errorHandler(422, res, errors))
    }
    if (!isValidObjectId(req.params.id)) return next(errorHandler(400, res, 'Invalid classroom id'))
    const newQuiz = await Quiz.create({
      ...quiz,
      classroom_id: req.params.id,
    })
    await QuizQuestion.insertMany(quiz.questions.map((question) => ({ ...question, quiz_id: newQuiz._id })))
    const classroom = await classroomService.findById(req.params.id)
    const reducedQuiz = {
      _id: newQuiz._id,
      title: newQuiz.title,
      createdAt: newQuiz.createdAt,
      classroom_id: newQuiz.classroom_id,
    }
    if (!classroom) return next(errorHandler(404, res, 'Classroom not found'))
    await classroomService.updateById(req.params.id, {
      quizzes: [...classroom.quizzes, reducedQuiz],
    })
    return res.status(201).json({
      status: 201,
      quiz: new QuizDetailedDto(newQuiz),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getQuizzes(req: Request, res: Response, next: NextFunction) {
  try {
    const queryParams = {
      page: parseInt(req.query.page as string),
      limit: parseInt(req.query.limit as string),
      filter: req.query.filter as string,
      sort: req.query.sort as string,
      order: req.query.order as 'asc' | 'desc',
      isApproved: false,
    }
    const quizzesWithCount = await quizService.findAllQuiz(queryParams, req.params.id)
    const quizzes = quizzesWithCount.quizzes.map((quiz) => new QuizDetailedDto(quiz))
    return res.json({
      data: quizzes,
      total: quizzesWithCount.total,
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const quiz = await quizService.findQuizById(req.params.quizId)
    return res.json({
      data: quiz.map((question) => new QuizQuestionReducedDto(question)),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getEntries(req: Request, res: Response, next: NextFunction) {
  try {
    const queryParams = {
      page: parseInt(req.query.page as string),
      limit: parseInt(req.query.limit as string),
      filter: req.query.filter as string,
      sort: req.query.sort as string,
      order: req.query.order as 'asc' | 'desc',
      isApproved: false,
    }
    const quizzesWithCount = await quizService.findAllQuiz(queryParams, req.params.id)
    const quizzes = quizzesWithCount.quizzes.map((quiz) => new QuizDetailedDto(quiz))
    return res.json({
      data: quizzes,
      total: quizzesWithCount.total,
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function lockClassroom(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return next(errorHandler(400, res, 'Invalid classroom id'))

    let classroom = await classroomService.findById(id)
    if (!classroom) return next(errorHandler(404, res, 'Classroom not found'))

    const teacherId = res.locals.payload._id
    if (classroom.teacher._id.toString() !== teacherId)
      return next(errorHandler(403, res, 'This classroom is not yours'))

    if (classroom.isLocked) return next(errorHandler(400, res, 'This classroom is already locked.'))

    classroom = await classroomService.updateById(id, { isLocked: true })
    if (!classroom) return next(errorHandler(404, res, 'Classroom not found'))

    await User.findOneAndUpdate(
      { _id: teacherId, classrooms: { $elemMatch: { $eq: id } } },
      { $set: { 'classrooms.$.isLocked': true } },
    )

    return res.json({
      status: 200,
      classroom: new ClassroomDetailedDto(classroom),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

async function getQuizStatistics(req: Request, res: Response, next: NextFunction) {
  try {
    const statistics = await quizService.findStatisticsByQuizById(req.params.quizId)

    if (!statistics) {
      return next(errorHandler(404, res, 'There are no statistics for this quiz, yet.'))
    }

    return res.json({
      data: new QuizStatisticsDetailedDto(statistics),
    })
  } catch (error) {
    return next(errorHandler(500, res))
  }
}

export const teacherController = {
  createClassroom,
  createQuiz,
  getQuizzes,
  getQuiz,
  getEntries,
  getQuizStatistics,
  lockClassroom,
}
