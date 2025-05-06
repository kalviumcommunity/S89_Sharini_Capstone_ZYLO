const express = require('express');
const Message = require('../models/Chat');

const router = express.Router();

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

router.get('/messages/:id', async (req, res) => {
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

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender receiver');
    res.status(200).json({ message: 'Messages retrieved', messages });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});



module.exports = router;