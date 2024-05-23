const Persons = ({ filteredPersons, handleDeleteClick }) => {
  return (
    <div>
      {filteredPersons.map((p) => (
        <div
          key={p.id}
          style={{ display: "flex", alignItems: "center", margin: "-20px auto" }}
        >
          <p>
            {p.name} {p.number}
          </p>
          <button onClick={() => handleDeleteClick(p)} style={{ marginLeft: "10px" }}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
