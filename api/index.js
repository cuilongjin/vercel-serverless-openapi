import express from 'express'
import cors from 'cors'

import config from '../config'
import sub from '../config/sub'
import upload from '../config/upload'

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

// app.post('/api', async (request, response, next) => {
//   try {
//     const res = await config(request)
//     console.log('res', res)
//     if (res.code === 404) return response.status(404).send()
//     if (res.code === 500) return response.status(500).send()
//     response.json(res)
//   } catch (error) {
//     return response.status(500).send(error)
//   }
// })

export default app
