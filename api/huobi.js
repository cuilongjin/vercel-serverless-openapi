/*
https://api.huobi.pro/market/detail/merged?symbol=btcusdt
http://localhost:3000/api/huobi?api=market/detail/merged&symbol=btcusdt
*/

import got from 'got'
import qs from 'qs'
module.exports = async (request, response) => {
  const { api, ...rest } = JSON.parse(JSON.stringify(request.query))
  const client = got.extend({
    prefixUrl: 'https://api.huobi.pro/',
    responseType: 'json'
  })

  const query = qs.stringify(rest)
  const result = await client(`${api}?${query}`)
  response.status(200).json(result.body)
}
