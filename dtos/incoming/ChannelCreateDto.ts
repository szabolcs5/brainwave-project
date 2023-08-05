import { IsString, MaxLength } from 'class-validator'
import { IsChannelUnique } from '../../validators/IsChannelUnique'

export class ChannelCreateDto {
  @IsString()
  @MaxLength(30)
  @IsChannelUnique({ message: 'Channel name already exists' })
  name: string

  @IsString()
  @MaxLength(100)
  description: string

  constructor(name: string, description: string) {
    this.name = name
    this.description = description
  }
}
