import { useState } from 'react'
import React from 'react'
import Recipe from './components/Recipe'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Recipe />
    </>
  )
}

export default App
