const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// POST: Create a new post
router.post('/posts', async (req, res) => {
  try {
    const { user, image, caption, description, filters, reactions, comments } = req.body;

    const newPost = new Post({
      user,
      image,
      caption,
      description,
      filters,
      reactions,
      comments
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

// GET: Find posts by caption
router.get('/posts/caption/:caption', async (req, res) => {
  try {
    const caption = req.params.caption;
    const posts = await Post.find({ caption: { $regex: caption, $options: 'i' } });

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found with this caption' });
    }

    res.status(200).json({ message: 'Posts found', posts });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

// ✅ GET: Fetch all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: 'All posts retrieved', posts });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

module.exports = router;
