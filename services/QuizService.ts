import mongoose from 'mongoose'
import { IPagination } from '../@types/request'
import Quiz from '../models/Quiz'
import { QuizEntries } from '../models/QuizEntries'
import QuizQuestion from '../models/QuizQuestion'
import { transformQuery } from '../utils/PaginationHelper'
import { QuizStatistics } from '../models/QuizStatistics'

const defaults: IPagination = {
  page: 1,
  limit: 10,
  filter: '',
  sort: '_id',
  order: 'desc',
  isApproved: false,
}

export const quizService = {
  findQuizById: async (quizID: string) => {
    return QuizQuestion.find({ quiz_id: new mongoose.Types.ObjectId(quizID) })
  },
  findAllQuiz: async (pageRequest: IPagination, classroomID: string) => {
    const filters = transformQuery(pageRequest, defaults)
    const query = {
      title: { $regex: filters.filter, $options: 'i' },
      classroom_id: classroomID,
    }
    const sort = {
      [filters.sort]: filters.order,
    }
    const [total, quizzes] = await Promise.all([
      Quiz.countDocuments(query),
      Quiz.find(query)
        .sort(sort)
        .skip((filters.page - 1) * filters.limit)
        .limit(filters.limit),
    ])
    return {
      quizzes,
      total,
    }
  },
  findAllEntries: async (pagination: IPagination, quizId: string, studentId: string) => {
    const filters = transformQuery(pagination, defaults)
    const query = {
      quiz_id: new mongoose.Types.ObjectId(quizId),
      student_id: new mongoose.Types.ObjectId(studentId),
    }
    const [total, quizEntries] = await Promise.all([
      QuizEntries.countDocuments(query),
      QuizEntries.find(query)
        .sort(filters.sort)
        .skip((filters.page - 1) * filters.limit)
        .limit(filters.limit),
    ])
    return {
      quizEntries,
      total,
    }
  },
  findStatisticsByQuizById: async (quizID: string) => {
    return QuizStatistics.findOne({ quiz_id: new mongoose.Types.ObjectId(quizID) })
  },
}
