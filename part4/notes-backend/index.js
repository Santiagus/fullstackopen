const app = require('./app')
const { connectToMongo, disconnectMongo } = require('./mongo')
const config = require('./utils/config')
const logger = require('./utils/logger')

const PORT = Number(config.PORT)

logger.info('Starting backend with PORT:', PORT)

if (!config.PORT) {
  throw new Error('Missing PORT in environment variables')
}

const startServer = async () => {
  await connectToMongo()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

process.on('SIGINT', async () => {
  await disconnectMongo()
  process.exit(0)
})

startServer().catch(error => {
  console.error('Failed to start server:', error.message)
  process.exit(1)
})
