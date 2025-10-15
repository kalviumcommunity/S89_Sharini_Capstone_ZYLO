const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const setupSocket = require("./socketServer");
const UserRouter = require("./controllers/UserRouter");
const ChatRouter = require("./controllers/ChatRouter");
const MemoryPost = require("./controllers/MemoryPost"); 
const LiveRouter = require("./controllers/LiveRouter"); 
const UserAuthRouter = require("./controllers/UserAuthRouter")

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/api/users", UserRouter);
app.use("/api/chats", ChatRouter);
app.use("/api/posts", MemoryPost ); 
app.use("/api/userAuth",UserAuthRouter); 
app.use("/api/live",LiveRouter); 
app.use("/api/aiChatbot", require("./controllers/AIChatbot")); // AI Chatbot controller

app.get("/", (req, res) => res.send({ msg: "Welcome to ZYLO,let's start chatting and make friends.." }));

const server = http.createServer(app);
setupSocket(server);

const PORT = process.env.PORT;
server.listen(PORT, async () => {
  try {
    await mongoose.connect("mongodb+srv://sharinisamsani422:yHxZ5kBoJJpr8UhG@cluster0.ztnbq79.mongodb.net/");
    console.log("[DB] MongoDB connected");
    console.log(`[Server] Listening on port ${PORT}`);
  } catch (err) {
    console.error("[Error] DB connection failed:", err);
  }
});
