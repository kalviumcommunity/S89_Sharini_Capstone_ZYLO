import React, { useRef, useState } from "react";
import axios from "axios";
import "../Styles/MemoryForm.css";
import { useNavigate } from "react-router-dom";

const MemoryForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    caption: "",
    description: "",
    reactions: [],
    comments: [],
  });
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Trigger hidden file input
  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Read uploaded image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/posts/postmemories",
        formData
      );
      alert("Memory posted successfully!");
      navigate("/vibe");
    } catch (error) {
      console.error("Error posting memory:", error);
      alert("Failed to post memory");
    }
  };

  return (
    <div className="memory-form-wrapper">
      {/* ✅ Navbar with Back Arrow */}
      <div className="memory-navbar">
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅️
        </button>
        <h2>Create Memory</h2>
      </div>

      <form onSubmit={handleSubmit} className="memory-form">
        {/* Image Upload */}
        <div className="memory-upload" onClick={handleImageUploadClick}>
          {formData.image ? (
            <img src={formData.image} alt="Uploaded Preview" />
          ) : (
            <span className="upload-placeholder">Click to upload image</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {/* Caption */}
        <input
          name="caption"
          placeholder="Caption"
          value={formData.caption}
          onChange={handleChange}
          className="memory-input"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="memory-textarea"
        />

        {/* Submit */}
        <button type="submit" className="memory-button">
          Upload Memory
        </button>
      </form>
    </div>
  );
};

export default MemoryForm;
