const express = require("express");
const router = express.Router();

const dummyMessages = [
  {
    id: 1,
    sender: { id: 101, name: "Alice" },
    receiver: { id: 102, name: "Bob" },
    content: "Hey Bob, how's it going?",
    type: "text",
    expiresAt: null,
    timestamp: "2025-05-07T14:30:00Z",
  },
  {
    id: 2,
    sender: { id: 102, name: "Bob" },
    receiver: { id: 101, name: "Alice" },
    content: "Just finished a project, feeling great!",
    type: "text",
    expiresAt: null,
    timestamp: "2025-05-07T14:35:00Z",
  },
  {
    id: 3,
    sender: { id: 103, name: "Charlie" },
    receiver: { id: 101, name: "Alice" },
    content: "Check out this cool GIF!",
    type: "gif",
    isSecret: false,
    expiresAt: null,
    timestamp: "2025-05-07T15:00:00Z",
  },
];

router.get("/messages", (req, res) => {
  res.status(200).json({ message: "Messages retrieved", messages: dummyMessages });
});

router.get("/messages/:id", (req, res) => {
  const message = dummyMessages.find((msg) => msg.id === parseInt(req.params.id));

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.status(200).json({ message: "Message retrieved", messageData: message });
});

module.exports = router;