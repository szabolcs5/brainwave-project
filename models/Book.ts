import { Schema } from 'mongoose'

export interface IBook {
  title: string
  author: string
  percentage: number
}

export const bookSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: false },
  title: { type: String, required: true },
  author: { type: String, required: true },
  percentage: { type: Number, required: true },
})
