import Note from "./components/Note";

const App = ({ notes }) => {
  const noteItems = notes.map(note => <Note key={note.id} note={note} />);

  return (
    <div>
      <h1>Notes</h1>
      <ul>{noteItems}</ul>
    </div>
  );
};

export default App;
