import express from 'express'
import {
  oauthAuthorizationUrl
} from '@octokit/oauth-authorization-url'

import { createOAuthUserAuth } from '@octokit/auth-oauth-user'

const routers = express.Router()

routers.get('/oauth/github', async (request, response) => {
  console.log(request.re)
  const { url, state } = oauthAuthorizationUrl({
    clientType: 'github-app',
    clientId: process.env.GITHUB_CLIENT_ID,
    redirectUrl: 'http://localhost:3000/oauth/github.callback'
    // login: "octocat",
    // state: "secret123",
  })
  console.log(url, state)
  response.cookie('state', state).redirect(302, url)
})

routers.get('/oauth/github.callback', async (request, response) => {
  const { code, state } = request.query
  console.log(request.cookies.state) // 包含域名
  console.log(code)

  const auth = createOAuthUserAuth({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    clientType: 'github-app',
    code,
    state
  })

  // resolves once the user entered the `user_code` on `verification_uri`
  const { token } = await auth()
  console.log(token)
  // try {
  //   const api = (await import('./github/index.js')).default
  //   response.json(await api(code))
  // } catch (error_) {
  //   console.log(error_)
  //   response.status(404).send()
  // }

  response.cookie('accessToken', token).redirect(302, 'https://localhost:8087/admin')
})

export default routers
