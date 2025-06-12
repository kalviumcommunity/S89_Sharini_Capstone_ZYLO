const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create user
router.post('/postuserdetails', async (req, res) => {
  try {
    const { username, email, profileImage, bio, location, interests, WorkEducation, settings } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    const newUser = new User({
      username,
      email,
      profileImage,
      bio,
      location,
      interests,
      WorkEducation,
      settings
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error in POST /postuserdetails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get user by ID
router.get('/getuserdetails/:id', async (req, res) => {  
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User retrieved successfully', user });
  } catch (error) {
    console.error('Error in GET /getuserdetails/:id:', error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
});

// Get all users
router.get('/getuserdetails', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'All users retrieved successfully', users });
  } catch (error) {
    console.error('Error in GET /getuserdetails:', error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
});

// Update user
router.put('/updateuserdetails/:id', async (req, res) => {
  try {
    const { username, email, profileImage, bio, location, interests, WorkEducation, settings } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, profileImage, bio, location, interests, WorkEducation, settings },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error in PUT /updateuserdetails/:id', error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
});

// Delete user
router.delete('/deleteuserdetails/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /deleteuserdetails/:id', error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
}); 

module.exports = router;