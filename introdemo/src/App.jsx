import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch initial data from server using useEffect
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle form submission to add a new person
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook!`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    axios.post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons([...persons, response.data]);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.error('Error adding person:', error));
  };

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the persons list based on search term (case-insensitive)
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search filter component */}
      <Filter searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      {/* Form to add new name and number */}
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
        onSubmit={addPerson}
      />

      <h3>Numbers</h3>

      {/* Display filtered persons */}
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
