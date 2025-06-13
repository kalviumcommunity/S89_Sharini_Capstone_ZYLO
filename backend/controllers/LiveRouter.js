const express = require('express');
const Live = require('../models/Live'); // Adjust the path as necessary

const router = express.Router();

// Create a new live meeting
router.post('/postlivemeetingdetails', async (req, res) => {
    try {
        const liveMeeting = new Live(req.body);
        const savedMeeting = await liveMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all live meetings
router.get('/getlivemeetingdetails', async (req, res) => {
    try {
        const liveMeetings = await Live.find().populate('host participants chat.sender');
        res.status(200).json(liveMeetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific live meeting by ID
router.get('/getlivemeetingdetails/:id', async (req, res) => {
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

// Update a live meeting by ID
router.put('/updatelivemeetingdetails/:id', async (req, res) => {
    try {
        const updatedMeeting = await Live.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedMeeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.status(200).json(updatedMeeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a live meeting by ID
router.delete('/deletelivemeetingdetails/:id', async (req, res) => {
    try {
        const deletedMeeting = await Live.findByIdAndDelete(req.params.id);
        if (!deletedMeeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.status(200).json({ message: 'Meeting deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;