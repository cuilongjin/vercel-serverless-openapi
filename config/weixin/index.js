import express from 'express'
import jsdom from 'jsdom'

import { chromeWin } from '../../utils/useragent.js'

const { JSDOM } = jsdom
const routers = express.Router()

routers.get('/api/weixin', async (request, response) => {
  const url = request.query.url
  const resourceLoader = new jsdom.ResourceLoader({
    strictSSL: false,
    userAgent: chromeWin
  })

  const dom = await JSDOM.fromURL(url, {
    resources: resourceLoader
  })

  const reg = /var.*(nickname|hd_head_img|msg_title|msg_desc|cdn_url_1_1).*=.*;/g

  const match = dom.serialize().match(reg)
  console.log(match)

  // eslint-disable-next-line no-extend-native
  String.prototype.html = function () {
    return this.toString()
  }

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

  const obj = {}
  const tmp = {
    nickname: 'name',
    hd_head_img: 'headimg',
    msg_title: 'title',
    msg_desc: 'desc',
    cdn_url_1_1: 'cover' // 封面
  }
  for (const item of match) {
    const str = item.slice(3, -1)
    const arr = str.split('=')
    obj[tmp[arr[0].trim()]] = arr[1].trim()

    try {
      // eslint-disable-next-line no-eval
      obj[tmp[arr[0].trim()]] = eval(arr[1].trim())
    } catch {
      obj[tmp[arr[0].trim()]] = arr[1].trim()
    }
  }

  // const description = document.querySelector('meta[name="description"]')?.content
  // const title = document.querySelector('meta[property="og:title"]')?.content
  // const pic = document.querySelector('meta[property="og:image"]')?.content
  // const nickname = document.querySelector('.profile_nickname')?.textContent
  // const logo = document.querySelector('mpprofile')?.getAttribute('data-headimg')

  response.json(obj)
})

export default routers
