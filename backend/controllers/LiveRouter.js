const express = require('express');
const Live = require('../models/Live'); 

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const liveMeeting = new Live(req.body);
        const savedMeeting = await liveMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const liveMeetings = await Live.find().populate('host participants chat.sender');
        res.status(200).json(liveMeetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const liveMeeting = await Live.findById(req.params.id).populate('host participants chat.sender');
        if (!liveMeeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.status(200).json(liveMeeting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;