import React from "react";
import { useNavigate } from "react-router-dom";

const UserList = ({ users, myUsername }) => {
  const navigate = useNavigate();

  return (
    <div className="chat-user-list">
      <h3>Users</h3>
      {users
        .filter((user) => user.username !== myUsername)
        .map((user) => (
          <div
            key={user._id}
            className="chat-user-list-item"
            onClick={() => navigate(`/chat/${user._id}`)}
          >
            <img
              src={
                user.profileImage ||
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              alt={user.username}
              className="chat-user-list-avatar"
            />
            <div style={{ flex: 1 }}>
              <span>{user.username}</span>
              <div className="user-status">
                {user.isOnline ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserList;