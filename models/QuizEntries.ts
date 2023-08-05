import mongoose, { Schema } from 'mongoose'

export interface IQuizEntries {
  _id: string
  quiz_id: string
  student_id: string
  points: number
  createdAt: Date
  updatedAt: Date
}

export const quizEntriesSchema = new Schema(
  {
    quiz_id: { type: Schema.Types.ObjectId, required: true },
    student_id: { type: Schema.Types.ObjectId, required: true },
    points: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

export const QuizEntries = mongoose.model<IQuizEntries>('QuizEntries', quizEntriesSchema)
