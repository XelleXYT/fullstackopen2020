import React from 'react'

const Languages = (props) => {
    const { country } = props

    return (
        <>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map((language)=>(<li key={language.iso639_2}>{language.name}</li>))}
            </ul>
        </>
    )
}

export default Languages