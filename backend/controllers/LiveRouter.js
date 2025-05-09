const express = require("express");
const Live = require("../models/Live");

const router = express.Router();

router.post("/liveMeetingDetails", async (req, res) => {
  try {
    const { meetingTitle, host, participants = [], startTime, meetingLink, chat = [] } = req.body;

    if (!meetingTitle || !host || !startTime || !meetingLink) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const newMeeting = new Live({ meetingTitle, host, participants, startTime, meetingLink, chat });
    await newMeeting.save();
    res.status(201).json({ message: "Live meeting created", liveMeeting: newMeeting });
  } catch (error) {
    console.error("Error creating live meeting:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/allMeetings", async (req, res) => {
  try {
    const meetings = await Live.find();
    res.status(200).json({ message: "Live meetings retrieved", meetings});
  } catch (error) {
    console.error("Error retrieving live meetings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/allMeetings/:id",async(req,res)=>{
  try {
    const meetingById = await Live.findById(req.params.id)
    res.status(200).json({message:"Live meetings retrieved by Id",meetingById});
  } catch (error) {
    console.error("Error retrieving live meetings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put('/updateMeetingDetails/:id', async (req, res) => {
  try {
      const updatedMeeting = await Live.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedMeeting) {
          return res.status(404).json({ error: 'Meeting not found' });
      }
      res.status(200).json(updatedMeeting);
  } catch (error) {
      console.error("Error updating live meetings:", error);
      res.status(500).json({message:"Invalid data formatte"});
  }
});

module.exports = router;