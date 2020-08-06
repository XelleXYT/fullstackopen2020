import React from 'react'
import personService from '../services/persons'

const PersonForm = (props) => {
    const{ persons, setPersons, newName, setNewName, handleNameChange, newNumber, setNewNumber, handleNumberChange} = props

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.filter(person => person.name === newName).length !== 0) {
            const person = persons.filter(person => person.name === newName)[0]
            if (person.number !== newNumber) {
                if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                    const personObject = {
                        id: person.id,
                        name: person.name,
                        number: newNumber
                    }
                    personService
                        .updatePerson(personObject)
                        .then(() => {
                            personService
                                .getPersons()
                                .then(refreshedPersons => {
                                    setPersons(refreshedPersons)
                                })
                        })
                    setNewName('')
                    setNewNumber('')
                }
            } else {
                alert(`${newName} is already added to phonebook with that number`)
            }
        } else {
            const personObject = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            personService
                .createPerson(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
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