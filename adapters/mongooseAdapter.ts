import { MongoClient } from 'mongodb'

export async function retrieveCollection() {
  const dbName = process.env.DB_NAME || ''
  const collectionName = process.env.SOCKET_IO_COLLECTION_NAME || ''
  const mongoClient = new MongoClient(process.env.MONGODB_URI || '')
  await mongoClient.connect()
  return mongoClient.db(dbName).collection(collectionName)
}
