import { IsDate, IsMongoId, IsOptional, IsString, MaxLength } from 'class-validator'

export class MessageCreateDto {
  @IsString()
  @MaxLength(1000)
  message: string

  @IsMongoId()
  chat_id: string

  @IsOptional()
  @IsDate()
  scheduled_at: Date | null

  constructor(message: MessageCreateDto) {
    this.message = message.message
    this.chat_id = message.chat_id
    this.scheduled_at = message.scheduled_at
  }
}
