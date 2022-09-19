
/**
 * @description 代理
 * https://telegra.ph/file/603792faf40465069b472.png
 * https://api.wqdy.top/proxyu=https://telegra.ph/file/603792faf40465069b472.png
 */

import got from 'got'
import express from 'express'

const routers = express.Router()

routers.get('/proxy', async (request, response) => {
  // const { code } = request.query
  const { u } = request.query

  console.log(request.query)
  const result = await got.get(u)

  result.headers['content-disposition'] && response.setHeader('content-disposition', result.headers['content-disposition'])
  result.headers['content-type'] && response.setHeader('content-type', result.headers['content-type'])

  response.send(result.rawBody)
})

export default routers
