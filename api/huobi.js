/*
test http://localhost:3000/api/huobi?api=open/api/v2/market/ticker&symbol=SHIB_USDT
*/

import got from 'got'
module.exports = async (request, response) => {
  const { api, ...rest } = JSON.parse(JSON.stringify(request.query))
  const client = got.extend({
    prefixUrl: 'https://www.mexc.com',
    responseType: 'json'
  })
  const result = await client(api, rest)
  response.status(200).json(result.body)
}
