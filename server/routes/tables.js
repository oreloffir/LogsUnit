var express = require('express');
var config = require('../resources/config');
var router = express.Router();
var storageManager = require('../managers/storage-manager')


router.get('/', function(req, res, next) {
	console.log('Tables page GET request');
	var query = {};
	var params = {start: 0, limit: 20};
	storageManager.getAllLogs(query, params, function (err, logs) {

		var model = {
			Logs: logs,
			Errors: err,
            pageToken: config.page_tokens.tables
		};

		if(err)
			console.log('Tables page GET request failed');
		console.log('Tables page GET request Logs '+ JSON.stringify(model));
		res.render('tables', model);

	})

});

module.exports = router;