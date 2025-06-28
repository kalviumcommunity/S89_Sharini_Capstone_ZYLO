import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Lumeno.css';

const Lumeno = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Get current user's email from localStorage
  const currentUserUsername = localStorage.getItem('username');

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:2309/api/users/getuserdetails');
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
      {/* <div className="lumeno-banner">
        <img
          src="https://i.pinimg.com/736x/f1/47/e2/f147e2eed67f2a7e4f3f2585d1c60f06.jpg"
          alt="Connect with others"
          className="lumeno-banner-img"
          style={{ width: '100%', maxWidth: 500, margin: '0 auto', display: 'block' }}
        />
      </div> */}

      <div className="lumeno-users-list">
        {users
          .filter(user => user.username !== currentUserUsername) // Filter out current user
          .map((user) => (
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