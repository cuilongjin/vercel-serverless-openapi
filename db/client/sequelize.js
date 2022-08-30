// Sequelize DOC: https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor

import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'

export default () => {
  /*
    在 vercel severless 报错 Error: Please install mysql2 package manually
    sequelize issues: https://github.com/sequelize/sequelize/issues/9489
    设置 dialectModule: mysql2 依然间隔报该错

    在每次请求前重新 new Sequelize()，问题已解决
  */
  return new Sequelize(
    process.env.MYSQL_URL,
    {
      dialect: 'mysql',
      dialectModule: mysql2 // Needed to fix sequelize issues: https://github.com/sequelize/sequelize/issues/9489
    }
  )
}
