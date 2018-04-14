var express = require('express');
var config = require('../resources/config');
var router = express.Router();

/*/!* GET home page. *!/
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express', pageToken: config.page_tokens.home });
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;*/

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    var model = {
        title: 'Logs unit',
        pageToken: config.page_tokens.home,
        User: req.user,
    };

    res.render('index', model);
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        console.log('You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;
