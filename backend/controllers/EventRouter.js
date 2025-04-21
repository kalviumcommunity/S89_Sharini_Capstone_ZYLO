const express = require('express');
const router = express.Router();


const events = [
  { id: 'e1', name: 'NY Tech Meetup', location: 'NY', attendees: ['1', '2'] },
  { id: 'e2', name: 'Music Fest', location: 'LA', attendees: ['2', '3'] }
];


router.get('/', async (req, res) => {
  try {
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error', error });
  }
});


router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = events.find(e => e.id === eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error', error });
  }
});


router.get('/:eventId/attendees', async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = events.find(e => e.id === eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const attendees = event.attendees.map(id => ({ id, name: `User ${id}` }));
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error', error });
  }
});

module.exports = router;