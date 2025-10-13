const express = require('express');
const router = express.Router();
const Memory = require('../models/Memoriesschema');

// POST: Create a memory
router.post('/postmemories', async (req, res) => {
  try {
    const { image, caption, description } = req.body;
    if (!image || !caption) return res.status(400).json({ message: 'Image and caption required' });

    const newMemory = new Memory({ image, caption, description });
    await newMemory.save();
    res.status(201).json({ post: newMemory });
  } catch (err) {
    res.status(500).json({ message: 'Error creating memory' });
  }
});

// GET: All memories
router.get('/getMemories', async (req, res) => {
  try {
    const posts = await Memory.find().sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch {
    res.status(500).json({ message: 'Error fetching memories' });
  }
});

// PUT: Update memory
router.put('/updateMemory/:id', async (req, res) => {
  try {
    const { image, caption, description } = req.body;
    const updated = await Memory.findByIdAndUpdate(
      req.params.id,
      { image, caption, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Updated', memory: updated });
  } catch {
    res.status(500).json({ message: 'Error updating memory' });
  }
});

// DELETE: Delete memory
router.delete('/deleteMemory/:id', async (req, res) => {
  try {
    const deleted = await Memory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Memory deleted' });
  } catch {
    res.status(500).json({ message: 'Error deleting memory' });
  }
});

// POST: Add comment
router.post('/addComment/:id', async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) return res.status(404).json({ message: 'Memory not found' });

    memory.comments.push({ text: req.body.text });
    await memory.save();
    res.status(200).json({ memory });
  } catch {
    res.status(500).json({ message: 'Error adding comment' });
  }
});

// DELETE: Remove comment
router.delete('/deleteComment/:memoryId/:commentId', async (req, res) => {
  try {
    const { memoryId, commentId } = req.params;
    const memory = await Memory.findById(memoryId);
    if (!memory) return res.status(404).json({ message: 'Memory not found' });

    memory.comments = memory.comments.filter(comment => comment._id.toString() !== commentId);
    await memory.save();
    res.status(200).json({ memory });
  } catch {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

// POST: React (like/love)
router.post('/react/:id', async (req, res) => {
  try {
    const { type } = req.body;
    const memory = await Memory.findById(req.params.id);
    if (!['like', 'love'].includes(type)) return res.status(400).json({ message: 'Invalid reaction' });
    if (!memory) return res.status(404).json({ message: 'Memory not found' });

    memory.reactions[type]++;
    await memory.save();
    res.status(200).json({ memory });
  } catch {
    res.status(500).json({ message: 'Error reacting' });
  }
});

module.exports = router;
