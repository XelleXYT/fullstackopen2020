import React from 'react'
import axios from 'axios'

const PersonForm = (props) => {
    const{ persons, setPersons, newName, setNewName, handleNameChange, newNumber, setNewNumber, handleNumberChange} = props

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
            axios
                .post('http://localhost:3001/persons', personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    return (
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
    )
}

export default PersonForm