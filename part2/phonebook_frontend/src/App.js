import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

import personServices from "./services/personServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    // don't use controlled components for search inputs
    // does not register the first character input because setState is async
    let inputValue = e.target.value;

    const filteredPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setSearchResults(filteredPersons);
  };

  const checkDuplicateNames = (newName) => {
    return persons.filter((person) => person.name === newName);
  };

  const updatePerson = (name, number) => {
    const personToUpdate = persons.find((person) => person.name === name);
    const ok = window.confirm(
      `${name} already exists. Do you want to update phone number?`
    );
    if (ok) {
      personServices
        .update(personToUpdate.id, {
          name: name,
          number: number,
        })
        .then((returnedObj) => {
          setPersons(
            persons.map((person) =>
              person.id !== personToUpdate.id ? person : returnedObj
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          console.log("failed", err);
          setNotification(
            `${personToUpdate.name} has already been removed from the server`
          );
          setPersons(
            persons.filter((person) => person.id !== personToUpdate.id)
          );
        });
    }
  };

  const addPerson = (e) => {
    e.preventDefault();

    //check for duplicate names
    if (checkDuplicateNames(newName).length > 0) {
      updatePerson(newName, newNumber);
      return alert(`${newName} updated!`);
    } else {
      // axios.POST requires two parameters. First, it needs the URI of the service endpoint.
      // Second, an object which contains the properties that we want to send to our
      // server should be passed to it.

      personServices
        .create({ name: newName, number: newNumber })
        .then((returnedPersonObj) => {
          // returnedPersonObj is the personObj returned.
          setPersons([...persons, returnedPersonObj]);
          setNewName("");
          setNewNumber("");
          setNotification(`${newName} has been created!`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((err) => {
          setNotification(`${err.response.data.error}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (id) => {
    const toDelete = persons.find((person) => person.id === id);
    const confirmDelete = window.confirm(`Delete ${toDelete.name}?`);

    if (confirmDelete) {
      personServices
        .deleteContact(id)
        .then((res) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <div>
        <Search
          handleSearchChange={handleSearchChange}
          searchResults={searchResults}
        />
      </div>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <div>
        {persons.map((person) => (
          <Persons
            id={person.id}
            key={person.id}
            name={person.name}
            number={person.number}
            deletePerson={deletePerson}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
