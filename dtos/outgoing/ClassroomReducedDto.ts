import { IClassroom } from '../../models/Classroom'
import { IReducedUser } from '../../models/User'

export class ClassroomReducedDto {
  _id: string

  name: string

  level: number

  language: string

  joinCode: string

  teacher: IReducedUser

  isLocked: boolean

  constructor(classroom: IClassroom) {
    this._id = classroom._id
    this.name = classroom.name
    this.level = classroom.level
    this.language = classroom.language
    this.joinCode = classroom.joinCode
    this.teacher = classroom.teacher
    this.isLocked = classroom.isLocked
  }
}
