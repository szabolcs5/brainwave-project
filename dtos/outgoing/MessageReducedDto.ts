import { IMessageFrom } from '../../models/Message'

export class MessageReducedDto {
  chat_id: string

  from: IMessageFrom

  scheduled_at: Date | null

  createdAt: Date

  constructor(message: MessageReducedDto) {
    this.chat_id = message.chat_id
    this.from = message.from
    this.scheduled_at = message.scheduled_at
    this.createdAt = message.createdAt
  }
}
