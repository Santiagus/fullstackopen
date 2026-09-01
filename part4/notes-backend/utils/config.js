const logger = require('./logger')
const envPath = '../.env'

logger.info('Loading env from:', envPath)

require('dotenv').config({ path: envPath })

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_SERVER_SELECTION_TIMEOUT_MS: process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS,
  MONGO_CONNECT_TIMEOUT_MS: process.env.MONGO_CONNECT_TIMEOUT_MS,
  MONGO_FAMILY: process.env.MONGO_FAMILY,
}

logger.info('Loaded env config:', config)

module.exports = config
