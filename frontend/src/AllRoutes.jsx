import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Components/Homepage'
import UsrProfile from './Components/UsrProfile'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path='/userProfile' element={<UsrProfile/>} />
    </Routes>
  )
}

export default AllRoutes
