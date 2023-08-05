import mongoose from 'mongoose'

export interface IChannel {
  _id: string
  name: string
  description: string
}

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IChannel>('Channel', channelSchema)
