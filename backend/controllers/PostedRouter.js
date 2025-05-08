const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/postmemories', async (req, res) => {
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
    res.status(500).json({ message: 'Internal server error'});
  }


});

router.get('/getMemories/:id', async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found with this id' });
    }
    res.status(200).json({ message: 'Posts found', posts });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

router.get('/getMemories', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: 'All posts retrieved', posts });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
});

module.exports = router;