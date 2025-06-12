const express = require('express');
const Message = require('../models/Chat');

const router = express.Router();


router.post("/message", async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    if (!sender || !receiver || !content) {
      return res.status(400).json({ message: "Sender, receiver, and content are required." });
    }
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();

    res.status(201).json({ message: "Message created", messageData: newMessage });
  } catch (error) {
    console.error("Error in POST /message:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
  
router.get("/getmessages/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 }); // oldest first
    res.status(200).json({ message: "Messages retrieved", messages });
  } catch (error) {
    console.error("Error in GET /getmessages/:user1/:user2:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  router.put('/updateMessages/:id', async (req, res) => {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.status(200).json({ message: 'Message updated', messageData: updatedMessage });
    } catch (error) {
      console.error("Error in PUT /updateMessages/:id:", error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  });  

  router.delete('/deleteMessages/:id', async (req, res) => {
    try {
      const deletedMessage = await Message.findByIdAndDelete(req.params.id);
      if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error("Error in DELETE /deleteMessages/:id:", error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  });


module.exports = router;