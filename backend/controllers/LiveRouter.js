const express = require("express");
const router = express.Router();

const dummyLiveMeetings = [
  {
    id: 1,
    meetingTitle: "Team Sync-Up",
    host: { id: 101, name: "Alice" },
    participants: [{ id: 102, name: "Bob" }, { id: 103, name: "Charlie" }],
    startTime: "2025-05-07T10:00:00Z",
    endTime: "2025-05-07T11:00:00Z",
    meetingLink: "https://meet.example.com/team-sync",
    isActive: true,
    chat: [
      { sender: { id: 102, name: "Bob" }, message: "Hey team!", timestamp: "2025-05-07T10:05:00Z" },
      { sender: { id: 103, name: "Charlie" }, message: "All set for the discussion!", timestamp: "2025-05-07T10:10:00Z" }
    ]
  },
  {
    id: 2,
    meetingTitle: "Project Kickoff",
    host: { id: 104, name: "Dave" },
    participants: [{ id: 105, name: "Emma" }],
    startTime: "2025-05-07T14:00:00Z",
    meetingLink: "https://meet.example.com/project-kickoff",
    isActive: false,
    chat: [{ sender: { id: 105, name: "Emma" }, message: "Excited for the new project!", timestamp: "2025-05-07T14:05:00Z" }]
  }
];

router.get("/getmettingdetails", (req, res) => {
  res.status(200).json({ message: "All live meetings retrieved", liveMeetings: dummyLiveMeetings });
});

router.get("/getmettingdetails/:id", (req, res) => {
  const liveMeeting = dummyLiveMeetings.find((meeting) => meeting.id === parseInt(req.params.id));

  if (!liveMeeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }

  res.status(200).json({ message: "Live meeting retrieved", liveMeeting });
});

module.exports = router;