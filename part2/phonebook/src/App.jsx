import { useState } from "react";

const Names = ({ persons, filter }) => {
  const searchTerm = filter.trim().toLowerCase();
  const filteredPersons =
    searchTerm === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(searchTerm));

  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.name}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  );
};

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

    setPersons(persons.concat({ name: newPerson.name, number: newPerson.number }));
    setNewPerson({ name: "sample name", number: "666448877" });
  };

  return (
    <>
      <h2>Phonebook</h2>
      filter shown with : <input value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
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
      <Names persons={persons} filter={filter} />
      <h2>Debug:</h2>
      <div>
        Name: {newPerson.name} - Number: {newPerson.number}
      </div>
      <div>Filter: {filter}</div>
    </>
  );
}

export default App;
