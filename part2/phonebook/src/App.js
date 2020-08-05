import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { id:1, name: 'Arto Hellas', number: '+34-612345678' },
    { id:2, name: 'Ada Lovelace', number: '+34-622345678' },
    { id:3, name: 'Dan Abramov', number: '+34-632345678' },
    { id:4, name: 'Mary Poppendieck', number: '+34-642345678' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} handleNameChange={handleNameChange} newNumber={newNumber} setNewNumber={setNewNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter}/>
    </div>
  )
}

export default App
