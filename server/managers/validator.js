var config = require('../resources/config');
var storageManager = require('./storage-manager');
var logEventEmitter = require('./logEventEmitter');

var validator = {


    rulesMap :{
        eventId : [6416,4159],
        period: [config.hours._10_PM, config.hours._6_AM],
        maximum: 10,
        onlyFailed: false,
    },

    logAdded :function (log) {
        validator.validate(validator.rulesMap)
    },

    validate : function (rulesMap) {
        console.log("validator validate:");
        var params = {
            project: {
                "EventId": 1,
                "Computer": 1,
                "TimeCreated": 1,
                "IpAddress": 1,
                "FailureReason": 1,
                "TargetUserName": 1,
                "SubjectUserName": 1,
                "hour": { "$hour": "$TimeCreated" }
                },
            group: {
                "_id": "EventId",
                "count":{$sum:1},
                //"hour": "hour"
            },
            match: {
                //"EventId" : '6416',
                //"hour": { $gte: rulesMap.period[0], $lte: rulesMap.period[1] }
            }
        };
        storageManager.getAggregateLogs("logsEventReport",params,function (err, logs) {
            console.log("Validate callback");
            if(err){
                console.log("Aggregation logs Error: "+err)
            }else{
                console.log("params = " + JSON.stringify(params));
                console.log("res = " + JSON.stringify(logs));
                logEventEmitter.emit('someEvent',logs);
            }
        })

    }
};

module.exports = validator;