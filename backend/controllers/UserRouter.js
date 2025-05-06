const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error', error: error.message });
  }
});

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
    res.status(201).json({ msg: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error', error: error.message });
  }
});


module.exports = router;
