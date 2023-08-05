import mongoose, { Schema } from 'mongoose'
import { IReducedUser, reducedUserSchema } from './User'

export interface IFeedback {
  _id: string
  title: string
  text: string
  from: IReducedUser
  rate: number
  createdAt: Date
  updatedAt: Date
}

export interface ICreateFeedback {
  title: string
  text: string
  from: IReducedUser
  rate: number
}

export const feedbackSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    from: reducedUserSchema,
    rate: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IFeedback>('Feedback', feedbackSchema)
