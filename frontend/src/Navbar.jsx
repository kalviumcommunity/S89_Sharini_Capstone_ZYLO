import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div style={{display:"flex", gap:"20px", margin:"20px"}}>
      <div onClick={() => navigate("/")}>
        <button>Home</button>
      </div>

      <div onClick={() => navigate("/chat")}>
        <button>Chat</button>
      </div>
        <div onClick={() => navigate("/lumeo")}>
            <button>Lumeno</button> 
        </div>  
        <div onClick={() => navigate("/userProfile")}>
            <button >User Profile</button>
        </div>

    </div>
  )
}

export default Navbar
