import { Schema } from 'mongoose'

export interface ISeries {
  title: string
  percentage: number
}

export const seriesSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: false },
  title: { type: String, required: true },
  percentage: { type: Number, required: true },
})
