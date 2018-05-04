var config          = require('../resources/config');
var storageManager  = require('./storage-manager');
var logEventEmitter = require('./logEventEmitter');
var moment = require('moment')

var mongoose = require('mongoose');

var ruleMap         = mongoose.model('RuleMap');


var validator = {

    init : function() {

        console.log('Validator init');

        // var rulesMap = ruleMap({
        //     EventId: '6416',
        //     Period:[config.hours._10_PM, config.hours._6_AM],
        //     PeriodType:'BETWEEN',
        //     Maximum:10,
        //     OnlyFailed:false,
        // });
        //
        // rulesMap.save( function(err){
        //     if (err)
        //         console.log('Error saving rulesMap: %o',rulesMap );
        // });


        //console.log("validator rules maps: %o", ruleMap.find());

    },

    logAdded :function (log) {
        console.log("logAdded :function EventId: "+log.EventId);


        var rulesMaps = ruleMap.find({
            EventId: log.EventId,
        }).exec( function(err, res){
            if(err)
                console.log('RulesMaps Find error: %o',err);
            else{
                validator.validate(res);
            }
        });
        // console.log("logAdded :rulesMaps: %o", rulesMaps);


    },

    validate : function (rulesMaps) {
        console.log("validator validate rulesMaps: %o",rulesMaps);

        rulesMaps.forEach(function(ruleMap){

            console.log("rule map: %o", ruleMap);
            var params = {};


            console.log("rule map periodType: "+ruleMap.PeriodType);

            switch(ruleMap.PeriodType){
                case config.periodType.between:
                    console.log("case config.periodType.between");
                    var today = moment().startOf('day').add(ruleMap.Period[0], 'hours').toDate();
                    var tomorrow = moment().startOf('day').add(1, 'days').add(ruleMap.Period[1], 'hours').toDate();

                    console.log("TODAY : " +today + "Tommorow : " + tomorrow);

                    params = {
                        EventId: ruleMap.EventId,

                        TimeCreated: {
                            $gte: today,
                            $lt: tomorrow
                        },
                    };
                    break;
                case config.periodType.while:

                    break;
            }

            // var params = {
            //
            //     // project: {
            //     //     "EventId": 1,
            //     //     "Computer": 1,
            //     //     "TimeCreated": 1,
            //     //     "IpAddress": 1,
            //     //     "FailureReason": 1,
            //     //     "TargetUserName": 1,
            //     //     "SubjectUserName": 1,
            //     //     "hour": {"$hour": "$TimeCreated"}
            //     // },
            //     // group: {
            //     //     //"_id": "EventId",
            //     //     //"count": {$sum: 1},
            //     //     //"hour": "hour"
            //     // },
            //     // match: {
            //     //     "EventId": ruleMap.EventId,
            //     //     //"hour": {$gte: ruleMap.Period[0], $lte: ruleMap.Period[1]}
            //     // }
            // }

            storageManager.getAggregateLogs('LOGS AGRREGATIOM', params, function(err, logs){
                console.log("Validate callback");
                if(err){
                    console.log("Aggregation logs Error: "+err)
                }else{
                    console.log("params = " + JSON.stringify(params));
                    console.log("res = " + JSON.stringify(logs));
                    if(logs.length > ruleMap.Maximum)
                        logEventEmitter.emit('someEvent',logs);
                }
            })
        });

        //store report

        //call to eventEmiter

    }
};

//validator.init();

module.exports = validator;
