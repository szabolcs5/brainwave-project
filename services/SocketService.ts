import { Socket } from 'socket.io'
import { ISocket } from '../@types/socket'
import OnlineUsers from '../models/OnlineUsers'
import { channelService } from './ChannelService'
import { userService } from './UserService'

export const socketService = {
  addSocket: async (socket: Socket) => {
    const upgradedSocket = socket as ISocket
    return OnlineUsers.create({
      id: upgradedSocket.id,
      user_id: upgradedSocket._id,
      nickname: upgradedSocket.nickname,
      role: upgradedSocket.role,
    })
  },
  removeSocket: async (socket: Socket) => {
    const upgradedSocket = socket as ISocket
    return OnlineUsers.findOneAndDelete({ id: upgradedSocket.id })
  },
  findAll: async () => {
    return OnlineUsers.find()
  },
  joinSocketRooms: async (socket: ISocket) => {
    const user = await userService.findById(socket._id)
    if (user?.classrooms) {
      user?.classrooms.forEach(async (classroom) => {
        socket.join(classroom._id.toString())
      })
    }
    const channels = await channelService.find()
    channels.forEach((channel) => {
      socket.join(channel._id.toString())
    })
  },
}
