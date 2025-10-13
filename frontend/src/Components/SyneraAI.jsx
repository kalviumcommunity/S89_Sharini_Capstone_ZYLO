import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";   // ✅ Import Markdown renderer
import "../Styles/SyneraAI.css";
import Navbar from "./Navbar";

const STORAGE_KEY = "syneraai_chat_sessions";
const SESSION_INDEX_KEY = "syneraai_active_session";

const SyneraAI = () => {
  const [input, setInput] = useState("");
  const [sessions, setSessions] = useState([[]]);
  const [activeSession, setActiveSession] = useState(0);
  const textareaRef = useRef(null);

  // Load sessions and activeSession from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedIdx = localStorage.getItem(SESSION_INDEX_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed.length ? parsed : [[]]);
      if (savedIdx !== null && parsed[savedIdx]) {
        setActiveSession(Number(savedIdx));
      } else {
        setActiveSession(0);
      }
    } else {
      setSessions([[]]);
      setActiveSession(0);
    }
  }, []);

  // Save sessions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    localStorage.setItem(SESSION_INDEX_KEY, activeSession);
  }, [sessions, activeSession]);

  const chats = sessions[activeSession] || [];

  // Adjust textarea height with max limit
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150); // ✅ Max 150px
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", content: input };
    const updatedChats = [...chats, userMessage];
    setSessions((prev) =>
      prev.map((s, i) => (i === activeSession ? updatedChats : s))
    );
    setInput("");
    textareaRef.current.style.height = "auto";

    try {
      const res = await axios.post("http://localhost:8000/api/aiChatbot/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", content: res.data.reply };
      setSessions((prev) =>
        prev.map((s, i) =>
          i === activeSession ? [...updatedChats, botMessage] : s
        )
      );
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="chatt-app-wrapper">
      <div className="chatt-layout">
        <div className="chatt-container">
          <Navbar />
          <h2>Gemini AI Chatbot</h2>
          <div className="chatt-body">
            <div className="chatt-header">
              <h5>Hello! Welcome to our world.</h5>
              <h5> How can I help you?</h5>
            </div>
            {chats.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                <div className="message-content">
                  
                  {msg.sender === "bot" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown> // ✅ Renders Markdown
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="chatt-footer">
            <textarea
              ref={textareaRef}
              className="chatt-input"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyneraAI;
