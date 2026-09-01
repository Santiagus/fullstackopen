const logger = require('./utils/logger')
const config = require('./utils/config')

const mongoose = require('mongoose')

if (!config.MONGO_URI) {
  throw new Error('Missing config.MONGO_URI in environment variables')
}

mongoose.set('strictQuery', false)

let isConnected = false

const connectToMongo = async () => {
  if (isConnected) {
    return
  }

  const options = {
    serverSelectionTimeoutMS: Number(config.MONGO_SERVER_SELECTION_TIMEOUT_MS),
    connectTimeoutMS: Number(config.MONGO_CONNECT_TIMEOUT_MS),
    family: Number(config.MONGO_FAMILY),
  }

  try {
    await mongoose.connect(config.MONGO_URI, options)
    isConnected = true
    logger.info(`Mongo connected: ${config.MONGO_URI}`)

  } catch (error) {
    logger.error('Mongo connection failed:', error.message)
    throw error
  }
}

const disconnectMongo = async () => {
  if (!isConnected) {
    return
  }

  await mongoose.disconnect()
  isConnected = false
  logger.info('Mongo disconnected')
}

module.exports = {
  connectToMongo,
  disconnectMongo,
}
