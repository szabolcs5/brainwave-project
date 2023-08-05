import { IOnlineUsers } from '../../models/OnlineUsers'
import { Roles } from '../../utils/Constants'

export class OnlineUsersReducedDto {
  id: string

  user_id: string

  nickname: string

  role: Roles

  constructor(user: IOnlineUsers) {
    this.id = user.id
    this.user_id = user.user_id
    this.nickname = user.nickname
    this.role = user.role
  }
}
