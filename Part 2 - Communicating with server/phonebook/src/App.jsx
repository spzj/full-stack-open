import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch(() => alert("unable to fetch persons from server"));
  }, []);

  /**
   * Handles errors during form submission of new person.
   * @returns {boolean} True if there are errors, false otherwise.
   */
  const handleFormErrors = () => {
    const isNameEmpty = newName === "";
    const isNumberEmpty = newNumber === "";

    if (isNameEmpty && isNumberEmpty) {
      alert("name and number fields cannot be empty");
      return true;
    } else if (isNameEmpty) {
      alert("name field cannot be empty");
      return true;
    } else if (isNumberEmpty) {
      alert("number field cannot be empty");
      return true;
    }

    if (!/^[0-9\s()+-]+$/.test(newNumber)) {
      alert(
        "number field can only contain contain digits [0-9], dash [-], plus [+], parentheses [()] and whitespaces."
      );
      return true;
    }

    for (const p of persons) {
      if (newName === p.name) {
        alert(`${newName} is already added to phonebook`);
        return true;
      } else if (newNumber === p.number) {
        alert(
          `${newNumber} is already added to phonebook under the contact: ${p.name}`
        );
        return true;
      }
    }

    return false;
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (handleFormErrors()) return;

    const newPerson = {
      id: `${persons.length + 1}`,
      name: newName,
      number: newNumber,
    };

    personsService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        // Reset form inputs
        setNewName("");
        setNewNumber("");
      })
      .catch(() => alert(`unable to add ${newPerson.name}`));
  };

  const handleDeleteClick = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {   
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => alert(`unable to delete ${name}`));
    }
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
      <Persons
        filteredPersons={filter === "" ? persons : filteredPersons}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default App;
