const http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    // no se necesita bodyparser con la nueva versión de express
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

const secret = require('./config').secret;

const isProduction = process.env.NODE_ENV === 'production',
      isLocal = process.env.NODE_ENV === 'local' || 'local:windows',
      isDevelopment = process.env.NODE_ENV === 'development';

const app = express();

app.use(cors());
// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


if (!isProduction) {
  app.use(errorhandler());
}
if (isProduction){
  // process.env.MONGODB_URI
  // HEROKU LINK: mongodb://heroku_h0zc43f6:448ukq109g7kp33ula7crreer@ds261570.mlab.com:61570/heroku_h0zc43f6
  mongoose.connect('mongodb://heroku_h0zc43f6:448ukq109g7kp33ula7crreer@ds261570.mlab.com:61570/heroku_h0zc43f6');
} 
if (isDevelopment) {
  mongoose.connect('mongodb://juancamejoalarcon:23bocomfi@ds259268.mlab.com:59268/formbaseddocs');
  mongoose.set('debug', true);
}

if (isLocal) {
  mongoose.connect('mongodb://localhost:27017/formbaseddocs');
  mongoose.set('debug', true);
  // Braintree
  process.env.BT_ENVIRONMENT='Sandbox'
  process.env.BT_MERCHANT_ID='your braintree merchant id'
  process.env.BT_PUBLIC_KEY='your braintree public key'
  process.env.BT_PRIVATE_KEY='your braintree private key'
}

require('./models/User');
require('./models/Form');
require('./models/Comment');
require('./config/passport');

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// ERROR HANDLERS

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// Start server...
const server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
