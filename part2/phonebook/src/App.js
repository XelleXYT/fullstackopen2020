import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { id:1, name: 'Arto Hellas', number: '+34-612345678' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length !== 0){
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

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
        {persons.map((person)=>(<div key={person.id}>{person.name} {person.number}</div>))}
    </div>
  )
}

export default App
