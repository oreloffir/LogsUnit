var express = require('express');
var router = express.Router();
var storageManager = require('../server/managers/storage-manager')


router.get('/', function(req, res, next) {
	console.log('logs GET request');
	res.render('index', { title: 'Logs' });
});


router.post('/', function(req, res, next) {
	var model = {errors: [] }
	console.log("post")
	// print to console
	//console.log("Router Log Post: "+JSON.stringify(req.body, null, 4));
	storageManager.addLog(req.body, function(err, log){
		console.log("Callback")
		if(err){
			console.log("Callback Error: " + err)
			model.errors.push("Error saving")
			model.success = false
		}else{
			model.success = true
			// create result log for client
			var resLog = {}
			resLog.eventId       = log.EventId
			resLog.computer      = log.computer
			resLog.date        = log.timeago(log.TimeCreated)

			console.log(resLog)
			model.response      = resLog;
		}
		console.log("Model: "+JSON.stringify(model, null, 4))
		res.json(model)
	})
	// just call res.end(), or show as string on web
	//res.send(JSON.stringify(req.body, null, 4));
});
module.exports = router;
