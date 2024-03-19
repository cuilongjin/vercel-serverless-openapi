import express from 'express'
import dbHandler from './sqlite3.js'

const routers = express.Router()
routers.get('/idcard', dbHandler)
export default routers
