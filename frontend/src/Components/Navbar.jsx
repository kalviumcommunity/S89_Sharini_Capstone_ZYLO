import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ Load profile image from localStorage (fallback to default avatar)
  const profileImage =
    localStorage.getItem("profileImage") ||
    "https://planetsains.com/wp-content/uploads/2022/09/anonymous-avatar-icon-25.png";

  return (
    <div className="navbar">
      {/* Logo */}
      <div>
        <h1 className="navbar-logo">ZYLO</h1>
      </div>

      {/* Center buttons */}
      <div className="navbar-buttons">
        <button onClick={() => navigate("/lumeno")} className="navbar-button">
          lumeno
        </button>
        <button onClick={() => navigate("/vibe")} className="navbar-button">
          vibes
        </button>
        <button onClick={() => navigate("/chat")} className="navbar-button">
          chat
        </button>
        <button onClick={() => navigate("/synera")} className="navbar-button">
          synera
        </button>
      </div>

      {/* Right profile picture */}
      <div className="navbar-profile-wrapper">
        <img
          src={profileImage}
          alt="Profile"
          className="navbar-profile"
          onClick={() => navigate("/userProfile")}
        />
      </div>
    </div>
  );
};

export default Navbar;
