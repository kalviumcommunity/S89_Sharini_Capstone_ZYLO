import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Styles/MemoryList.css";
import Navbar from './Navbar';

const MemoryList = () => {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const navigate = useNavigate();

  const fetchMemories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/posts/getMemories');
      setPosts(res.data.posts);
    } catch (err) {
      console.error("Error fetching memories:", err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleReaction = async (postId, type) => {
    try {
      await axios.post(`http://localhost:8000/api/posts/react/${postId}`, { type });
      fetchMemories();
    } catch (err) {
      console.error("Reaction error:", err);
    }
  };

  const handleComment = async (postId) => {
    const text = commentInput[postId];
    if (!text?.trim()) return;

    try {
      await axios.post(`http://localhost:8000/api/posts/addComment/${postId}`, { text });
      setCommentInput(prev => ({ ...prev, [postId]: '' }));
      fetchMemories();
    } catch (err) {
      console.error("Add comment error:", err);
    }
  };

  const handleDeleteComment = async (memoryId, commentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/deleteComment/${memoryId}/${commentId}`);
      fetchMemories();
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  return (
    <div className="memories-page">
      <div className="hero-section">
        <Navbar />
        <h1 className="hero-text">📸 Capture memories, share your vibes</h1>
        <button onClick={() => navigate('/vibeForm')} className="upload-button">Upload Memory</button>
      </div>

      <h2 className="gallery-heading">🌟 Share Your Vibes 🌟</h2>

      <div className="memory-gallery">
        {posts.map(post => (
          <div className="memory-card" key={post._id}>
            <img src={post.image} alt="memory" className="memory-image" />
            <h3>{post.caption}</h3>
            <p>{post.description}</p>

            <div className="reactions">
              <button onClick={() => handleReaction(post._id, 'like')}>👍 {post.reactions?.like || 0}</button>
              <button onClick={() => handleReaction(post._id, 'love')}>❤️ {post.reactions?.love || 0}</button>
            </div>

            <div className="comments">
              {post.comments?.map(comment => (
                <div key={comment._id} className="comment">
                  💬 {comment.text}
                  <button onClick={() => handleDeleteComment(post._id, comment._id)}>❌</button>
                </div>
              ))}
            </div>

            <div className="comment-box">
              <input
                type="text"
                value={commentInput[post._id] || ''}
                onChange={(e) =>
                  setCommentInput(prev => ({ ...prev, [post._id]: e.target.value }))
                }
                placeholder="Add a comment..."
              />
              <button onClick={() => handleComment(post._id)}>Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryList;
