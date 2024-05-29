import express from 'express'
import got from 'got'
import * as cheerio from 'cheerio'
import DB from './db.js'
let db = new DB()

const routers = express.Router()
const UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const getIdURl = 'https://dippr.aiche.org/SampleDb/_ExactNameSearchResults?Length=9'
const getPropertyUrl = 'https://dippr.aiche.org/SampleDb/_PropertyConstants'
const loginPage = 'https://dippr.aiche.org/Account/Login'
const UserName = 'zhangsan'
const Password = 'qwer1234'
const IsLogin = ''
const Organization = ''
const OrganizationLoginUrl = ''
const loginCookie = 'ASP.NET_SessionId=5fvnecuocuzbcefk0wu4uay2;__RequestVerificationToken=ecGZBvQQIEum0gCpE-Do644r1-cvAsC1XvqL1ixG5n57T0Al2kBLklHOiUevODKrl_3ITuEwuAnv_3RdREWFxNrG-bho138iYOIve_zoA7g1'
const contentType = 'application/x-www-form-urlencoded'

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
      db.cookie = cookie
      status = true
    } else {
      status = false
    }
  } catch (err) {
    console.log(err)
    status = false
  }

  return status
}

async function handle(params) {
  let cookie
  try {
    cookie = db.cookie
  } catch (e) { }
  if (!cookie) {
    console.log('没有cookie 去登录')
  }
  let loginStatus = !!cookie
  if (loginStatus) {
    let res = await getInfo(params.casno, loginCookie + ';' + cookie)
    if (!res.status) {
      loginStatus = false
    } else {
      let propertyRes = await getProperty(res.data['DIPPR® ID'], loginCookie + ';' + cookie)
      return {
        data: res.data,
        property: propertyRes.data
      }
    }
  }

  if (!loginStatus) {
    let res = await login()
    if (res) {
      return await handle(params)
    } else {
      throw new Error('登录失败')
    }
  }
}

routers.get('/dippr801', async (request, response) => {
  let res = await handle({
    casno: request.query.casno
  })
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
      data = getInfoFromHtml(result.body)
      status = true
    }
  } catch (err) {
    console.log(err)
    status = false
  }

  return {
    status,
    data
  }
}

async function getProperty(id, cookie) {
  let status
  let data
  try {
    const result = await got.post(getPropertyUrl, {
      headers: {
        cookie: loginCookie + ';' + cookie,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `selectedChemId=${id}`
    })
    if (!result.ok) {
      status = false
    } else {
      console.log(result.body)
      data = getPropertyFromHtml(result.body)
      status = true
    }
  } catch (err) {
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

function getPropertyFromHtml(html) {
  let array = []
  const $ = cheerio.load(html, null, false);
  let thead = $('div.row >div >table.table-hover >thead >tr >th').toArray()
  let tbody = $('div.row >div >table.table-hover >tbody >tr').toArray()
  let key = thead.map(item => {
    return $($(item)).text()
  })
  tbody.map(item => {
    let obj = {}
    let value = item.children.filter(item => item.type !== 'text').map(item => {
      return $($(item)).text()
    })
    key.forEach((item, index) => {
      obj[item] = value[index]
    })
    array.push(obj)
  })
  return array
}
