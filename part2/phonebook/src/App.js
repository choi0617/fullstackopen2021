import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";

import personServices from './services/personServices';
 

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    personServices.getAll()
      .then(persons => {setPersons(persons)})
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

    personServices.create(personObj)
      .then(returnedPersonObj => {
        //console.log(returnedPersonObj);
        setPersons(persons.concat(returnedPersonObj))
        setNewName("")
        setNewNumber("")
      })
      .catch(e => {
        console.log(e);
      })
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
