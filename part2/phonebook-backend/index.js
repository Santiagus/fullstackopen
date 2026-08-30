const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const entries = persons.length;
  const msg = `Phonebook has info for ${entries} people`;
  const now = Date().toString();
  console.log(`/info : ${msg}\n${now}`);

  response.type("text/plain").send(`${msg}\n${now}`);
});

app.get("/api/persons", (request, response) => {
  console.log(`/api/persons : `, persons);
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id === id);

  if (person) {
    console.log(`/api/persons/${id} : `, person);
    response.json(person);
  } else {
    console.log(`/api/persons/${id} : `, "Resource does not exists!!");
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter(person => person.id !== id);
  console.log(`Person ${id} deleted`);
  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = {
    name: body.content,
    number: body.important || false, // default to false
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
