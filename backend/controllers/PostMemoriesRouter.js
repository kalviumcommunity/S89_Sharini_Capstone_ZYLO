const express = require('express');
const router = express.Router();
const Memories = require('../models/Post');

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
    const posts = await Memories.findById(req.params.id);
    if(posts){
      return res.status(200).json({ message: 'Posts found', posts });
    }
    res.status(404).json({message:'No Posts are found'});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
});

router.get('/getMemories', async (req, res) => {
  try {
    const posts = await Memories.find();
    res.status(200).json({ message: 'All posts retrieved', posts });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error'});
  }
});

module.exports = router;
