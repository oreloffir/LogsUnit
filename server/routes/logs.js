var express         = require('express');
var router          = express.Router();
var storageManager  = require('../managers/storage-manager')
var validator       = require('../managers/validator');



router.post('/', function(req, res, next) {
    var model = {errors: [] }

    storageManager.addLog(req.body, function(err, log){
        console.log("storageManager.addLog  Callback ");
        if(err){
            console.log("Callback Error: " + err);
            model.errors.push("Error saving");
            model.success = false;
        }else{
            console.log("Callback success: " + model.success);
            model.success = true;
            // create result log for client
            var resLog = {};
            resLog.eventId  = log.EventId;
            resLog.computer = log.computer;
            resLog.date     = log.timeago(log.TimeCreated);

            console.log("Callback res: " + JSON.stringify(resLog));
            model.response      = resLog;
        }
        validator.logAdded(model.response);
        res.json(model)
    })
});

router.get('/', function(req, res, next) {
	console.log('logs GET request');
	res.render('index', { title: 'Logs' });
});

router.get('/getLogsByMonth', function(req, res, next) {
	console.log('logsForMonth GET request');
	storageManager.getAggregateLogs("monthReport", null, function (err, logs) {
        var model = {
            logs: logs,
            errors: err
        };
        if (err)
            console.log('Home page GET logsForMonth request failed');
        console.log('Home page GET logsForMonth request Logs ' + JSON.stringify(model));
        res.json(model);
    })
});

router.get('/getLogsByHour', function(req, res, next) {
	console.log('getLogsByHour GET request');
	storageManager.getAggregateLogs("hourReport", null, function (err, logs) {
        var model = {
            logs: logs,
            errors: err,
        }
        if (err)
            console.log('Home page GET logsForHour request failed');
        console.log('Home page GET logsForHour request Logs ' + JSON.stringify(model));
        res.json(model);

    })
});

router.get('/getLogsByEventId', function(req, res, next) {
	console.log('getLogsByEventId GET request');
	storageManager.getAggregateLogs("eventIdReport", null, function (err, logs) {
        var model = {
            logs: logs,
            errors: err,
        }
        if (err)
            console.log('Home page GET getLogsByEventId request failed');
        console.log('Home page GET getLogsByEventId request Logs ' + JSON.stringify(model));
        res.json(model);

    })
});

router.get('/get_logs', function(req, res, next) {
	console.log('GET LOGS request');
	var query = req.body.query;
    var validParams = {
        limit:   100,
        sort:    -1,
        start:   0
    };
	if(req.body.params){
        params.keys().forEach(function (key) {
            switch (key){
                case(config.LIMIT):
                    validParams.limit = params[key];
                    break;
                case(config.SORT):
                    validParams.sort = params[key];
                    break;
            }
        })

    }
	storageManager.getLogs(query, params, function (err, logs) {
		var model = {
			logs: logs,
			errors: err,
		};
		if(err)
			console.log('Home page GET logsForMonth request failed');
		console.log('Home page GET logsForMonth request Logs '+ JSON.stringify(model));
		res.json(model);

	})
});



module.exports = router;
