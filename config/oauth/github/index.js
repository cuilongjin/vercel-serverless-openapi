import got from 'got'
import { githubConfig } from '../config'
export default async code => {
  const instance = got.extend({
    headers: {
      Accept: 'application/json'
    },
    responseType: 'json'
  })

  const { client_id: id, client_secret: secret } = githubConfig
  const result = await instance.post(`https://github.com/login/oauth/access_token?client_id=${id}&client_secret=${secret}&code=${code}`)

  const body = result.body
  console.log(body)
  return body
}
