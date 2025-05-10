import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lumeno = () => {
  const navigate = useNavigate();

  const nearbyUsers = [
    { id: 1, name: 'Sharini', distance: '1.2 km' },
    { id: 2, name: 'Bob', distance: '2.5 km' },
    { id: 3, name: 'Charlie', distance: '3.8 km' },
  ];

  const handleChat = (userId) => {
    // Navigate to the chat page with the selected user's ID
    navigate(`/chat/${userId}`);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Map Section */}
      <div
        style={{
          height: '300px',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h2>Map Placeholder</h2>
      </div>

      {/* Nearby Users Section */}
      <div>
        <h1 style={{ fontSize: '2rem', color: '#007bff', marginBottom: '20px' }}>
          Nearby Users
        </h1>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {nearbyUsers.map((user) => (
            <li
              key={user.id}
              style={{
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{user.name}</span>
              <span style={{ color: '#555' }}>{user.distance}</span>
              <button
                onClick={() => handleChat(user.id)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lumeno;