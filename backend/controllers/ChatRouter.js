const express = require('express');
const router = express.Router();

// Dummy data
const chats = [
  { chatId: 'chat1', participants: ['1', '2'], messages: ['Hi', 'Hey there!'] },
  { chatId: 'chat2', participants: ['1', '3'], messages: ['Yo', 'Hello!'] }
];

const eventChats = [
  { eventId: 'e1', name: 'NY Tech Meetup', chatroomId: 'ev1' },
  { eventId: 'e2', name: 'Music Fest', chatroomId: 'ev2' }
];


router.get('/', (req, res) => {
  try {
    const userChats = chats.filter(chat => chat.participants.includes('1')); // user id = 1
    res.json(userChats);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user chats.', details: error.message });
  }
});


router.get('/:chatId/messages', (req, res) => {
  try {
    const {chatId} = req.params;
    const chat = chats.find(c => c.chatId === chatId);
    if (!chat) {
      return res.status(404).json({ message:"Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message:"An error occurred while fetching chat messages.",error});
  }
});


router.get('/events/rooms', (req, res) => {
  try {
    res.json(eventChats);
  } catch (error) {
    res.status(500).json({ message:"An error occurred while fetching event chatrooms.",error });
  }
});

module.exports = router;