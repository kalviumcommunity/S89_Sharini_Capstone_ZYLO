import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Lumeno from './Components/Lumeno'
import UserProfile from './Components/UserProfile'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/lumeno' element={<Lumeno/>} />
        <Route path='/profile' element={<UserProfile/>} />
    </Routes>
  )
}

export default AllRoutes
