const express = require('express')
const notesRouter = require('./controllers/notes')

const app = express()

app.use('/api/notes', notesRouter)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
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

module.exports = app
