import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {

  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const handleFilterChange = event => setNewFilter(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} newFilter={newFilter} />
    </div>
  );
}

export default App;
