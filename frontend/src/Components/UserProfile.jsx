import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    _id: null,
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    profileImage: '',
    bio: '',
    location: '',
    interests: [],
    WorkEducation: '',
    settings: {
      contactsOnly: false,
      secretChatMode: false,
    },
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ✅ Fetch logged-in user by email
  useEffect(() => {
    const email = localStorage.getItem('id') || '';
    if (!email) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/getuser/${email}`);
        if (res.data?.user) {
          setUser(res.data.user); // backend must return _id
        }
      } catch (err) {
        console.log('User not found, fallback to defaults.');
      }
    };
    fetchUser();
  }, []);

  // ✅ Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'contactsOnly' || name === 'secretChatMode') {
      setUser((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle interests input
  const handleInterestsChange = (e) => {
    setUser((prev) => ({
      ...prev,
      interests: e.target.value.split(',').map((i) => i.trim()),
    }));
  };

  // ✅ Profile image upload
  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit handler (always update if user already exists)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (user._id) {
        // Update existing user
        response = await axios.put(`http://localhost:8000/api/users/updateuserdetails/${user._id}`, user);
        alert('Profile updated!');
      } else {
        // Create new user
        response = await axios.post('http://localhost:8000/api/users/postuserdetails', user);
        alert('Profile created!');
      }

      // ✅ Sync localStorage with latest values
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
      navigate('/lumeno');
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="profile-avatar-wrapper">
          <img
            className="profile-avatar"
            src={user.profileImage || 'https://planetsains.com/wp-content/uploads/2022/09/anonymous-avatar-icon-25.png'}
            alt={user.username}
          />
          <button type="button" className="profile-avatar-add-btn" onClick={handleProfileImageClick}>+</button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
          />
        </div>

        <div className="profile-fields">
          <label>
            Username:
            <input type="text" name="username" value={user.username} onChange={handleChange} readOnly />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} readOnly />
          </label>
          <label>
            Profile Image URL:
            <input type="text" name="profileImage" value={user.profileImage} onChange={handleChange} />
          </label>
          <label>
            Bio:
            <textarea name="bio" value={user.bio} onChange={handleChange} placeholder="Tell us about yourself" />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={user.location} onChange={handleChange} />
          </label>
          <label>
            Interests (comma separated):
            <input type="text" name="interests" value={user.interests.join(', ')} onChange={handleInterestsChange} />
          </label>
          <label>
            Work/Education:
            <input type="text" name="WorkEducation" value={user.WorkEducation} onChange={handleChange} />
          </label>

          <fieldset className="profile-settings">
            <legend>Settings</legend>
            <label>
              <input type="checkbox" name="contactsOnly" checked={user.settings.contactsOnly} onChange={handleChange} />
              Contacts Only
            </label>
            <label>
              <input type="checkbox" name="secretChatMode" checked={user.settings.secretChatMode} onChange={handleChange} />
              Secret Chat Mode
            </label>
          </fieldset>
        </div>

        <div className="profile-actions">
          <button className="profile-save-btn" type="submit" onClick={handleSubmit}>Save</button>
          <button className="profile-skip-btn" type="button" onClick={() => navigate('/lumeno')}>Skip</button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;