import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div style={{display:"flex", gap:"20px", margin:"20px"}}>
      <div onClick={() => navigate("/")}>
        <h2>Home</h2>
      </div> 
        <div onClick={() => navigate("/userProfile")}>
            <h2>User Profile</h2>
        </div>

    </div>
  )
}

export default Navbar
