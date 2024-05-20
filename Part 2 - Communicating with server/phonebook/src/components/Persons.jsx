const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((p) => (
        <p key={p.id}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
