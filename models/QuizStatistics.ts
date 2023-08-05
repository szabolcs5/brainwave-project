import mongoose, { Schema } from 'mongoose'

export interface IQuizStatistics {
  _id: string
  quiz_id: string
  total_entries: number
  points_sum: number
  avg_point: number
  max_point: number
  min_point: number
}

export const statisticsSchema: Schema = new Schema(
  {
    quiz_id: { type: Schema.Types.ObjectId, required: true },
    total_entries: { type: Number, required: true },
    points_sum: { type: Number, required: true },
    avg_point: { type: Number, required: true },
    max_point: { type: Number, required: true },
    min_point: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

export const QuizStatistics = mongoose.model<IQuizStatistics>('QuizStatistics', statisticsSchema)
