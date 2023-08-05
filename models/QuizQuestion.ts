import mongoose, { Schema } from 'mongoose'

export interface IQuestion {
  _id: string
  title: string
  answers: string[]
  createdAt: Date
  updatedAt: Date
  correctAnswer: string
  quiz_id: string
}

export interface ICreateQuestion {
  title: string
  answers: string[]
  correctAnswer: string
  quiz_id: string
}

export const questionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    answers: { type: Array, required: true, default: [] },
    quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz' },
    correctAnswer: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IQuestion>('Question', questionSchema)
