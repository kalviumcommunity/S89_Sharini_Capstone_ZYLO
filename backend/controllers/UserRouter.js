const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/postuserdetails', async (req, res) => {
  try {
    const { name, email, profileImage, bio, location, interests, isOnline, settings } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists with this email' });
    }
    const newUser = new User({
      name,
      email,
      profileImage,
      bio,
      location,
      interests,
      isOnline,
      settings
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }

});


module.exports = router;
