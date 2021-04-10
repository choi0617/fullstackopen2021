import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "123-456-7890" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const checkDuplicateNames = (newName) => {
    return persons.filter((person) => person.name === newName);
  };

  const addPerson = (e) => {
    e.preventDefault();

    // check for duplicate names
    if (checkDuplicateNames(newName).length > 0)
      return alert(`${newName} is already added to the phonebook`);

    const personObj = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  };

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      {persons.map((person) => (
        <Person name={person.name} number={person.number} key={person.name} />
      ))}
      <div>debug: {newName} {newNumber}</div>
    </div>
  );
};

export default App;
