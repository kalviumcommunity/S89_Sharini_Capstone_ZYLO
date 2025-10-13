import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { socket } from "../socket";
import "../Styles/Chat.css";
import Navbar from "./Navbar";

const Chat = () => {
  const { userId } = useParams();
  const myUserId = localStorage.getItem("userId");
  const myUsername = localStorage.getItem("username");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 for search
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (myUserId && !socket.connected) {
      socket.connect();
      socket.emit("join", myUserId);
    }
    return () => {
      socket.disconnect();
    };
  }, [myUserId]);

  useEffect(() => {
    const handleReceive = (msg) => {
      if (
        (msg.sender === myUserId && msg.receiver === userId) ||
        (msg.sender === userId && msg.receiver === myUserId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, [userId, myUserId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/getuserdetails");
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:8000/api/users/getuserdetails/${userId}`);
        setUser(res.data.user || null);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/chats/getmessages/conversation?user1=${myUserId}&user2=${userId}`
        );
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("Failed to fetch messages", err);
        setMessages([]);
      }
    };
    if (userId && myUserId) fetchMessages();
  }, [userId, myUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit("send_message", {
      sender: myUserId,
      receiver: userId,
      content: input,
      type: "text",
      isOnline: true,
    });
    setInput("");
  };

  // 🔹 Filter users by search
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
      u.username !== myUsername
  );

  return (
    <>
      <Navbar />
      <div className="chat-layout">
        {/* Sidebar with users */}
        <div className="chat-user-list">
          {/* 🔹 Search bar */}
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="chat-search"
          />

          {filteredUsers.map((u) => (
            <div
              key={u._id}
              className={`chat-user-list-item${u._id === userId ? " active" : ""}`}
              onClick={() => navigate(`/chat/${u._id}`)}
            >
              <img
                src={
                  u.profileImage ||
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                }
                alt={u.username}
                className="chat-user-list-avatar"
              />
              <div style={{ flex: 1 }}>
                <span>{u.username}</span>
                <div className="user-score-bar-container">
                  <div
                    className="user-score-bar"
                    style={{
                      width: `${Math.min(u.score || 0, 100)}%`,
                    }}
                  />
                </div>
                <span className="user-score-label">{u.score || 0}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chat */}
        <div className="chat-main">
          {user ? (
            <>
              <div className="chat-header">
                <img
                  src={
                    user.profileImage ||
                    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  }
                  alt={user.username}
                  className="chat-user-avatar"
                  onClick={() => navigate(`/profile`)}
                />
                <span className="chat-user-name">{user.username || "User"}</span>
                <span className="chat-user-status">Online</span>
              </div>

              <div className="chat-messages">
                {messages.length === 0 ? (
                  <div style={{ color: "#888", textAlign: "center", marginTop: "2rem" }}>
                    No messages yet.
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={msg._id || idx}
                      className={`chat-message ${msg.sender === myUserId ? "from-me" : "from-them"}`}
                    >
                      <span>{msg.content}</span>
                      <div className="chat-message-time">
                        {msg.createdAt &&
                          new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="chat-input-bar" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                  className="chat-input"
                />
                <button type="submit" className="chat-send-button">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="chat-placeholder">Select a user to start chatting</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
