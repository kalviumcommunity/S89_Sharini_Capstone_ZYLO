import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UsrProfile from './Components/UserProfile'
import Homepage from './Components/Homepage'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path='/userProfile' element={<UsrProfile/>} />
    </Routes>
  )
}

export default AllRoutes
