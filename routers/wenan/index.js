import express from 'express'

import sqliteHandler from './sqlite3.js'
// import mongoHandler from './mongo.js'

const routers = express.Router()

routers.get('/dognote', sqliteHandler)
routers.get('/feihua', sqliteHandler)
routers.get('/jitang', sqliteHandler)

export default routers
