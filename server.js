 // Example Node.js App
    // Save this to server.js in your project directory.
    // refer - https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku
    var http = require('http')
    var port = process.env.PORT || 3000;
    var host = process.env.HOST || '0.0.0.0';
    http.createServer(function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World from Nitrous\n');
    }).listen(port, host);
    console.log("Server running at "+host+":"+port);