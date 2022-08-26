import { fileURLToPath } from 'node:url'
import path from 'node:path'

import express from 'express'
import sqlite3 from 'sqlite3'

const routers = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const Sqlite3 = sqlite3.verbose()
const db = new Sqlite3.Database(path.resolve(__dirname, './note.db'))

routers.get('/api/dognote', async (request, response) => {
  db.get('SELECT note FROM dognote ORDER BY RANDOM() LIMIT 1', async (err, row) => {
    if (err) {
      return response.json(err)
    }
    return response.json(row)
  })
})

export default routers
