const express = require("express");
const router = express.Router();

const dummyUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", profileImage: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", bio: "Software engineer", location: "NY", interests: ["Coding", "Gaming"], isOnline: true, settings: { contactsOnly: true, secretChatMode: false } },
  { id: 2, name: "Bob", email: "bob@example.com", profileImage: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", bio: "Graphic designer", location: "LA", interests: ["Art", "Music"], isOnline: false, settings: { contactsOnly: false, secretChatMode: true } },
];

router.get("/usersdetails", (req, res) => {
  res.status(200).json({ message: "All users retrieved", users: dummyUsers });
});

router.get("/usersdetails/:id", (req, res) => {
  const user = dummyUsers.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User retrieved", user });
});

module.exports = router;