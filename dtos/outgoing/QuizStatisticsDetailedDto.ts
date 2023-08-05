import { IQuizStatistics } from '../../models/QuizStatistics'

export class QuizStatisticsDetailedDto {
  quiz_id: string

  total_entries: number

  points_sum: number

  avg_point: number

  max_point: number

  min_point: number

  constructor(quizStatistics: IQuizStatistics) {
    this.quiz_id = quizStatistics._id
    this.total_entries = quizStatistics.total_entries
    this.points_sum = quizStatistics.points_sum
    this.avg_point = quizStatistics.avg_point
    this.max_point = quizStatistics.max_point
    this.min_point = quizStatistics.min_point
  }
}
