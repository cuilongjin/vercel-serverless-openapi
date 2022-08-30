import express from 'express'

import { Sequelize } from 'sequelize'
const sequelize = new Sequelize(process.env.MYSQL_URL)

const routers = express.Router()
routers.get('/dognote', async (_, response) => {
  try {
    await sequelize.authenticate()
    const dognotes = sequelize.define('dognote', {}, {
      tableName: 'dognote',
      timestamps: false // 禁用时间戳
    })

    // 获取一条随机数据
    const dognote = await dognotes.findOne({
      attributes: ['note'],
      order: sequelize.random(),
      raw: true
    })
    return response.json({ code: 0, data: dognote.note })
  } finally {
    sequelize.close()
  }
})

export default routers
