import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    noteService.getAll().then(initialNotes => {
      console.log("Notes fetched from server:", initialNotes.data);
      setNotes(initialNotes.data);
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

    noteService
      .create(noteObject)
      .then(response => {
        console.log("Note added to server:", response.data);
        setNotes(notes.concat(response.data));
        setNewNote("Note " + notes.length);
      })
      .catch(error => {
        console.error("Error adding note:", error);
      });
  };

  const handleNoteChange = event => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  const toggleImportanceOf = id => {
    console.log(`Toggling importance of note with id: ${id}`);
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(response => {
        console.log("Note updated on server:", response.data);
        setNotes(notes.map(n => (n.id !== id ? n : response.data)));
      })
      .catch(error => {
        console.error("Error updating note:", error);
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "All"}</button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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
