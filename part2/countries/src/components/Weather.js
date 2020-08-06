import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const { countryCapital } = props
    const api_key = process.env.REACT_APP_API_KEY
    const [ weather, setWeather ] = useState(null)

    console.log(countryCapital, api_key)
    console.log(weather)

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryCapital}`)
          .then(response => {
            setWeather(response.data)
          })
      },[])

    return(
        <>
            <h2>Weather in {countryCapital}</h2>
            { weather && 
                <div>
                    <div><b>temperature: </b>{weather.current.temperature} Celsius</div>
                    <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}/>
                    <div><b>wind: </b>{weather.current.wind_speed} mph in direction {weather.current.wind_dir}</div>
                </div>
            }
        </>
    )

}

export default Weather

