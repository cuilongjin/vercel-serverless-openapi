import express from 'express'
import cors from 'cors'

import sub from '../config/sub/index.js'
import upload from '../config/upload/index.js'
import weixin from '../config/weixin/index.js'

const app = express()

const whitelist = new Set(['http://localhost:8080'])
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.has(origin)) {
      callback(undefined, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use('/', sub)
app.use('/', upload)
app.use('/', weixin)

export default app
