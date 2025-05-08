const express = require('express');
const Live = require('../models/Live'); 

const router = express.Router();

router.post('/liveMeetingDetails', async (req, res) => {
    try {
        const liveMeeting = new Live(req.body);
        const savedMeeting = await liveMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        res.status(500).json({ message:"Error creating live meeting " });
    }
});

module.exports = router;