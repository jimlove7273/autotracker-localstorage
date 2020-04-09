// -----------------------------------------------------------------------------
// File: Table.js
//
// Description: This Table component populates the data into the Table
//
// Things to Note:
// 1. useEffect is used once to get data from localStorage into autoData variable
// -----------------------------------------------------------------------------
import React, { useEffect, useContext } from 'react'
import { AutoContext } from '../contexts/AutoContext'


export const Table = () => {

  const { autorec, setAutorec, setFormdata, setRecaction } = useContext(AutoContext)

  useEffect(() => {
    const autoData = localStorage.getItem("auto-tracker")
    if (autoData) {
      let sorteddata = JSON.parse(autoData)
      sorteddata.sort((a, b) => (a.formdata.servicedate > b.formdata.servicedate) ? 1 : -1)
      setAutorec(sorteddata)
    }
  }, [setAutorec]);


  const editautorec = (id) => {
    var filteredrec = autorec.filter((item) => item.formdata.record === id)
    setFormdata(filteredrec[0].formdata)
    setRecaction('edit')
  };


  const delautorec = (id) => {
    if (window.confirm('Are you sure you want to delete record: ' + id)) {
      var newautorec = autorec.filter((item) => item.formdata.record !==  id)
      localStorage.setItem("auto-tracker", JSON.stringify(newautorec))
      setAutorec(newautorec)
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td></td><td></td><td>Rec</td><td>Date</td><td>Service</td><td>Mileage</td><td>Cost</td>
          </tr>
        </thead>
        <tbody>
          {
            autorec.map((autorecord) =>
              <tr key={autorecord.formdata.record}>
                <td><div className="tblaction" onClick={()=>editautorec(autorecord.formdata.record)}>&#9998;</div></td>
                <td><div className="tblaction" onClick={()=>delautorec(autorecord.formdata.record)}>&#10006;</div></td>
                <td>{autorecord.formdata.record}</td>
                <td>{autorecord.formdata.servicedate}</td>
                <td>{autorecord.formdata.service}</td>
                <td>{autorecord.formdata.mileage}</td>
                <td>{autorecord.formdata.cost}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
