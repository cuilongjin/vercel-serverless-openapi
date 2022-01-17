import express from 'express'
import cors from 'cors'

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

app.post('/api', cors(corsOptions), (request, response, next) => {
  const { action } = request.query
  response.status(200).send(action)
})

export default app
