import { IQuestion } from '../../models/QuizQuestion'

export class QuizQuestionReducedDto {
  _id: string

  title: string

  answers: string[]

  constructor(quizQuestion: IQuestion) {
    this._id = quizQuestion._id
    this.title = quizQuestion.title
    this.answers = quizQuestion.answers
  }
}
