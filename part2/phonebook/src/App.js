import React, { useState } from "react";
import Person from "./components/Person";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      return person.name.includes(inputValue);
    });
    setSearchResults(filteredPersons);
  };

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
      <div>
        Search: <input onChange={handleSearchChange} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          <h2>Add a new person</h2>
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

      <div>
        <>
          Search Results:
          {searchResults.map((person) => (
            <Person
              name={person.name}
              number={person.number}
              key={person.name}
            />
          ))}
        </>
      </div>
      <div>
        debug: {newName} {newNumber}
      </div>
    </div>
  );
};

export default App;
