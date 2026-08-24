import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "sample name", number: "666448877" });
  const [filter, setFilter] = useState("");

  const handlePersonChange = event => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
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

    setPersons(
      persons.concat({ name: newPerson.name, number: newPerson.number, id: Math.max(...persons.map(p => p.id)) + 1 }),
    );
    setNewPerson({ name: "sample name", number: "666448877" });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} person={newPerson} onChange={handlePersonChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
      <h2>Debug:</h2>
      <div>
        Name: {newPerson.name} - Number: {newPerson.number}
      </div>
      <div>Filter: {filter}</div>
    </>
  );
}

export default App;
