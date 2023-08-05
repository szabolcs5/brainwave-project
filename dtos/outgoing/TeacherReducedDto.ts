import { IUser } from '../../models/User'

export class TeacherReducedDto {
  _id: string

  email: string

  avatar: string

  nickname: string

  lastname: string

  firstname: string

  confirmed_at: Date | null

  proofs: string[]

  constructor(user: IUser) {
    this._id = user._id
    this.email = user.email
    this.avatar = user.avatar
    this.nickname = user.nickname
    this.lastname = user.lastname
    this.firstname = user.firstname
    this.confirmed_at = user.confirmed_at
    this.proofs = user.proofs
  }
}
