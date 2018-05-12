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

/**
 * MongoDB schemas represents the models of the system
 */
require('./server/models/Log');
require('./server/models/User');
require('./server/models/RuleMap');
require('./server/managers/validator');
require('./server/managers/storage-manager');

/**
 * The system routes
 *
 * @index  - the main route return the home page
 * @users  - the users route return the login/Register page,
 *           and control the login/register methods
 * @logs   - the Api for the get/post logs in the system
 * @tables - the tables route return the tables page
 * @charts - the charts route return the charts page
 * @forms  - the forms route return the forms page
 *
 */
var index   = require('./server/routes/index');
var users   = require('./server/routes/users');
var logs    = require('./server/routes/logs');
var tables  = require('./server/routes/tables');
var charts  = require('./server/routes/charts');
var forms   = require('./server/routes/forms');

var app = express();
app.use(expressValidator());

/**
 * view engine setup - pug view engine
 */
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
/**
 * body parser - parse the requests
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Set Static Folder
 */
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Express Session
 */
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
/**
 * Passport init
 */
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/**
 * Set the path to the routes
 */
app.use('/forms', forms);
app.use('/logs', logs);
app.use('/users', users);
app.use('/', index);
app.use('/tables', tables);
app.use('/charts', charts);

/**
 * error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
