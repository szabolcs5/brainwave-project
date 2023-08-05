import { IUser } from '../../models/User'
import { Roles } from '../../utils/Constants'
import { ClassroomReducedDto } from './ClassroomReducedDto'

export class UserReducedDto {
  _id: string

  email: string

  avatar: string

  nickname: string

  lastname: string

  firstname: string

  confirmed_at: Date | null

  role: Roles

  classrooms: ClassroomReducedDto[]

  constructor(user: IUser) {
    this._id = user._id
    this.email = user.email
    this.avatar = user.avatar
    this.nickname = user.nickname
    this.lastname = user.lastname
    this.firstname = user.firstname
    this.confirmed_at = user.confirmed_at
    this.role = user.role
    this.classrooms = user.classrooms
  }
}
