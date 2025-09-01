const express = require("express");
const { PeerServer } = require("peer");

const PORT = process.env.PORT || 3000;
const PATH = "/connect";

const app = express();

// Start PeerJS server
const peerServer = PeerServer({ port: PORT, path: PATH });
app.use(PATH, peerServer);

// Root route for testing
app.get("/", (req, res) => {
  res.send("✅ PeerJS signaling server is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 PeerJS server running on port ${PORT} at path ${PATH}`);
});
