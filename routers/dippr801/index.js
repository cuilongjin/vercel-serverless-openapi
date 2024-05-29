import express from 'express'
import got from 'got'

import FormData from 'form-data'; // or:
import * as cheerio from 'cheerio';
// import {FormData} from 'formdata-polyfill/esm.min.js';
import { LocalStorage } from 'node-localstorage'


const localStorage = new LocalStorage('./localstorage')

const routers = express.Router()

const UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const getIdURl = 'https://dippr.aiche.org/SampleDb/_ExactNameSearchResults?Length=9'
const getDetailUrl = 'https://dippr.aiche.org/SampleDb/_PropertyConstants'
const loginPage = 'https://dippr.aiche.org/Account/Login'
const UserName = 'zhangsan'
const Password = 'qwer1234'
const IsLogin = ''
const Organization = ''
const OrganizationLoginUrl = ''
let loginCookie = 'ASP.NET_SessionId=5fvnecuocuzbcefk0wu4uay2;__RequestVerificationToken=ecGZBvQQIEum0gCpE-Do644r1-cvAsC1XvqL1ixG5n57T0Al2kBLklHOiUevODKrl_3ITuEwuAnv_3RdREWFxNrG-bho138iYOIve_zoA7g1'

function getCookie(setCookies) {
  let cookieArr = []
  if (Array.isArray(setCookies)) {
    setCookies.forEach((cookie) => {
      cookieArr.push(cookie.split(';')[0])
    });
  } else if (typeof setCookies === 'string') {
    cookieArr.push(cookie.split(';')[0])
  }
  return cookieArr
}

let times = 0
async function login() {
  if (times > 3) {
    throw new Error('登陆超时')
  }
  times++
  let status
  try {
    let result = await got(loginPage, { headers: { cookie: loginCookie } })
    const $ = cheerio.load(result.body, null, false);
    let __RequestVerificationToken = $('input[name=__RequestVerificationToken]').attr('value')
    console.log(__RequestVerificationToken)
    result = await got.post(loginPage, {
      headers: { cookie: loginCookie, 'Content-Type': 'application/x-www-form-urlencoded' },
      form: { __RequestVerificationToken, UserName, Password, IsLogin, Organization, OrganizationLoginUrl },
      followRedirect: false
    })
    if (result.ok) {
        let cookieArr = getCookie(result.headers['set-cookie'])
        let cookie = cookieArr.find(item => item.startsWith('.AspNet.ApplicationCooki'))
        localStorage.setItem('cookie', cookie)
        status = true
    } else {
      status = false
    }
  } catch(err) {
    console.log(err)
    status = false
  }

  return status

  //   const result1 = await fetch("https://dippr.aiche.org/Account/Login", {
  //   "headers": {
  //     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  //     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
  //     "cache-control": "no-cache",
  //     "content-type": "application/x-www-form-urlencoded",
  //     "pragma": "no-cache",
  //     "priority": "u=0, i",
  //     "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": "\"Windows\"",
  //     "sec-fetch-dest": "document",
  //     "sec-fetch-mode": "navigate",
  //     "sec-fetch-site": "same-origin",
  //     "sec-fetch-user": "?1",
  //     "upgrade-insecure-requests": "1",
  //     "cookie": cookieStr,
  //     "Referer": "https://dippr.aiche.org/Account/Login",
  //     "Referrer-Policy": "strict-origin-when-cross-origin",
  //     "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  //   },
  //   "body": urlencoded.toString(),
  //   "method": "POST"
  // });
  //   console.log(result1)
  // cookieArr = getCookie(result1.headers['set-cookie'])
  // console.log(cookieArr)



  // console.log(result.headers['set-cookie'])
  // response.send(result.rawBody)
}



// eslint-disable-next-line no-unused-vars
// function htmlDecode (str) {
//   return str
//     .replace(/&#39;/g, '\'')
//     .replace(/<br\s*(\/)?\s*>/g, '\n')
//     .replace(/&nbsp;/g, ' ')
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&quot;/g, '"')
//     .replace(/&amp;/g, '&')
//     .replace(/&nbsp;/g, ' ')
// }

// // eslint-disable-next-line no-extend-native
// String.prototype.html = function () {
//   return this.toString()
// }

async function handle(params) {
  let cookie = localStorage.getItem('cookie')
  if (!cookie) {
    console.log('没有cookie 去登录')
  }
  let loginStatus = !!cookie
  if (loginStatus) {
    let res = await getInfo(params.casno, loginCookie + ';' + cookie)
    if (!res.status) {
      loginStatus = false
    } else {
      return res.data
    }
  }

  if (!loginStatus) {
    let res = await login()
    if (res) {
      return await handle()
    } else {
      throw new Error('登录失败')
    }
  }
}

routers.get('/dippr801', async (request, response) => {
  let res = await handle({
    casno: request.query.casno
  })

  // const reg = /var.*(nickname|round_head_img|msg_title|msg_desc|cdn_url_1_1).*=.*;/g
  // const match = result.body.match(reg)

  // const obj = {}
  // const tmp = {
  //   nickname: 'name',
  //   round_head_img: 'headimg',
  //   msg_title: 'title',
  //   msg_desc: 'desc',
  //   cdn_url_1_1: 'cover' // 封面
  // }

  // for (const item of match) {
  //   const str = item.slice(3, -1)
  //   const index = str.search('=')

  //   const key = tmp[str.slice(0, index).trim()]
  //   const value = str.slice(index + 1).trim()

  //   if (!key) continue

  //   try {
  //     // eslint-disable-next-line no-eval
  //     obj[key] = eval(value)
  //   } catch {
  //     obj[key] = value
  //   }
  // }

  return response.json(res)
})

export default routers


async function getInfo(cas, cookie) {
  let status
  let data
  try {
    const result = await got.post(getIdURl, {
      headers: {
        cookie: loginCookie + ';' + cookie,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `SearchString=${cas}`
    })
    if (!result.ok) {
      status = false
    } else {
      // console.log(result.body)
      data = getInfoFromHtml(result.body)
      status = true
    }
  } catch(err) {
    console.log(err)
    status = false
  }

  return {
    status,
    data
  }
}


function getInfoFromHtml(html) {
  let obj = {}
  const $ = cheerio.load(html, null, false);
  let thead = $('table thead tr th').toArray()
  let tbody = $('table tbody tr td').toArray()
  let key = thead.map(item => {
    return $($(item)).text()
  })
  let value = tbody.map(item => {
    return $($(item)).text()
  })
  key.forEach((item, index) => {
    obj[item] = value[index]
  })
  return obj
}
