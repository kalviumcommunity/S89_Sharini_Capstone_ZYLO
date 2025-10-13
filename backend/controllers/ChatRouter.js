const express = require('express');
const Message = require('../models/Chatschema');

const router = express.Router();

// CREATE - POST /messages - Create a new message
router.post('/messages', async (req, res) => {
  try {
    const { sender, receiver, content, type, isOnline, expiresAt } = req.body;
    const newMessage = new Message({
      sender,
      receiver,
      content,
      type,
      isOnline,
      expiresAt
    });
    await newMessage.save();
    res.status(201).json({ message: 'Message created', messageData: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Get all messages between two users (conversation)
router.get('/getmessages/conversation', async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) return res.status(400).json({ messages: [] });

    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ messages: [] });
  }
});

// READ - GET /messages - Get all messages
router.get('/getmessages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ message: 'Messages retrieved', messages });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Get all conversations for a user (inbox)
router.get('/conversations/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Aggregate to get the latest message per conversation
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: userId },
            { receiver: userId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", userId] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" }
        }
      }
    ]);

    res.status(200).json({ conversations: conversations.map(c => c.lastMessage) });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Mark messages as read (optional, if you add a 'read' field to schema)
router.patch('/messages/read', async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    await Message.updateMany(
      { sender, receiver, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Delete all messages in a conversation
router.delete('/messages/conversation', async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    await Message.deleteMany({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    });
    res.status(200).json({ message: 'Conversation deleted' });
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