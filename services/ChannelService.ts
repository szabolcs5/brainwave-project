import Channel from '../models/Channel'

export const channelService = {
  find: async () => {
    return Channel.find()
  },
  findById: async (_id: string) => {
    return Channel.findById(_id)
  },
  findByName: async (name: string) => {
    return Channel.findOne({ name })
  },
  saveChannel: async (name: string, description: string) => {
    return Channel.create({ name, description })
  },
}
