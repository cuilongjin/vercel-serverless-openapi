import express from 'express'

import client from '../../db/client/index.js'

const routers = express.Router()
routers.get('/dognote', async (_, response) => {
  let Client
  try {
    Client = await client()
    await Client.connect()
    const dognotes = Client.db().collection('dognote')

    // 获取一条随机数据
    const dognote = (await dognotes.aggregate([{ $sample: { size: 1 } }]).toArray())[0]
    return response.json({ code: 0, data: dognote.note })
  } finally {
    Client && await Client.close()
  }
})

export default routers
