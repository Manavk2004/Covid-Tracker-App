import { useState, useEffect } from 'react'
import './App.css'
import {
  MenuItem, FormControl, Select, Card
} from "@mui/material"

import InfoBox from "./components/InfoBox.jsx"
import { Map } from "./components/Map.jsx"
import Table from "./components/Table.jsx"

function App() {
  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState("worldwide")
  const [ specificCountryInfo, setSpecificCountryInfo ] = useState("")
  const [ countryCode, setCountryCode ] = useState("")
  const [ tableData, setTableData ] = useState([])

  // Gets the basic data for the each of the countries
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

  // Gets the data for the table on the right side
  useEffect(() => {
    if(tableData.length === 0){
      const getCountryCases = async() => {
        await fetch('https://disease.sh/v3/covid-19/countries')
          .then(response => response.json())
          .then(data => {
            console.log("The data", data)
            setTableData(data)
          
          })
      }

      getCountryCases()
    }
  })



  useEffect(() => {
    console.log(country)
  }, [country])

  useEffect(() => {
    console.log('specific country info', specificCountryInfo)
  }, [specificCountryInfo])

  useEffect(() => {
    console.log('the country code', countryCode)
  }, [countryCode])

  useEffect(() => {
    console.log('the table data', tableData)
  }, [tableData])


  function handleClick(event){
    const country = event.target.value
    setCountry(country)

    async function onCountryChange(event){
      const countryCode = event.target.value
      const url = countryCode === "Worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSpecificCountryInfo(data)
          setCountryCode(countryCode)
        })
    }
    onCountryChange(event)



  }

  return (
    <>
        <div className="app">
          <div className="app__left">
            <div className="app__header">
              <h1>COVID-19 TRACKER</h1>
              <FormControl className="app_dropdown">
                <Select variant="outlined" value={country} onChange={(event) => handleClick(event)}>
                  <MenuItem value="worldwide">Worldwide</MenuItem>
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

          <div className="app__stats">
            <InfoBox title="Coronavirus Cases" cases={specificCountryInfo.cases} total={2000} />
            <InfoBox title="Recovered" cases={specificCountryInfo.recovered} total={3000} />
            <InfoBox title="Deaths" cases={specificCountryInfo.deaths} total={4000} />
          </div>

          <Map />
          <Card className="app_right">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide New Cases</h3>
          </Card>
        </div>

    </>
  )
}

export default App
