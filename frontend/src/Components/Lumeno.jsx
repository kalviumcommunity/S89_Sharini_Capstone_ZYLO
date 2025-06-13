import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Lumeno = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/getuserdetails');
        // Log the response to debug
        console.log('Fetched users:', res.data);
        // Ensure users is always an array
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleConnect = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="lumeno-root">
      <h1 className="lumeno-title">
        Discover Nearby Users
      </h1>

      <div className="lumeno-map-placeholder">
        <h2>Map Placeholder</h2>
      </div>

      <div className="lumeno-users-list">
        {users.map((user) => (
          <div className="lumeno-user-card" key={user._id}>
            <img
              className="lumeno-user-avatar"
              src={user.profileImage || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
              alt={user.username}
            />
            <h3 className="lumeno-user-name">{user.username}</h3>
            <p className="lumeno-user-desc">{user.WorkEducation || 'No description'}</p>
            <button
              className="lumeno-connect-btn"
              onClick={() => handleConnect(user._id)}
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lumeno;