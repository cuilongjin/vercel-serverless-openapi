import express from 'express'

const routers = express.Router()

routers.get('/api/sub', (req, res) => {
  const v = 'vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogInYzIiwNCiAgImFkZCI6ICJ2My53cWR5Lnh5eiIsDQogICJwb3J0IjogIjQ0MyIsDQogICJpZCI6ICIwZGE0MDBmMC1iYTYwLTRjZTktODc0ZS1jY2ExNDcxM2E1M2QiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogInYzLndxZHkueHl6IiwNCiAgInBhdGgiOiAiLzJiNjBlNTdlMmYvIiwNCiAgInRscyI6ICJ0bHMiLA0KICAic25pIjogIiINCn0='
  const strToBase64 = Buffer.from(v).toString('base64')
  res.send(strToBase64)
})

export default routers
