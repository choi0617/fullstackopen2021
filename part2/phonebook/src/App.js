import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import axios from "axios";
 

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456" },
  //   { name: "Ada Lovelace", number: "39-44-5323523" },
  //   { name: "Dan Abramov", number: "12-43-234345" },
  //   { name: "Mary Poppendieck", number: "39-23-6423122" },
  // ]);


  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])


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
        <Search handleSearchChange={handleSearchChange} searchResults={searchResults} />
        
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
       {persons.map(person => <Persons key={person.name} name={person.name} number={person.number}/>)}
      </div>
    
    </div>
  );
};

export default App;
