import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/userAuth/login', { username, password });
      localStorage.setItem('username', response.data.user.username);
      alert('Login successful!');
      navigate('/lumeno'); // Redirect to user profile or home page
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-split-page">
      <div className="login-image-side">
        <img
          className="login-side-img"
          src="https://i.pinimg.com/736x/a8/4e/7c/a84e7c6ce83b799bd8318ee0de2bc451.jpg"
          alt="Login Visual"
        />
      </div>
      <div className="login-box">
        <div className='login-welcome'>
            <h2>Welcome Back</h2>
        <p>Login to a world of connections.</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;