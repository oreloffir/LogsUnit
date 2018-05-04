var express = require('express');
var router = express.Router();
var storageManager = require('../managers/storage-manager');
var validator = require('../managers/validator');


router.get('/', function(req, res, next) {
	console.log('logs GET request');
	res.render('index', { title: 'Logs' });
});

router.get('/groupBy', function(req, res, next){
    console.log("router.get('/groupBy'");
    console.log('group: %j',req.query.group);
    var query;

    switch(req.query.group) {
        case "EventId":
            console.log("EventId case: EventId");
            query = {
                $group: {
                    _id :  { EventId: "$EventId" },
                    count: { $sum: 1 }
                }
            };
            break;
        case "Month":
            console.log("Month case: Month");
            query = {
                $group: {
                    _id :  { $month: "$TimeCreated" },
                    count: { $sum: 1 }
                }
            };
            break;
        case "Hour":
            console.log("Hour case: Hour");
            query = {
                $group: {
                    _id :  { $hour: "$TimeCreated" },
                    count: { $sum: 1 }
                }
            };
            break;
    }

    storageManager.getLogsGrupeBy(query, function(err, logs) {
        console.log("getLogsGrupeBy Error: %o", err)
        res.json(logs)
    });
});

router.post('/', function(req, res, next) {
	var model = {errors: [] };
	console.log("post");
	// print to console
	//console.log("Router Log Post: "+JSON.stringify(req.body, null, 4));
	storageManager.addLog(req.body, function(err, log){
		console.log("Callback Error: %o",err);
		console.log("Callback Log: %o",log);
		if(err){
			console.log("Callback Error: " + err);
			model.errors.push("Error saving");
			model.success = false

            res(err);
		}else{
            console.log("Callback success");
			// create result log for client
			var resLog = {};
			resLog.eventId       = log.EventId;
			resLog.computer      = log.computer;
			resLog.date        = log.timeago(log.TimeCreated);

			console.log(resLog);
			model.response      = resLog;

            console.log("Model: "+JSON.stringify(model, null, 4));
            res.send(model);
		}

	});

    console.log("-----3-----");
    console.log("Logs Validation");
    validator.logAdded({
        EventId: '6416'
    });
    console.log("-----4-----");
    // just call res.end(), or show as string on web
	//res.send(JSON.stringify(req.body, null, 4));
});

module.exports = router;
