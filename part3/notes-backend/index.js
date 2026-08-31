const express = require("express");
const cors = require("cors");

const { connectToMongo, disconnectMongo } = require("./mongo");
const Note = require("./models/note");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", async (request, response) => {
  const notes = await Note.find({}).sort({ _id: -1 });
  response.json(notes);
});

app.get("/api/notes/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.post("/api/notes", async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

app.delete("/api/notes/:id", async (request, response) => {
  const deletedNote = await Note.findByIdAndDelete(request.params.id);

  if (deletedNote) {
    console.log("Note deleted:", deletedNote.toJSON());
  } else {
    console.log("No note found to delete for id:", request.params.id);
  }

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectToMongo();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

process.on("SIGINT", async () => {
  await disconnectMongo();
  process.exit(0);
});

startServer().catch(error => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
