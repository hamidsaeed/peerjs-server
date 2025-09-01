// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);

app.use(cors());

// Health check route
app.get("/", (req, res) => {
  res.send("Socket.IO signaling server is running ✅");
});

// Attach Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*", // ⚠️ in production, replace with your Connect domain
    methods: ["GET", "POST"]
  }
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Render provides PORT
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO signaling server running on port ${PORT}`);
});
