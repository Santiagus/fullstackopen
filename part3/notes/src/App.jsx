import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
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
      .then(returnedNotes => {
        setNotes(notes.concat(returnedNotes));
        setNewNote("Note " + notes.length);
        setMessage({ content: `Added ${returnedNotes.content}`, class: "info" });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(error => {
        console.error("Error adding note:", error);
      });
  };

  const handleNoteChange = event => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNotes => {
        setNotes(notes.map(n => (n.id !== id ? n : returnedNotes)));
        setMessage({ content: `Updated ${returnedNotes.content}`, class: "info" });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(error => {
        // alert(`Error updating note: ${error.message}`);
        setMessage({
          content: `Note '${note.content}' was already removed from server`,
          class: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "All"}</button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input id="note" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
