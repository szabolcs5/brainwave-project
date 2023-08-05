import { Socket } from 'socket.io'
import { IJwtPayload, ISocket } from '../@types/socket'
import JwtHelper from '../utils/JwtHelper'

export function connectMiddleware(socket: Socket, next: (err?: Error | undefined) => void) {
  if (!socket.handshake.headers.token) {
    return next(new Error('Authentication error'))
  }
  const token = String(socket.handshake.headers.token)
  try {
    const credentials = JwtHelper.verifyToken(token) as IJwtPayload
    if (credentials?.role === undefined) return next(new Error('Authentication error'))
    ;(socket as ISocket).token = token
    ;(socket as ISocket).nickname = credentials.nickname
    ;(socket as ISocket)._id = credentials._id
    ;(socket as ISocket).role = credentials.role
    ;(socket as ISocket).avatar = credentials.avatar
    return next()
  } catch (error) {
    return next(new Error('Authentication error'))
  }
}
