// Sequelize DOC: https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { Sequelize } from 'sequelize'
import sqlite3 from 'sqlite3'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storage = path.resolve(__dirname, './database.sqlite3')

export default () => {
  return new Sequelize({
    dialectModule: sqlite3,
    dialect: 'sqlite',
    storage
  })
}
