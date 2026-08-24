import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }, { name: "Phillip Philiphos" }]);
  const [newName, setNewName] = useState("");
  const Names = ({ persons }) => {
    const allNames = persons.map(person => <ul>{person.name}</ul>);
    return <div>{allNames}</div>;
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name : <input />
        </div>
        <Names persons={persons} />
      </form>
      <div>
        <button type="submit"> add </button>
      </div>
      <h2>Numbers</h2>

      <h2>Debug:</h2>
      <div>{newName}</div>
    </>
  );
}

export default App;
