var express             = require('express');
    path                = require('path');
    favicon             = require('serve-favicon');
    logger              = require('morgan');
    cookieParser        = require('cookie-parser');
    bodyParser          = require('body-parser');
    expressValidator    = require('express-validator');
    session             = require('express-session');
    passport            = require('passport');
    LocalStrategy       = require('passport-local').Strategy;
    flash               = require('connect-flash');
    session             = require('express-session');



// Mongo schemas
require('./server/model/Log');

//Routes
var index   = require('./server/routes/index');
var users   = require('./server/routes/users');
var logs    = require('./server/routes/logs');
var tables  = require('./server/routes/tables');
var charts  = require('./server/routes/charts');

var app = express();

// express-validator
app.use(expressValidator());

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/', index);
app.use('/logs', logs);
app.use('/tables', tables);
app.use('/charts', charts);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
