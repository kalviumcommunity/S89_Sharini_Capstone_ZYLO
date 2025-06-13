const express = require('express');
const Message = require('../models/Chat');

const router = express.Router();

// CREATE - POST /messages - Create a new message
router.post('/messages', async (req, res) => {
  try {
    const { sender, receiver, content, type, isSecret, expiresAt } = req.body;
    const newMessage = new Message({
      sender,
      receiver,
      content,
      type,
      isSecret,
      expiresAt
    });
    await newMessage.save();
    res.status(201).json({ message: 'Message created', messageData: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// READ - GET /messages/:id - Get a message by ID
router.get('/getmessages/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('sender receiver');
    if (message) {
      res.status(200).json({ message: 'Message retrieved', messageData: message });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// READ - GET /messages - Get all messages
router.get('/getmessages', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender receiver');
    res.status(200).json({ message: 'Messages retrieved', messages });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// UPDATE - PUT /messages/:id - Update a message by ID
router.put('/messages/:id', async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedMessage) {
      res.status(200).json({ message: 'Message updated', messageData: updatedMessage });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// DELETE - DELETE /messages/:id - Delete a message by ID
router.delete('/messages/:id', async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (deletedMessage) {
      res.status(200).json({ message: 'Message deleted' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});



module.exports = router;