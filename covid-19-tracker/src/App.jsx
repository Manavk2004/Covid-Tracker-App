import { useState, useEffect } from 'react'
import './App.css'
import {
  MenuItem, FormControl, Select
} from "@mui/material"

function App() {
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
            const countries = data.map((country) => (
              {
                name: country.country,
                value: country.countryInfo.iso3
              }
            ))
            setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  useEffect(() => {
    console.log(countries)
  }, [countries])

  return (
    <>
      <div className="app">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value="abc">
              {countries.map((country) => {
                return <MenuItem value={country.value}>{country.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        {/* {Header} */}
        {/* {Title + Select input dropdown field} */}

        {/* {InfoBoxs} */}
        {/* {InfoBoxs} */}
        {/* {InfoBoxs} */}


        {/* {Table} */}
        {/* {Graph} */}

        {/* {Map} */}

      </div>
    </>
  )
}

export default App
