import React from 'react'

function Table( { countries } ) {
  console.log("Countries inside the table", countries)
  return (
    <div className="table">
        {countries.map(({country, cases}) => {
          return(
            <tr>
                <td>{country}</td>
                <td>
                    <strong>{cases}</strong>
                </td>
            </tr>
          )
        })}
    </div>
  )
}

export default Table
