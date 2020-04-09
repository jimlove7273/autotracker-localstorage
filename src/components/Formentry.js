// -----------------------------------------------------------------------------
// File: Formentry.js
//
// Description: This is the Form component of the application
//
// Things to Note:
// 1. useEffect is used to attach unique record number to 'record' with current Date/Time when adding
// 2. formdata contains data/information from the Form Input fields
// 3. Note: data.sort((a, b) ... ) is used to sort the JavaScript Object
// -----------------------------------------------------------------------------
import React, { useEffect, useContext } from 'react'
import { AutoContext } from '../contexts/AutoContext'

export const Formentry = () => {

  const { autorec, setAutorec, formdata, setFormdata, recaction, setRecaction } = useContext(AutoContext)

  const initialValue = {
    record: 0,
    servicedate: '',
    service: '',
    mileage: '',
    cost: 0
  }


useEffect(() => {
  setFormdata({...formdata, record: Date.now() })
}, [autorec, setFormdata])


const formsubmit = e => {

  e.preventDefault()

  let autoData = []
  autoData = localStorage.getItem("auto-tracker")
  if ( autoData != null) {
    autoData = JSON.parse(autoData)
  }

  if ( recaction === 'add' ) {
    const data = [...((autoData && autoData) || []), {formdata}]
    localStorage.setItem("auto-tracker", JSON.stringify(data))
    data.sort((a, b) => (a.formdata.servicedate > b.formdata.servicedate) ? 1 : -1)

    setAutorec(data)
    setFormdata(initialValue)
  }

  if ( recaction === 'edit' ) {
    let recnumber = formdata.record
    var newautorec = autorec.filter((item) => item.formdata.record !==  recnumber)
    const data = [...((newautorec && newautorec) || []), {formdata}]
    data.sort((a, b) => (a.formdata.servicedate > b.formdata.servicedate) ? 1 : -1)

    localStorage.setItem("auto-tracker", JSON.stringify(data))
    setAutorec(data)
    setFormdata(initialValue)
    setRecaction('add')
  }

}

  return (
    <div>
      <form onSubmit={formsubmit}>
        <label htmlFor="servicedate">Date</label>
        <input type="text" id="servicedate" name="servicedate" value={formdata.servicedate} onChange={e=>setFormdata({...formdata, servicedate: e.target.value})} /><br />
        <label htmlFor="service">Service</label>
        <select id="service" name="service" value={formdata.service} onChange={e=>setFormdata({...formdata, service: e.target.value})}>
          <option></option>
          <option>Oil Change</option>
          <option>Tire Rotation</option>
          <option>Brake Service</option>
          <option>Other Service</option>
        </select>
        <br />
        <label htmlFor="mileage">Mileage</label>
        <input type="text" id="mileage" name="mileage" value={formdata.mileage} onChange={e=>setFormdata({...formdata, mileage: e.target.value})} /><br />
        <label htmlFor="cost">Cost</label>
        <input type="text" id="cost" name="cost" value={formdata.cost} onChange={e=>setFormdata({...formdata, cost: e.target.value})} /><br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
