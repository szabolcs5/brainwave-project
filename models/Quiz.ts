import mongoose, { Schema } from 'mongoose'

export interface IQuiz {
  _id: string
  title: string
  createdAt: Date
  updatedAt: Date
  classroom_id: string
}

export interface IReducedQuiz {
  _id: string
  title: string
  createdAt: Date
  classroom_id: string
}

export const quizSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    classroom_id: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
)

export const reducedQuizSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: false },
  title: { type: String, required: true },
  createdAt: { type: Date, required: true },
  classroom_id: { type: Schema.Types.ObjectId, required: true },
})

export default mongoose.model<IQuiz>('Quiz', quizSchema)
