const express = require('express');
const Message = require('../models/Chat');

const router = express.Router();

router.post("/message", async (req, res) => {
  try {
    const { sender, receiver, content, type, expiresAt } = req.body;

    if (!sender || !receiver || !content) {
      return res.status(400).json({ message: "Sender, receiver, and content are required" });
    }

    const newMessage = new Message({ sender, receiver, content, type, expiresAt });
    await newMessage.save();

    res.status(201).json({ message: "Message created", messageData: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }

});




module.exports = router;