import express from 'express'
import cors from 'cors'

import routers from '../routers/index.js'

const app = express()

const whitelist = new Set(process.env.CORS.split(',').map(item => item.trim()))
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.has(origin) || !origin) {
      callback(undefined, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.all('*', cors(corsOptions))

for (const router of routers) {
  app.use('/', router)
}

export default app
