const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'All users retrieved', users });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
