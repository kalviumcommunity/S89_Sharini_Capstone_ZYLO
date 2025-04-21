const express = require('express');
const router = express.Router();

// Dummy data 
const posts = [
  { caption: 'A beautiful day!', content: 'Enjoyed the sunshine and nature today.', reactions: ['😊', '🌞'] },
  { caption: 'Great music vibes', content: 'Listening to some amazing tracks. Loving it!', reactions: ['🎵', '💃'] },
  { caption: 'Tech discoveries', content: 'Exploring the latest gadgets and innovations.', reactions: ['🖥️', '🤩'] },
  { caption: 'Nature adventure', content: 'Hiking through the mountains. What a view!', reactions: ['🌲', '🌄'] }
];

router.get('/caption/:caption', async (req, res) => {
  try {
    const { caption } = req.params;
    const matchingPosts = posts.filter(post => post.caption === caption);
    if (matchingPosts.length === 0) {
      return res.status(404).json({ msg: 'No posts found with the given caption' });
    }
    res.status(200).json(matchingPosts);
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;