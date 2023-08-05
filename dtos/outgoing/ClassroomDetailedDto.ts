import { IReducedUser } from '../../models/User'
import { Levels } from '../../utils/Constants'

export class ClassroomDetailedDto {
  _id!: string

  name!: string

  level!: Levels

  language!: string

  description!: string

  createdAt?: Date

  updatedAt?: Date

  students: IReducedUser[]

  teacher: IReducedUser

  joinCode!: string

  constructor(classroom: ClassroomDetailedDto) {
    this._id = classroom._id
    this.name = classroom.name
    this.level = classroom.level
    this.language = classroom.language
    this.description = classroom.description
    this.createdAt = classroom.createdAt
    this.updatedAt = classroom.updatedAt
    this.joinCode = classroom.joinCode
    this.students = classroom.students
    this.teacher = classroom.teacher
  }
}
