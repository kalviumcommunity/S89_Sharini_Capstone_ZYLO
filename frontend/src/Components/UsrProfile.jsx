import React, { useState } from 'react';

const UsrProfile = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: 'https://demo.sparklewpthemes.com/buzzstorepro/eshopjet/wp-content/uploads/sites/8/2021/01/image-11.png',
    bio: 'A passionate developer and tech enthusiast.',
    location: 'New York, USA',
    interests: ['Coding', 'Music', 'Traveling'],
    connections: ['User1', 'User2', 'User3'],
    isOnline: true,
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <img
          src={user.profileImage || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'}
          alt="Profile"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '20px',
            objectFit: 'cover',
            backgroundColor: 'black',
          }}
        />
        <h1 style={{ fontSize: '2rem', color: '#007bff', marginBottom: '10px' }}>{user.name}</h1>
        <p style={{ fontSize: '1rem', color: '#555', marginBottom: '15px' }}>{user.bio || 'No bio available'}</p>
        <p style={{ fontSize: '1rem', color: '#555', margin: '5px 0' }}>
          <strong>Email:</strong> {user.email}
        </p>
        <p style={{ fontSize: '1rem', color: '#555', margin: '5px 0' }}>
          <strong>Location:</strong> {user.location || 'No location provided'}
        </p>
        <p style={{ fontSize: '1rem', color: '#555', margin: '5px 0' }}>
          <strong>Interests:</strong> {user.interests && user.interests.length > 0 ? user.interests.join(', ') : 'No interests added'}
        </p>
        <p style={{ fontSize: '1rem', color: '#555', margin: '5px 0' }}>
          <strong>Connections:</strong> {user.connections ? user.connections.join(",") :"No connections yet"}
        </p>
        <p style={{ fontSize: '1rem', color: user.isOnline ? 'green' : 'red', margin: '5px 0' }}>
          <strong>Status:</strong> {user.isOnline ? 'Online' : 'Offline'}
        </p>
      </div>
    </div>
  );
};

export default UsrProfile;