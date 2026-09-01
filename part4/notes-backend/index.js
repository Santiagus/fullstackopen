require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') })

const express = require('express')
const cors = require('cors')

const { connectToMongo, disconnectMongo } = require('./mongo')

const app = express()

app.use(cors())
app.use(express.json())

const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


const PORT = Number(process.env.PORT)

if (!process.env.PORT) {
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
