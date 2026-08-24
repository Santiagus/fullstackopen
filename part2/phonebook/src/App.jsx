import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name : <input />
        </div>
      </form>
      <div>
        <button type="submit"> add </button>
      </div>
      <h2>Numbers</h2>
    </>
  );
}

export default App;
