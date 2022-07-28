import express from 'express'

const routers = express.Router()

routers.post('/api/oauth-github', async (request, response) => {
  const { code } = request.query
  try {
    const api = (await import('./github/index.js')).default
    response.json(await api(code))
  } catch (error_) {
    console.log(error_)
    response.status(404).send()
  }
})

export default routers
