import mongoose, { Document, Schema } from 'mongoose'
import { ClassroomReducedDto } from '../dtos/outgoing/ClassroomReducedDto'
import { IBook, bookSchema } from './Book'
import { ILanguageLevel, languageLevelSchema } from './Language'
import { ISeries, seriesSchema } from './Series'

export interface IUser extends Document {
  _id: string
  firstname: string
  lastname: string
  nickname: string
  email: string
  password: string
  description: string
  avatar: string
  languages: ILanguageLevel[]
  role: number
  confirmed_at: Date | null
  isApproved: boolean
  proofs: string[]
  spotify_embedded_iframe: string
  current_book: IBook
  current_tv_show: ISeries
  classrooms: ClassroomReducedDto[]
}

const userSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    description: { type: String },
    avatar: { type: String },
    languages: [languageLevelSchema],
    role: { type: Number },
    confirmed_at: { type: Date, default: null },
    proofs: { type: Array, default: [] },
    isApproved: { type: Boolean, default: false },
    spotify_embedded_iframe: { type: String, default: '' },
    current_book: bookSchema,
    current_tv_show: seriesSchema,
    classrooms: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
)

export interface IReducedUser {
  _id: string
  nickname: string
  email: string
  avatar: string
}

export const reducedUserSchema: Schema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  _id: { type: Schema.Types.ObjectId, auto: false },
  avatar: { type: String, required: true },
})

export default mongoose.model<IUser>('users', userSchema)
