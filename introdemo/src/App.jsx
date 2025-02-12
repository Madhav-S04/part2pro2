import { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  // Hardcoded dummy data for the phonebook
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [numberFilter, setNumberFilter] = useState('');

  // Handle form submission to add a new person with a number
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook!`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  // Handle search input changes for name filter
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search input changes for number filter
  const handleNumberFilterChange = (event) => {
    setNumberFilter(event.target.value);
  };

  // Filter the persons list based on search term (case-insensitive)
  const filteredPersons = persons.filter((person) => {
    const nameMatch = person.name.toLowerCase().includes(searchTerm.toLowerCase());
    const numberMatch = person.number.toLowerCase().includes(numberFilter.toLowerCase());
    return nameMatch && numberMatch;
  });

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search filter for name */}
      <Filter searchTerm={searchTerm} onSearchChange={handleSearchChange} placeholder="Search by name" />

      {/* Search filter for number */}
      <Filter searchTerm={numberFilter} onSearchChange={handleNumberFilterChange} placeholder="Search by number" />

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
