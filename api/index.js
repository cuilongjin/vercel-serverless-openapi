import express from 'express'
import cors from 'cors'

import routers from '../routers/index.js'

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

app.all('*', cors(corsOptions), function (_, __, next) {
  next()
})

for (const router of routers) {
  app.use('/', router)
}

export default app
