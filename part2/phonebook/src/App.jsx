import { useState } from "react";

const Names = ({ persons }) => {
  const allNames = persons.map(person => <ul key={person.name}>{person.name}</ul>);
  return <div>{allNames}</div>;
};

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }, { name: "Phillip Philiphos" }]);
  const [newName, setNewName] = useState("sample name");

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addName = event => {
    event.preventDefault();

    if (newName === "") {
      alert(`No name entered`);
      return;
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name : <input value={newName} onChange={handleNameChange} />
        </div>
        <button type="submit"> add </button>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons} />

      <h2>Debug:</h2>
      <div>{newName}</div>
    </>
  );
}

export default App;
