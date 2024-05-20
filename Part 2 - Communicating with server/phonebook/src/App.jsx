import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newSearch, setNewSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target);

    const isNameEmpty = newName === "";
    const isNumberEmpty = newNumber === "";

    if (isNameEmpty && isNumberEmpty) {
      alert("name and number fields cannot be empty");
      return;
    } else if (isNameEmpty) {
      alert("name field cannot be empty");
      return;
    } else if (isNumberEmpty) {
      alert("number field cannot be empty");
      return;
    }

    if (!/^[0-9+\-\+\(\)]+$/.test(newNumber)) {
      alert(
        "number field can only contain contain digits [0-9], dash [-], plus [+] and parentheses [()]"
      );
      return;
    }

    for (const p of persons) {
      if (newName === p.name) {
        alert(`${newName} is already added to phonebook`);
        return;
      } else if (newNumber === p.number) {
        alert(
          `${newNumber} is already added to phonebook under the contact: ${p.name}`
        );
        return;
      }
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);

    const filteredPersons = persons.filter((p) =>
      p.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredPersons(filteredPersons);
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with {" "}
        <input value={newSearch} onChange={handleSearchChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((p) => (
        <p key={p.id}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  );
};

export default App;
