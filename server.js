// Example Node.js App
// Save this to server.js in your project directory.
// refer - https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku
// refer - http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
// refer - https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
// refer - https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
// https://github.com/messerli90/restful-node-api/blob/products/app/controllers/userCtrl.js

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./server/config/config');
var app = express();

// Connect to DB
var db = config.database;
mongoose.connect(db);

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./server/middlewares/validateRequest')]);

app.use('/', require('./server/routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start the server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});