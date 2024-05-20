import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "040-1234567" },
  ]);
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

    if (!(/^[0-9+\-\+\(\)]+$/.test(newNumber))) {
        alert("number field can only contain contain digits [0-9], dash [-], plus [+] and parentheses [()]")
        return;
    }

    for (const p of persons) {
      if (newName === p.name) {
        alert(`${newName} is already added to phonebook`);
        return;
      } else if (newNumber === p.number) {
        alert(`${newNumber} is already added to phonebook under the contact: ${p.name}`);
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

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((p) => (
        <p key={p.id}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  );
};

export default App;
