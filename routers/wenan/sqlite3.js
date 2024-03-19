import Sequelize from '../../db/sqlite3/index.js'

async function handler (request, response) {
  const match = request.query.match

  // Needed to fix sequelize issues: https://github.com/sequelize/sequelize/issues/9489
  const sequelize = Sequelize()
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
