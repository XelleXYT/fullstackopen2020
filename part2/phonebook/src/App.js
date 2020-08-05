import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { id:1, name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons.filter(person => person.name === newName).length)
    if(persons.filter(person => person.name === newName).length !== 0){
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        id: persons.length + 1,
        name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person)=>(<div key={person.id}>{person.name}</div>))}
    </div>
  )
}

export default App
