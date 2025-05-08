const express = require('express');
const Message = require('../models/Chat');

const router = express.Router();

router.post('/messages', async (req, res) => {
  try {
    const { sender, receiver, content, type, expiresAt } = req.body;
    const newMessage = new Message({
      sender,
      receiver,
      content,
      type,
      expiresAt
    });
    await newMessage.save();
    res.status(201).json({ message: 'Message created', messageData: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
  
});

module.exports = router;