const express = require("express");
const router = express.Router();

const dummyPosts = [
  { id: 1, caption: "Beautiful sunset", content: "A breathtaking view at the beach." },
  { id: 2, caption: "Delicious food", content: "Tried an amazing pizza today!" },
  { id: 3, caption: "Coding journey", content: "Learning React and loving it!" },
];


router.get("/postmemories/:caption", (req, res) => {
  const caption = req.params.caption.toLowerCase();
  const posts = dummyPosts.filter((post) => post.caption.toLowerCase().includes(caption));

  if (posts.length === 0) {
    return res.status(404).json({ message: "No posts found with this caption" });
  }

  res.status(200).json({ message: "Posts found", posts });
});

router.get("/postmemories", (req, res) => {
  res.status(200).json({ message: "All posts retrieved", posts: dummyPosts });
});

module.exports = router;