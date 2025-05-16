import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/Homepage'
import LoginPage from './Components/Loginpage'
import SignupPage from './Components/Signuppage'



const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
    </Routes>
  )
}

export default AllRoutes
