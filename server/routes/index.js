var express = require('express');
var config = require('../resources/config');
var router = express.Router();
var storageManager = require('../managers/storage-manager');

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
