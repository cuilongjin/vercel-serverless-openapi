import express from 'express'
import got from 'got'

const routers = express.Router()

// eslint-disable-next-line no-unused-vars
function htmlDecode (str) {
  return str
    .replace(/&#39;/g, '\'')
    .replace(/<br\s*(\/)?\s*>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
}

// eslint-disable-next-line no-extend-native
String.prototype.html = function () {
  return this.toString()
}

routers.get('/api/weixin', async (request, response) => {
  const result = await got(request.query.url)

  const reg = /var.*(nickname|round_head_img|msg_title|msg_desc|cdn_url_1_1).*=.*;/g
  const match = result.body.match(reg)

  const obj = {}
  const tmp = {
    nickname: 'name',
    round_head_img: 'headimg',
    msg_title: 'title',
    msg_desc: 'desc',
    cdn_url_1_1: 'cover' // 封面
  }

  for (const item of match) {
    const str = item.slice(3, -1)
    const index = str.search('=')

    const key = tmp[str.slice(0, index).trim()]
    const value = str.slice(index + 1).trim()

    if (!key) continue

    try {
      // eslint-disable-next-line no-eval
      obj[key] = eval(value)
    } catch {
      obj[key] = value
    }
  }

  return response.json(obj)

  // const description = document.querySelector('meta[name="description"]')?.content
  // const title = document.querySelector('meta[property="og:title"]')?.content
  // const pic = document.querySelector('meta[property="og:image"]')?.content
  // const nickname = document.querySelector('.profile_nickname')?.textContent
  // const logo = document.querySelector('mpprofile')?.getAttribute('data-headimg')
})

export default routers
