import { useState } from 'react'
import './App.css'
import {
  MenuItem, FormControl, Select
} from "@mui/material"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value="abc">
              <MenuItem value="worldwide">Worldwie</MenuItem>
              <MenuItem value="worldwide">Option Two</MenuItem>
              <MenuItem value="worldwide">Option Three</MenuItem>
              <MenuItem value="worldwide">Yoooooo</MenuItem>
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
