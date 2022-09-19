import got from 'got'

export default async code => {
  const instance = got.extend({
    headers: {
      Accept: 'application/json'
    },
    responseType: 'json'
  })

  const secret = process.env.GITHUB_CLIENT_SECRET
  const id = process.env.GITHUB_CLIENT_ID
  const result = await instance.post(`https://github.com/login/oauth/access_token?client_id=${id}&client_secret=${secret}&code=${code}`)

  return result.body
}
