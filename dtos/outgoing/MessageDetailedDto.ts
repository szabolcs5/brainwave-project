import { ObjectId } from 'mongoose'
import { IMessageFrom } from '../../models/Message'

export class MessageDetailedDto {
  message: string

  chat_id: ObjectId // This could be a channel or a classroom

  from: IMessageFrom

  scheduled_at: Date | null

  createdAt: Date

  constructor(message: MessageDetailedDto) {
    this.message = message.message
    this.chat_id = message.chat_id
    this.from = message.from
    this.scheduled_at = message.scheduled_at
    this.createdAt = message.createdAt
  }
}
