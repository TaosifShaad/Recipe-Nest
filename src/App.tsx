import { useState } from 'react'
import React from 'react'
import Recipe from './components/Recipe'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Recipe />
    </>
  )
}

export default App
