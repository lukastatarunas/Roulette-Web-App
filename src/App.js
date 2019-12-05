import React from 'react'
import './App.css'
import BaseURL from './components/BaseURL'
import Stats from './components/Stats'
import Events from './components/Events'

const App = () => {
  return (
    <div className="container">
      <BaseURL />
      <Stats />
      <Events />
    </div>
  )
}

export default App