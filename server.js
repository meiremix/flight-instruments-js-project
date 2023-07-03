const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

let data = {};

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Serve the index.html file
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, content) => {
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
    // Serve the data endpoint
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(data));
  } else if (req.url === '/script.js') {
    // Serve the script.js file
    const filePath = path.join(__dirname, 'script.js');
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'no-cache'
        });
        res.end(content);
      }
    });
  } else if (req.url === '/style.css') {
    // Serve the styles.css file
    const filePath = path.join(__dirname, 'style.css');
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/css',
          'Cache-Control': 'no-cache'
        });
        res.end(content);
      }
    });
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
