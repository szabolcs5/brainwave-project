import { IChannel } from '../../models/Channel'

export class ChannelReducedDto {
  _id: string

  name: string

  description: string

  constructor(channel: IChannel) {
    this._id = channel._id
    this.name = channel.name
    this.description = channel.description
  }
}
