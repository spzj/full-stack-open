import axios from "axios";
import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

    if (!/^[0-9\s()+-]+$/.test(newNumber)) {
      alert(
        "number field can only contain contain digits [0-9], dash [-], plus [+], parentheses [()] and whitespaces."
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

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    const filteredPersons = persons.filter((p) =>
      p.name.toLowerCase().includes(newFilter.toLowerCase())
    );

    setFilteredPersons(filteredPersons);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filter === "" ? persons : filteredPersons} />
    </div>
  );
};

export default App;
