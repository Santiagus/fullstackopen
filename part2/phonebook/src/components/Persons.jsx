const Persons = ({ persons, filter, onDelete }) => {
  const searchTerm = filter.trim().toLowerCase();
  const filteredPersons =
    searchTerm === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(searchTerm));

  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
