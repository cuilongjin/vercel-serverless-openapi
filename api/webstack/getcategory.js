import getClient from '../../model/db.js'

module.exports = async (req, res) => {
  const client = await getClient()
  try {
    const db = client.db('test')
    const result = await db.collection('test1').find().toArray()
    res.status(200).json(result)
  } catch {
    client.close()
  }
}
