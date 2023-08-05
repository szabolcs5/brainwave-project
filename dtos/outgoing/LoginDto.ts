import { IChannel } from '../../models/Channel'
import { ILanguageLevel } from '../../models/Language'
import { IUser } from '../../models/User'
import { ChannelReducedDto } from './ChannelReducedDto'
import { UserReducedDto } from './UserReducedDto'

export class LoginDto extends UserReducedDto {
  channels: ChannelReducedDto[]

  languages: ILanguageLevel[]

  constructor(user: IUser, channels: IChannel[]) {
    super(user)
    this.channels = channels.map((channel) => new ChannelReducedDto(channel))
    this.languages = user.languages
  }
}
