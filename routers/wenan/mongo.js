import client from '../../db/mongo/index.js'

async function handler (request, response) {
  const match = request.query.match

  let Client
  try {
    Client = await client()
    await Client.connect()
    const collect = Client.db().collection(match)

    // 获取一条随机数据
    const data = (await collect.aggregate([{ $sample: { size: 1 } }]).toArray())[0]
    console.log(data)
    return response.json({ code: 0, data: data.text })
  } finally {
    Client && await Client.close()
  }
}

export default handler
