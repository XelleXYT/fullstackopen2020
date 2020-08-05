import React from 'react'

const Persons = (props) => {
    const {persons, newFilter} = props

    const filterPersons = () => {
        const auxPersons = persons.filter( (person) => (
            person.name.toLowerCase().includes(newFilter.toLowerCase())
        ))
        return(
            auxPersons.map((person)=>(<div key={person.id}>{person.name} {person.number}</div>))
        )
    }

    return (
        <>
            {filterPersons()}
        </>
    )
}

export default Persons