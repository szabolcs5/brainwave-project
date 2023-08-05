import mongoose, { Document, Schema } from 'mongoose'
import { Levels } from '../utils/Constants'

export interface ILanguage extends Document {
  name: string
  description: string
  abbreviation: string
}

const languageSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  abbreviation: { type: String, required: true },
})

export interface ILanguageLevel {
  language: string
  level: Levels
  createdAt?: Date
  updatedAt?: Date
}

export const languageLevelSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: false },
    language: { type: String, required: true },
    level: {
      type: Number,
      enum: Object.values(Levels),
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<ILanguage>('Language', languageSchema)
