const express = require('express');
const router = express.Router();
const Memories = require('../models/Post'); 
router.post('/postmemories', async (req, res) => {
  try {
    const { user, image, caption, description, filters, reactions, comments } = req.body;

    if (!user || !image || !caption) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingPost = await Memories.findOne({ caption });
    if (existingPost) {
      return res.status(400).json({ message: 'Post already exists with this caption' });
    }

    const newPost = new Memories({
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
    if(!posts){
      return res.status(404).json({message:"Post not found"});
    }
    res.status(200).json({ message: 'Posts found', posts }); 
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

router.put('/updateMemories/:id', async (req, res) => {
  try {
    const { user, image, caption, filters, reactions, comments } = req.body;
    const updatedPost = await Memories.findByIdAndUpdate(req.params.id, { user, image, caption, filters, reactions, comments },{ new: true });
    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post updated', post: updatedPost });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error'});
  }
});

module.exports = router;
