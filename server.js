const { PeerServer } = require("peer");

const PORT = process.env.PORT || 3000;

PeerServer({
  port: PORT,
  path: "/connect"
});

console.log(`PeerJS server running on ${PORT}/connect`);
