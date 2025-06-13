import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    profileImage: '',
    bio: '',
    location: '',
    interests: [],
    settings: {
      contactsOnly: false,
      secretChatMode: false,
    },
  });

  const [initialUser, setInitialUser] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Get username and email from localStorage after login/signup
    const username = localStorage.getItem('username') || '';
    const email = localStorage.getItem('email') || '';
    const initial = {
      username,
      email,
      profileImage: '',
      bio: '',
      location: '',
      interests: [],
      settings: {
        contactsOnly: false,
        secretChatMode: false,
      },
    };
    setUser(initial);
    setInitialUser(initial);
  }, []);

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
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInterestsChange = (e) => {
    setUser((prev) => ({
      ...prev,
      interests: e.target.value.split(',').map((i) => i.trim()),
    }));
  };

  // Handle profile image file selection and preview
  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      // If you want to upload to server, do it here
    }
  };

  // Helper to compare user objects (shallow for this use case)
  const isUserChanged = () => {
    if (!initialUser) return true;
    return (
      user.username !== initialUser.username ||
      user.email !== initialUser.email ||
      user.profileImage !== initialUser.profileImage ||
      user.bio !== initialUser.bio ||
      user.location !== initialUser.location ||
      user.settings.contactsOnly !== initialUser.settings.contactsOnly ||
      user.settings.secretChatMode !== initialUser.settings.secretChatMode ||
      JSON.stringify(user.interests) !== JSON.stringify(initialUser.interests)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUserChanged()) {
      alert('You did not change anything.');
      navigate('/lumeno');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/users/postuserdetails', user);
      alert('Profile updated!');
      navigate('/lumeno');
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="profile-avatar-wrapper">
          <img
            className="profile-avatar"
            src={user.profileImage || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
            alt={user.username}
          />
          <button
            type="button"
            className="profile-avatar-add-btn"
            onClick={handleProfileImageClick}
            title="Add profile image"
          >
            +
          </button>
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
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </label>
          <label>
            Profile Image URL:
            <input
              type="text"
              name="profileImage"
              value={user.profileImage}
              onChange={handleChange}
              placeholder="Profile image URL"
            />
          </label>
          <label>
            Bio:
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleChange}
              placeholder="Your location"
            />
          </label>
          <label>
            Interests (comma separated):
            <input
              type="text"
              name="interests"
              value={user.interests.join(', ')}
              onChange={handleInterestsChange}
              placeholder="e.g. Bonds, Trading, Finance"
            />
          </label>
          <label>
            Work/Education:
            <input
              type="text"
              name="WorkEducation"
              value={user.WorkEducation}
              onChange={handleChange}
              placeholder="Your work/education"
            />
          </label>
          <fieldset className="profile-settings">
            <legend>Settings</legend>
            <label>
              <input
                type="checkbox"
                name="contactsOnly"
                checked={user.settings.contactsOnly}
                onChange={handleChange}
              />
              Contacts Only
            </label>
            <label>
              <input
                type="checkbox"
                name="secretChatMode"
                checked={user.settings.secretChatMode}
                onChange={handleChange}
              />
              Secret Chat Mode
            </label>
          </fieldset>
        </div>
        <div className="profile-actions">
          <button className="profile-save-btn" type="submit">
            Save
          </button>
          <button
            className="profile-skip-btn"
            type="button"
            onClick={() => navigate('/lumeno')}
          >
            Skip
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;