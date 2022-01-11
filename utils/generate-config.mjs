import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import configStr from '../api/upload/config.js'
import baseConfig from '../api/upload/base-config.js'
import { randomWord } from './index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const config = JSON.parse(configStr)
const { lastTime, config2 = [] } = config

const lastDate = new Date(lastTime).getDate()
const currentTime = Date.now()
const currentDate = new Date(currentTime).getDate()
if (currentDate !== lastDate) {
  const config1 = baseConfig.map(item => {
    item.random = randomWord(8).toLowerCase()
    return item
  })

  config.config1 = config2
  config.config2 = config1
  config.lastTime = currentTime

  const contemt = `module.exports = '${JSON.stringify(config)}'`
  const output = fs.createWriteStream(path.join(__dirname, '../api/upload/config.js'))
  output.write(contemt + '\n')
}
