const http = require('http');
const fs = require('fs');
const path = require('path');

const onRequest = (request, response) => {
  console.log('request ', request.url);
  let filePath = '.' + request.url;
  if (filePath == './')
      filePath = './index.html';

  let contentType = 'text/html';
  fs.readFile(filePath, function(error, content) {    
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content, 'utf-8');
  });
}
http.createServer(onRequest).listen(8888);
