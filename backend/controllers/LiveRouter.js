const express = require("express");
const Live = require("../models/Live");

const router = express.Router();


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
    const meetingById = await Live.findById(req.params.id);
    if(!meetingById){
      return res.status(404).json({message:"Meeting not found"});
    }
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
          return res.status(404).json({ message: 'Meeting not found' });
      }
      res.status(200).json(updatedMeeting);
  } catch (error) {
      console.error("Error updating live meetings:", error);
      res.status(500).json({message:"Internal server error"});
  }
});

router.delete('/cancelMeeting/:id', async (req, res) => {
  try {
      const deletedMeeting = await Live.findByIdAndDelete(req.params.id);
      if (!deletedMeeting) {
          return res.status(404).json({ message: 'Meeting not found' });
      }
      return res.status(200).json({ message: 'Meeting cancelled successfully' }); 
  } catch (error) {
      console.error("Error cancelling live meetings:", error);
      return res.status(500).json({message:"Internal server error" });
  }
});

module.exports = router;