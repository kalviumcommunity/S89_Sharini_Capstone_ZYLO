import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Components/Homepage'
import Chatpage from './Components/Chatpage'
import Lumeno from './Components/lumeno'
import UsrProfile from './Components/UsrProfile'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/chat/:userId" element={<Chatpage/>} />
        <Route path='/lumeo' element={<Lumeno/>} />
        <Route path='/userProfile' element={<UsrProfile/>} />
    </Routes>
  )
}

export default AllRoutes
