import { Socket } from 'socket.io'
import { Roles } from '../utils/Constants'

export interface ISocket extends Socket {
  token: string
  nickname: string
  _id: string
  role: Roles
  avatar: string
}

export interface IJwtPayload {
  nickname: string
  email: string
  _id: string
  role?: Roles
  avatar: string
}
