import mongoose from 'mongoose'

export default async function seedDatabase() {
  const COLLECTION = process.env.SOCKET_IO_COLLECTION_NAME ?? ''
  try {
    const connection = mongoose.connection
    await connection.createCollection(COLLECTION, {
      capped: true,
      size: 1e6,
    })
  } catch (e) {
    console.warn(`Collection ${COLLECTION} already exists.`)
  }
}
