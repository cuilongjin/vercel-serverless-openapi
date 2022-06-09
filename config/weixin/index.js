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

  const { window } = await JSDOM.fromURL(url, { resources: resourceLoader })
  const { document } = window
  const description = document.querySelector('meta[name="description"]')?.content
  const title = document.querySelector('meta[property="og:title"]')?.content
  const pic = document.querySelector('meta[property="og:image"]')?.content
  const nickname = document.querySelector('.profile_nickname')?.textContent
  const logo = document.querySelector('mpprofile').getAttribute('data-headimg')

  response.json({
    description, title, pic, nickname, logo
  })
})

export default routers
