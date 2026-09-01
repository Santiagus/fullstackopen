const express = require('express')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

const app = express()

app.use(express.static('dist'))
app.use('/api/notes', notesRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
