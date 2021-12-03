import { MongoClient } from 'mongodb'
const uri = 'mongodb+srv://user:passwd@cluster0.iukuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = async () => {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  return client
}
