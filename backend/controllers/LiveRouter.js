const express = require('express');
const Live = require('../models/Live'); 

const router = express.Router();

router.post("/liveMeetingDetails", async (req, res) => {
    try {
      const { meetingTitle, host, participants, startTime, meetingLink, chat } = req.body;
  
      if (!meetingTitle || !host || !startTime || !meetingLink) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  
      const newMeeting = new Live({ meetingTitle, host, participants, startTime, meetingLink, chat });
      await newMeeting.save();
  
      res.status(201).json({ message: "Live meeting created", liveMeeting: newMeeting });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  });

module.exports = router;