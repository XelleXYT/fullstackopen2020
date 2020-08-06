import React from 'react'
import Country from './Country'

const Countries = (props) => {
    const { countries, newFilter, setNewFilter } = props

    const filterCountries = () => {
        const auxCountries = countries.filter((country) => (
            country.name.toLowerCase().includes(newFilter.toLowerCase())
        ))

        if (auxCountries.length <= 10) {
            if (auxCountries.length === 1){
                const country = auxCountries[0]
                return (
                    <Country country={country}/>
                )
            }
            return (
                auxCountries.map((country)=>(
                    <div key={country.numericCode}>
                        {country.name}
                        <button onClick={()=>{setNewFilter(country.name)}}>show</button>
                    </div>
                ))
            )
        }
        return (<div>Too many matches, specify another filter</div>)
    }

    return (
        <>
            {filterCountries()}
        </>
    )
}

export default Countries