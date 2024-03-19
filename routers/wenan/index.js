import express from 'express'

import dbHandler from './sqlite3.js'
// import mongoHandler from './mongo.js'

const routers = express.Router()

routers.get('/dognote', dbHandler)
routers.get('/feihua', dbHandler)
routers.get('/jitang', dbHandler)

export default routers
