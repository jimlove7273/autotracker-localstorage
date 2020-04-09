// -----------------------------------------------------------------------------
// File: App.js
//
// Description: This is the heart of the application where it wraps the components
//              with AutoProvider from AutoContext.js, which provides various data
//              for the components
// -----------------------------------------------------------------------------
import React from 'react';
import './App.css';

import { AutoProvider } from './contexts/AutoContext'

// -- Import Components
import { Formentry } from './components/Formentry'
import { Table } from './components/Table'

function App() {
  return (
    <AutoProvider>
      <div className="container">
        <h1>Auto-Tracker</h1>
        <div className="grid-1 grid-md-1-3">
          <Formentry />
        </div>
        <div className="grid-1 grid-md-2-3">
          <Table />
        </div>
      </div>
    </AutoProvider>
  );
}

export default App;
