/**
 * @description 代理 telegra.ph
 * https://vercel-serverless-openapi.vercel.app/tg/file/603792faf40465069b472.png
 */

import got from 'got'
module.exports = async (request, response) => {
  const base = 'https://telegra.ph'
  const destinationURL = base + request.url.slice(3)

  const client = got.extend({
    responseType: 'buffer'
  })

  // const result = await client('https://vercel.com/api/www/avatar/lTl6BHBdlhOpgbbAAc0WYqHZ?&s=60')
  const result = await client(destinationURL)
  response.send(result.body)
}
