import Note from "./components/Note";
import { useState, useEffect } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:3001/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get(SERVER_URL).then(response => {
      console.log("Notes fetched from server:", response.data);
      setNotes(response.data);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = event => {
    const noteObject = {
      id: String(notes.length + 1),
      content: newNote,
      important: Math.random() < 0.5,
    };
    event.preventDefault();
    console.log("button clicked", event.target);
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "All"}</button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
