import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "sample name", number: "666448877" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then(persons => {
      console.log("getAll response: ", persons);
      console.log("Persons fetched from server:", persons);
      setPersons(persons);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const handlePersonChange = event => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleDelete = id => {
    // Confirm person deletion
    const person = persons.find(person => person.id === id);
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    // Request deletion to server
    personsService
      .remove(id)
      .then(() => {
        setPersons(currentPersons => currentPersons.filter(person => person.id !== id));
      })
      .catch(error => {
        console.error("Error deleting person:", error);
      });
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

    const existingPerson = persons.find(person => person.name === newPerson.name);

    if (existingPerson) {
      if (!window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        return;
      }
      personsService
        .update(existingPerson.id, newPerson)
        .then(updatedPerson =>
          setPersons(persons => persons.map(person => (person.id === updatedPerson.id ? updatedPerson : person))),
        );
    } else personsService.create(newPerson).then(response => setPersons(persons.concat(response)));
    setNewPerson({ name: "sample name", number: "666448877" });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} person={newPerson} onChange={handlePersonChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={handleDelete} />
      <h2>Debug:</h2>
      <div>
        Name: {newPerson.name} - Number: {newPerson.number}
      </div>
      <div>Filter: {filter}</div>
    </>
  );
}

export default App;
