import getClient from '../../model/db.js'

module.exports = async (req, res) => {
  let client
  try {
    client = await getClient()
    const db = client.db('test')
    const result = await db.collection('web').find().toArray()
    res.status(200).json(result)
    client.close()
  } catch (error) {
    client && client.close()
    res.status(500).send(error.toString())
  }
}
