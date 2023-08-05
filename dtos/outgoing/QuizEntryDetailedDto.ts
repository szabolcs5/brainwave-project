export class QuizEntryDetailedDto {
  _id: string

  quiz_id: string

  student_id: string

  points: number

  createdAt: Date

  constructor(quizEntryDetailed: QuizEntryDetailedDto) {
    this._id = quizEntryDetailed._id
    this.quiz_id = quizEntryDetailed.quiz_id
    this.student_id = quizEntryDetailed.student_id
    this.points = quizEntryDetailed.points
    this.createdAt = quizEntryDetailed.createdAt
  }
}
