import { MongoClient } from 'mongodb'
// mongosh
const uri = process.env.MONGODB_URL
export default async () => {
  return await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}
