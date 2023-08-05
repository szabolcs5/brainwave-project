import { IQuiz } from '../../models/Quiz'

export class QuizDetailedDto {
  _id: string

  title: string

  createdAt: Date

  updatedAt: Date

  classroom_id: string

  constructor(quizDetailedDto: IQuiz) {
    this._id = quizDetailedDto._id
    this.title = quizDetailedDto.title
    this.createdAt = quizDetailedDto.createdAt
    this.updatedAt = quizDetailedDto.updatedAt
    this.classroom_id = quizDetailedDto.classroom_id
  }
}
