const http = require('http');
// The developer is trying to import the logMessage function
// using destructuring, assuming an object is returned.
const { logMessage } = require('./utils/log');

const server = http.createServer((req, res) => {
  // This line will crash the server because logMessage is undefined.
  logMessage('A new request was received!'); 

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is attempting to run at http://localhost:${PORT}/`);
});