import mongoose, { Schema } from 'mongoose'
import { Roles } from '../utils/Constants'

export interface IOnlineUsers {
  id: string
  user_id: string
  nickname: string
  role: Roles
}

export const onlineUsersSchema = new Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  nickname: { type: String, required: true },
  role: { type: Number, required: true },
})

export default mongoose.model<IOnlineUsers>('OnlineUsers', onlineUsersSchema)
