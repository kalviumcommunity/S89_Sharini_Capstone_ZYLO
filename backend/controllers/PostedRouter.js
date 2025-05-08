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
    res.status(500).json({ message: 'Internal server error', error});
  }

});

module.exports = router;
