import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

export const connectToDatabase = async () => {
  const mongoDBUri = process.env.MONGODB_URI || ''
  await mongoose.connect(mongoDBUri)
}
