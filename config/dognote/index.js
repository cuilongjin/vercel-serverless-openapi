import express from 'express'

import client from '../../db/client/index.js'

const routers = express.Router()
routers.get('/api/dognote', async (request, response) => {
  const Client = await client()

  let dognote
  try {
    await Client.connect()
    const dognotes = Client.db('main').collection('dognote')

    // 获取一条随机数据
    dognote = await dognotes.aggregate([{ $sample: { size: 1 } }]).toArray()
  } finally {
    await Client.close()
  }

  return response.json(dognote[0])
})

export default routers
