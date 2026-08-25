const Persons = ({ persons, filter }) => {
  const searchTerm = filter.trim().toLowerCase();
  const filteredPersons =
    searchTerm === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(searchTerm));

  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.id}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
