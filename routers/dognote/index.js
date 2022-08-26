import express from 'express'

import client from '../../db/client/index.js'

const routers = express.Router()
routers.get('/dognote', async (_, response) => {
  let Client
  let dognote
  try {
    Client = await client()
    await Client.connect()
    const dognotes = Client.db().collection('dognote')

    // 获取一条随机数据
    dognote = (await dognotes.aggregate([{ $sample: { size: 1 } }]).toArray())[0]
  } finally {
    Client && await Client.close()
  }

  return response.json(dognote)
})

export default routers
