import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import Modal from "./components/Modal";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import NotificationType from "./constants/NotificationType";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState(NotificationType.NORMAL);
  const [openModal, setOpenModal] = useState(false);

  const showNotification = (type, message, duration = 3000) => {
    setNotifType(type);
    setNotifMessage(message);
    setTimeout(() => {
      setNotifMessage(null);
    }, duration);
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log(error);
        showNotification(
          NotificationType.ERROR,
          "Unable to fetch persons from server."
        );
      });
  }, []);

  /**
   * Handles errors during form submission of new person.
   * @returns {boolean} True if there are errors, false otherwise.
   */
  const handleFormErrors = () => {
    const isNameEmpty = newName === "";
    const isNumberEmpty = newNumber === "";

    if (isNameEmpty && isNumberEmpty) {
      showNotification(
        NotificationType.ERROR,
        "Name and number fields cannot be empty."
      );
      return true;
    } else if (isNameEmpty) {
      showNotification(NotificationType.ERROR, "Name field cannot be empty.");
      return true;
    } else if (isNumberEmpty) {
      showNotification(NotificationType.ERROR, "Number field cannot be empty.");
      return true;
    }

    if (!/^[0-9\s()+-]+$/.test(newNumber)) {
      showNotification(
        NotificationType.ERROR,
        "Number field can only contain contain digits [0-9], dash [-], plus [+], parentheses [()] and whitespaces."
      );
      return true;
    }

    if (persons.some((p) => p.number === newNumber)) {
      showNotification(
        NotificationType.ERROR,
        `${newNumber} is already added to phonebook under the contact: ${persons.find((p) => p.number === newNumber).name}.`
      );
      return true;
    }

    return false;
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (handleFormErrors()) return;

    const handleConfirmation = (name) => {
      return confirm(
        `${name} is already added to the phonebook, replace the old number with a new one?`
      );
    };

    const resetFormInputs = () => {
      setNewName("");
      setNewNumber("");
    };

    const foundPerson = persons.find((p) => p.name === newName);

    if (foundPerson) {
      if (handleConfirmation(newName)) {
        const newPerson = {
          id: `${foundPerson.id}`,
          name: newName,
          number: newNumber,
        };

        personsService
          .update(newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.name === newName ? returnedPerson : p))
            );
            showNotification(
              NotificationType.SUCCESS,
              `Updated number for ${newName} in phonebook.`
            );
            resetFormInputs();
          })
          .catch((error) => {
            console.log(error);
            showNotification(
              NotificationType.ERROR,
              `Unable to update ${newPerson.name} in phonebook.`
            );
          });
      }
    } else {
      const newPerson = {
        id: `${persons.length + 1}`,
        name: newName,
        number: newNumber,
      };

      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showNotification(
            NotificationType.SUCCESS,
            `Added ${newName} in phonebook.`
          );
          resetFormInputs();
        })
        .catch((error) => {
          console.log(error);
          showNotification(
            NotificationType.ERROR,
            `Unable to add ${newPerson.name} to phonebook.`
          );
        });
    }
  };

  const handleDeleteClick = ({ id, name }) => {
    if (confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          showNotification(
            NotificationType.SUCCESS,
            `Deleted ${name} from phonebook.`
          );
        })
        .catch((error) => {
          console.log(error);
          showNotification(NotificationType.ERROR, `Unable to delete ${name}.`);
        });
    }
  };

  const handleCreateClick = (event) => {
    event.preventDefault();
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

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
    <div className="container md:w-[80%]">
      <h2 className="mt-5 mb-10 text-4xl text-center font-bold tracking-tight text-indigo-600">
        Phonebook
      </h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
        handleCreateClick={handleCreateClick}
      />

      <Persons
        filteredPersons={filter === "" ? persons : filteredPersons}
        handleDeleteClick={handleDeleteClick}
      />
      <Modal openModal={openModal} closeModal={closeModal}>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-indigo-600">
          Add contact
        </h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
        <Notification message={notifMessage} type={notifType} />
      </Modal>
    </div>
  );
};

export default App;
