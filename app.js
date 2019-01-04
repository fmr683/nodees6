var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');

// Libraries
var responseMessages = require('./lib/response-messages');
var authentication = require('./middlewares/authentication');

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imageRouter = require('./routes/image');

var app = express();

// Enable CORS
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Authenticate all requests
app.use(function(req, res, next) {
	authentication.authRequest(req, res, next);
});

// API Calls
app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/image', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    response = responseMessages.commonResponse(responseMessages.NOT_FOUND);
    res.status(404).json(response);
});

// error handler
app.use(function(err, req, res, next) {

  /*// set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');*/
  response = responseMessages.commonResponse(responseMessages.UNKNOWN_ERROR, "", "", err.message);
  res.status(500).json(response);
});

module.exports = app;
