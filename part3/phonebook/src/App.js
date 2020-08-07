import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('error')

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setNewFilter(event.target.value)

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} handleNameChange={handleNameChange} newNumber={newNumber} setNewNumber={setNewNumber} handleNumberChange={handleNumberChange} setMessage={setMessage} setMessageType={setMessageType} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} newFilter={newFilter} setMessage={setMessage} setMessageType={setMessageType}/>
    </div>
  )
}

export default App
