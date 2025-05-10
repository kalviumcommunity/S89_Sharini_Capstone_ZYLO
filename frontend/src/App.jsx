import React from 'react'
import './App.css'
import AllRoutes from './AllRoutes'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar />
    <AllRoutes/>
    </BrowserRouter>
     </>
  )
}

export default App
