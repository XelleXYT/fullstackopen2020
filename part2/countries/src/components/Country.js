import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const Country = (props) => {
    const { country } = props

    return (
        <>
            <div>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <Languages country={country} />
                <img src={country.flag} alt={country.name + ' flag'} width={'100px'}/>
                <Weather countryCapital={country.capital}/>
            </div>
        </>
    )
}

export default Country