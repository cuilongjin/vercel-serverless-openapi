import { MongoClient } from 'mongodb'
const uri = 'mongodb://admin:123456@localhost:27017'

module.exports = async () => {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  return client
}
