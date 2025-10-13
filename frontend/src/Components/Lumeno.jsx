import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Lumeno.css';
import Navbar from './Navbar';

const Lumeno = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Get current user's email from localStorage
  const currentUserUsername = localStorage.getItem('username');

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/getuserdetails');
        // Log the response to debug
        console.log('Fetched users:', res.data);
        // Correctly set users from res.data.users
        setUsers(Array.isArray(res.data.users) ? res.data.users : []);
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
        <Navbar />

        <div>
        <h1 className="lumeno-title">Lumeno</h1>
        <p className="lumeno-subtitle">Connect with others and share your experiences</p>
        </div>

      <div className="lumeno-users-list">
        {users
          .filter(user => user.username !== currentUserUsername) // Filter out current user
          .map((user) => (
            <div className="lumeno-user-card" key={user._id}>
              <img
                className="lumeno-user-avatar"
                src={user.profileImage || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
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