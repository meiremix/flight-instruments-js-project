const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

let data = {};

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('index.html', 'utf8', (err, content) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache'
        });
        res.end(content);
      }
    });
  } else if (req.url === '/data') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3001, () => {
  console.log('HTTP server started on port 3001');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const receivedData = JSON.parse(message);
      data = receivedData;
      console.log('Received data:', receivedData);
    } catch (error) {
      console.error('Invalid data received:', message);
    }
  });
});

