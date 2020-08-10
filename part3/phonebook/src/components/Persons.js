import React from 'react'
import personService from '../services/persons'

const Persons = (props) => {
    const {persons, setPersons, newFilter, setMessage, setMessageType} = props

    const deletePerson = (person) => {
        if(window.confirm(`Delete ${person.name} ?`)){
        personService
            .deletePerson(person)
            .then(() => {
                personService
                    .getPersons()
                    .then(refreshedPersons => {
                        setPersons(refreshedPersons)
                        setMessageType('success')
                        setMessage(`Information of ${person.name} has been removed from server`)
                    })
            })
            .catch(error => {
                setMessageType('error')
                setMessage(error.response.data.error)
                console.error(error.response.data.error)
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const filterPersons = () => {
        const auxPersons = persons.filter( (person) => (
            person.name.toLowerCase().includes(newFilter.toLowerCase())
        ))
        return(
            auxPersons.map((person)=>(
                <div key={person.id}>
                    {person.name} {person.number} <button onClick={() => {deletePerson(person)}}>delete</button>
                </div>
            ))
        )
    }

    return (
        <>
            {filterPersons()}
        </>
    )
}

export default Persons