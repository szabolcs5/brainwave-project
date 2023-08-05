import mongoose from 'mongoose'
import { Levels } from '../utils/Constants'
import { IReducedQuiz, reducedQuizSchema } from './Quiz'
import { IReducedUser, reducedUserSchema } from './User'

export interface IClassroom {
  _id: string
  level: Levels
  name: string
  language: string
  description: string
  teacher: IReducedUser
  students: IReducedUser[]
  isLocked: boolean
  joinCode: string
  quizzes: IReducedQuiz[]
  createdAt: Date
  updatedAt: Date
}

export interface ICreateClassroom {
  level: Levels
  name: string
  language: string
  description: string
  teacher: IReducedUser
  students: IReducedUser[]
  joinCode: string
}

const classroomSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    language: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    teacher: reducedUserSchema,
    students: [reducedUserSchema],
    isLocked: { type: Boolean, default: false },
    joinCode: { type: String, required: true, unique: true },
    quizzes: [reducedQuizSchema],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IClassroom>('Classroom', classroomSchema)
