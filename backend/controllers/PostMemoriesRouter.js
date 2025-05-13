const express = require('express');
const router = express.Router();
const Memories = require('../models/Post'); 

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
      return res.status(404).json({ message: 'Post not found with this ID' });
    }
    res.status(200).json({ message: 'Post updated', Memory: updatedPost });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error'});
  }
});

router.delete('/deleteMemories/:id', async (req, res) => {
  try {
    const deletedPost = await Memories.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found with this ID' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error'});
  }
});


module.exports = router;
