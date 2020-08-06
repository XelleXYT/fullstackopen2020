import React from 'react'
import Languages from './Languages'

const Country = (props) => {
    const { country } = props

    return (
        <>
            <div>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h2>languages</h2>
                <Languages country={country} />
                <img src={country.flag} alt={country.name + ' flag'} width={'100px'}/>
            </div>
        </>
    )
}

export default Country