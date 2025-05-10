import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', position: 'relative', height: '100vh' }}>
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 style={{ fontSize: '3rem', color: '#007bff' }}>Welcome to Zylo</h1>
        <p style={{ fontSize: '1.2rem', color: 'white', marginTop: '20px' }}>
          Connect, chat, and share your moments with friends. Start your journey now!
        </p>
        <button
          style={{
            marginTop: '30px',
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/lumeno')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Homepage;