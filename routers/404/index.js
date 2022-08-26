import express from 'express'

const routers = express.Router()

routers.all('*', (_, response) => {
  return response.status(404).send()
})

export default routers
