import mongoose, { ObjectId, Schema } from 'mongoose'

export interface IMessageFrom {
  _id: ObjectId
  nickname: string
  avatar: string
  role: number
}

export interface IMessage {
  message: string
  chat_id: ObjectId // This could be a channel or a classroom
  from: IMessageFrom
  scheduled_at: Date | null
  createdAt: Date
}

export const messageSchema = new Schema<IMessage>(
  {
    message: { type: String, required: true },
    chat_id: { type: Schema.Types.ObjectId, required: true },
    from: {
      _id: { type: Schema.Types.ObjectId, required: true },
      nickname: { type: String, required: true },
      avatar: { type: String, required: true },
      role: { type: Number, required: true },
    },
    scheduled_at: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IMessage>('Message', messageSchema)
