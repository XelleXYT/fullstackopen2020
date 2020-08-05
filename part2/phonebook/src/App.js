import React, { useState } from 'react'

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
  const handleFilterChange = (event) => setNewFilter(event.target.value)

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
      setNewFilter('')
    }
  }

  const filterPersons = () => {
    const auxPersons = persons.filter( (person) => (
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    ))
    return(
      auxPersons.map((person)=>(<div key={person.id}>{person.name} {person.number}</div>))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newFilter} onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
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
        {filterPersons()}
    </div>
  )
}

export default App
