import path from 'node:path'
import { fileURLToPath } from 'node:url'

import Sequelize from '../../db/sqlite3/sequelize-sqlite.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storage = path.resolve(__dirname, './db.sqlite3')

async function handler (request, response) {
  const match = request.query.match

  // Needed to fix sequelize issues: https://github.com/sequelize/sequelize/issues/9489
  const sequelize = Sequelize(storage)
  try {
    const model = sequelize.define(match, {}, {
      tableName: match,
      timestamps: false // 禁用时间戳
    })

    // 获取一条随机数据
    const data = await model.findOne({
      attributes: ['text'],
      order: sequelize.random(),
      raw: true
    })

    return response.json({ code: 0, data: data.text })
  } finally {
    sequelize.close()
  }
}

export default handler
