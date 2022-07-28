import express from 'express'
import cors from 'cors'

import sub from '../config/sub/index.js'
import upload from '../config/upload/index.js'
import weixin from '../config/weixin/index.js'
import oauth from '../config/oauth/index.js'

const app = express()

const whitelist = new Set([undefined, 'http://localhost:8081', 'http://localhost:3000', 'https://localhost:8087'])
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.has(origin)) {
      callback(undefined, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.all('*', cors(corsOptions), function (req, res, next) {
  next()
})

app.use('/', sub)
app.use('/', upload)
app.use('/', weixin)
app.use('/', oauth)

export default app
