function PersonForm({ onSubmit, person, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <input name="name" value={person.name} onChange={onChange} />
      <input name="number" value={person.number} onChange={onChange} />
      <button type="submit">add</button>
    </form>
  );
}

export default PersonForm;
