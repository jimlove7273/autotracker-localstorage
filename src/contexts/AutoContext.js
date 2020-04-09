// -----------------------------------------------------------------------------
// Context: AutoContext.js
//
// Description: This context initialize a Context for the site: AutoContext
//              and a Provider: AutoProvider
//
// States:      autorec, setAutorec: contains actual data from localStorage
//              formdata, setFormdata: contains data in the form - Formentry.js
//              recaction, setRecaction: contains form actions of 'add' or 'edit'
// -----------------------------------------------------------------------------
import React, { createContext, useState } from 'react'

export const AutoContext = createContext()

export const AutoProvider = props => {

  const [ autorec, setAutorec ] = useState([])
  const [ formdata, setFormdata ] = useState({
    record: 0,
    servicedate: '',
    service: '',
    mileage: '',
    cost: 0
  })
  const [ recaction, setRecaction ] = useState('add')

  const returning = {
    autorec, setAutorec, formdata, setFormdata, recaction, setRecaction
  }

  return (
    <AutoContext.Provider value={returning}>
      {props.children}
    </AutoContext.Provider>
  )

}