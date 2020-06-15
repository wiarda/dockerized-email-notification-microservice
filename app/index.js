const http = require('http');
const https = require('https');
const app = require('./app');

const PORT = 3000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
