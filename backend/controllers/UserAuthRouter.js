const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserAuth');

const router = express.Router();


router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: user._id, username: user.username, email: user.email, password: user.password }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, username: user.username, password: user.password } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;