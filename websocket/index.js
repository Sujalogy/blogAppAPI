const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Array of candidate objects
let candidates = [
  { name: 'Sujal', votes: 0, voted: false },
  { name: 'Pulkit Sir', votes: 0, voted: false },
  { name: 'Alber Sir', votes: 0, voted: false }
];

// WebSocket connection handling
wss.on('connection', function connection(ws) {
  console.log('New client connected');

  // Send initial candidate data to the new client
  ws.send(JSON.stringify(candidates));

  ws.on('message', function incoming(message) {
    console.log('Received message:', ""+message);

    // Check if the candidate exists and the user hasn't voted already
    const candidate = candidates.find(c => c.name === ""+message && !c.voted);

    if (candidate) {
      console.log('Valid vote for candidate:', candidate.name);

      // Update the vote count and mark the user as voted
      candidate.votes++;
      candidate.voted = true;

      console.log('Updated candidates:', candidates);

      // Broadcast the updated candidate data to all clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(candidates));
        }
      });
    }
  });
});

// Render the index.ejs template
app.get('/', function (req, res) {
  res.render('vote', { candidates });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
