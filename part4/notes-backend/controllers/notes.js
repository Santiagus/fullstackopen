const notesRouter = require('express').Router()

const mongoose = require('mongoose')
const Note = require('../models/note')


notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).sort({ _id: -1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  const note = await Note.findById(id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('', async (request, response) => {
  const body = request.body
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'malformatted id' })
  }

  const deletedNote = await Note.findByIdAndDelete(id)

  if (deletedNote) {
    console.log('Note deleted:', deletedNote.toJSON())
    return response.status(204).end()
  }

  console.log('No note found to delete for id:', id)
  return response.status(404).json({ error: 'note not found' })
})

module.exports = notesRouter