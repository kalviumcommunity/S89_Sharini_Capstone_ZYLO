const express = require('express');
const Live = require('../models/Live'); 

const router = express.Router();

router.post('/livemettingdetails', async (req, res) => {
    try {
        const liveMeeting = new Live(req.body);
        const savedMeeting = await liveMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;