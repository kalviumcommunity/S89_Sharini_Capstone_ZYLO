const express = require('express');
const Message = require('../models/Chat');

const router = express.Router();

router.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, content, type, expiresAt } = req.body;

    if (!sender || !receiver || !content) {
      return res.status(400).json({ message: "Sender, receiver, and content are required." });
    }

    const newMessage = new Message({ sender, receiver, content, type, expiresAt });
    await newMessage.save();

    res.status(201).json({ message: "Message created", messageData: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }

  router.get("/getmessagea/:id", async (req, res) => {
    try {
      const message = await Message.findById(req.params.id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json({ message: "Message retrieved", messageData: message });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.get("/getmessages", async (req, res) => {
    try {
      const messages = await Message.find();
      res.status(200).json({ message: "Messages retrieved", messages });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
});



module.exports = router;