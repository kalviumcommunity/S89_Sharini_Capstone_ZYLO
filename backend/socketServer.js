// sockets/socketServer.js
const { Server } = require("socket.io");
const Message = require("./models/Chatschema");

function setupSocket(server) {
  const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});
  const onlineUsers = {};

  io.on("connection", socket => {
    socket.on("join", userId => {
      if (!userId) return;
      userId = userId.toString();
      onlineUsers[userId] = onlineUsers[userId] || new Set();
      onlineUsers[userId].add(socket.id);
      socket.userId = userId;
      console.log(`[Socket] User ${userId} connected on ${socket.id}`);
    });

    socket.on("send_message", async data => {
      const { sender: rawSender, receiver: rawReceiver, content, type, isOnline } = data;
      const sender = rawSender?.toString(), receiver = rawReceiver?.toString();

      try {
        const message = await Message.create({ sender, receiver, content, type, isOnline });
        console.log("[DB] Saved message:", message._id);

        [receiver, sender].forEach(user => {
          onlineUsers[user]?.forEach(sockId => {
            io.to(sockId).emit("receive_message", message);
            console.log(`[Socket] Emitted to ${user} via ${sockId}`);
          });
        });
      } catch (err) {
        console.error("[Error] Message save failed:", err);
        socket.emit("error_message", { message: "Failed", error: err });
      }
    });

    socket.on("disconnect", () => {
      const userId = socket.userId;
      if (userId && onlineUsers[userId]) {
        onlineUsers[userId].delete(socket.id);
        if (onlineUsers[userId].size === 0) delete onlineUsers[userId];
        console.log(`[Socket] ${userId} disconnected from ${socket.id}`);
      }
    });
  });
}

module.exports = setupSocket;
