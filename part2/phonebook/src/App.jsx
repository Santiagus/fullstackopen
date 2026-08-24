import { useState } from "react";

const Names = ({ persons }) => {
  const allNames = persons.map(person => (
    <ul key={person.name}>
      {person.name} - {person.number}
    </ul>
  ));
  return <div>{allNames}</div>;
};

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "644554466" },
    { name: "Phillip Philiphos", number: "644554477" },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "sample name", number: "666448877" });

  const handlePersonChange = event => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const addPerson = event => {
    event.preventDefault();

    if (newPerson.name === "") {
      alert(`No name entered`);
      return;
    }
    if (newPerson.number === "") {
      alert(`No number entered`);
      return;
    }

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already in the phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newPerson.name, number: newPerson.number }));
    setNewPerson({ name: "sample name", number: "666448877" });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>
            name : <input name="name" value={newPerson.name} onChange={handlePersonChange} />
          </p>
          <p>
            number : <input name="number" value={newPerson.number} onChange={handlePersonChange} />
          </p>
        </div>
        <button type="submit"> add </button>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons} />

      <h2>Debug:</h2>
      <div>
        Name: {newPerson.name} - Number: {newPerson.number}
      </div>
    </>
  );
}

export default App;
