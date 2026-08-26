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
    setNewPerson(currentPerson => ({
      ...currentPerson,
      [name]: value,
    }));
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
  const initialPerson = {
    name: "sample name",
    number: "666448877",
  };

  const addPerson = event => {
    event.preventDefault();

    if (!newPerson.name.trim() || !newPerson.number.trim()) {
      alert("Name and number are required");
      return;
    }

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newPerson.name.toLowerCase(),
    );

    const request = existingPerson
      ? window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`,
        )
        ? personsService.update(existingPerson.id, newPerson)
        : null
      : personsService.create(newPerson);

    if (!request) return;

    request
      .then(savedPerson => {
        setPersons(currentPersons =>
          existingPerson
            ? currentPersons.map(person => (person.id === savedPerson.id ? savedPerson : person))
            : [...currentPersons, savedPerson],
        );

        setNewPerson(initialPerson);
      })
      .catch(error => {
        console.error("Saving person failed:", error);
        alert("Saving person failed");
      });
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
