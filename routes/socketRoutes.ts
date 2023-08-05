import { createAdapter } from '@socket.io/mongo-adapter'
import { Socket } from 'socket.io'
import { io } from '..'
import { ISocket } from '../@types/socket'
import { retrieveCollection } from '../adapters/mongooseAdapter'
import { OnlineUsersReducedDto } from '../dtos/outgoing/OnlineUsersReducedDto'
import { connectMiddleware } from '../middleware/socketAuth'
import Message from '../models/Message'
import { socketService } from '../services/SocketService'

export async function addAdapter() {
  const collection = await retrieveCollection()
  io.adapter(createAdapter(collection))
}

export async function addSocketMiddlewares() {
  io.use(connectMiddleware)
}

export function addSocketRoutes() {
  io.on('connection', async (socket: Socket) => {
    socketService.addSocket(socket)
    const onlineUsers = await socketService.findAll()

    socket.emit(
      'online users',
      onlineUsers.map((user) => new OnlineUsersReducedDto(user)),
    )

    const upgradedSocket = socket as ISocket

    await socketService.joinSocketRooms(upgradedSocket)

    socket.broadcast.emit('user connected', {
      id: upgradedSocket.id,
      user_id: upgradedSocket._id,
      nickname: upgradedSocket.nickname,
      role: upgradedSocket.role,
    })

    socket.on('disconnect', () => {
      socketService.removeSocket(socket)

      socket.broadcast.emit('user disconnected', {
        id: upgradedSocket.id,
        user_id: upgradedSocket._id,
        nickname: upgradedSocket.nickname,
        role: upgradedSocket.role,
      })
    })

    socket.on('message', async (message) => {
      const incomingMessage = {
        message: message.message ?? '',
        chat_id: message.chat_id ?? '',
        scheduled_at: message.scheduled_at ?? null,
      }
      if (!incomingMessage.message || !incomingMessage.chat_id) return

      const isEligible = socket.rooms.has(incomingMessage.chat_id)
      if (!isEligible) return

      const messageToSend = {
        message: incomingMessage.message,
        chat_id: incomingMessage.chat_id,
        from: {
          _id: upgradedSocket._id,
          nickname: upgradedSocket.nickname,
          avatar: upgradedSocket.avatar,
          role: upgradedSocket.role,
        },
        scheduled_at: incomingMessage.scheduled_at,
        createdAt: new Date(),
      }

      try {
        await Message.create(messageToSend)
      } catch (error) {
        console.error(error)
      }

      io.to(incomingMessage.chat_id).emit('message', messageToSend)
    })
  })
}
