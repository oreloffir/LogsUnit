var express = require('express');
var config = require('../resources/config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', pageToken: config.page_tokens.home });
});

module.exports = router;
