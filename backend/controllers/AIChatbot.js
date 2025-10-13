const express = require("express");
const axios = require("axios");
const router = express.Router();

const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.AI_CHATBOT_API;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await axios.post(
      `${GEMINI_API}?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: message }] }],
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

module.exports = router;
