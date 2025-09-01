// server.js
import express from "express";
import { ExpressPeerServer } from "peer";
import http from "http";
import cors from "cors";

const app = express();

// Enable CORS (important for cross-domain requests)
app.use(cors());

// Basic route for health check
app.get("/", (req, res) => {
  res.send("PeerJS Signaling Server is running");
});

// Create HTTP server
const server = http.createServer(app);

// Create PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",       // use root path
  proxied: true,   // important when behind reverse proxy (Render, Nginx, etc.)
});

// Attach PeerJS to /peerjs endpoint
app.use("/peerjs", peerServer);

// Use Render’s PORT (or default 3000 locally)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`PeerJS server running on port ${PORT}`);
});
