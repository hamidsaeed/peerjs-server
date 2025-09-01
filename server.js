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
  res.send("✅ Connect Signaling Server is running");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Replace with your domain in production
    methods: ["GET", "POST"]
  }
});

// Handle signaling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When user joins a broadcast room
  socket.on("join-broadcast", (room, user) => {
    console.log(`User ${socket.id} joined broadcast room ${room}`);
    socket.join(room);
    socket.to(room).emit("new-join", { user, id: socket.id });
  });

  // Forward messages to other peers in the room
  socket.on("message", (data) => {
    console.log("Message:", data);
    socket.to(data.room).emit("message", data);
  });

  // Handle whisper/private events
  socket.on("whisper", (data) => {
    console.log("Whisper:", data);
    socket.to(data.to).emit("whisper", data);
  });

  // Leaving broadcast
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    socket.broadcast.emit("user-left", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Connect Signaling Server running on port ${PORT}`);
});
