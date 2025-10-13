import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Styles/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/api/userAuth/signup', { username, email, password });
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('token', response.data.token);
    alert('you have successfully signed up!');
    navigate('/profile');
  } catch (error) {
    alert(error.response?.data?.message || 'Signup failed');
  }
};

  return (
    <div className="signup-split-page">
      <div className="signup-box">
        <div className='signup-welcome'>
            <h2>Create Account</h2>
            <p>Join now to connect, share, and create lasting memories—one chat at a time!</p>
        </div>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button  className="signup-button" type="submit">Sign Up</button>
        </form>
        <p className="signup-footer">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
      <div className="signup-image-side">
        <img
          className="signup-side-img"
          src="https://i.pinimg.com/736x/a2/f0/07/a2f0071658250d32770dc899083d3c41.jpg"
          alt="Signup Visual"
        />
      </div>
    </div>
  );
};

export default Signup;