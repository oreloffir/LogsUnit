var mongoose   		= require('mongoose');
mongoose.Promise    = require('bluebird');
mongoose.connect('mongodb://localhost/LogsUnitDB');

// import object schema fro mongoDB @see /model
var userSchema  = mongoose.model('User');
var logSchema   = mongoose.model('Log');
var config      = require('./../resources/config');
var lang        = require('./../lang/en');

var storageManager = {
    /**
     * This method is to login a user based on email and password
     * @callback requestCallback
     * @param {String} email - The email for login
     * @param {String} password - The password for login
     * @param {requestCallback} callback - The callback that handles the response (err, user)
     * @see UserSchema for more information
     **/
    login: function (email, password, callback) {
        console.log("session email "+ email);
        console.log("session password "+ password);
        userSchema.findOne({email: email.toLowerCase()}, ['+hash', '+salt'])
            .exec(function (err, user) {
                if (err)
                    callback(err, null);
                else if (user){
                    if (user.validPassword(password))
                        callback(null, user);
                    else
                        callback([lang.err_login], null);
                }else
                    callback([lang.err_login], null);
            })
    },
    /**
     * This method will add a new user to the system (Register)
     *
     * @callback requestCallback
     * @param {object} userData - the required fields according to UserSchema
     * @param {requestCallback} callback (err, user)
     */
    addUser: function(userData, callback){
        var user = new userSchema(userData);
        user.setPassword(userData.password);
        user.save(function(err,res){
            callback(err, res);
        })
    },

    addLog: function (data, callback) {
        var moreInfo = ['IpAddress','SubjectUserName','TargetUserName','FailureReason'];
        data["moreInfo"].forEach(function(val, i) {
            if (moreInfo.indexOf(data["moreInfo"][i+1]) === -1)
                data[val] = data["moreInfo"][i+1]
        });
        // console.log(JSON.stringify(data, null, 4));
        // console.log("-----1-----");

        var log = new logSchema(data);
        console.log(JSON.stringify(log, null, 4));
        console.log("-----2-----");
        log.save(callback);
    },

    /**
     * This method return a list of logs by the query & params (LIMIT,SORT,...)
     * query example: {EventId: 4624}
     * params example: {start:0,limit:20}
     */
    getLogs: function (query, params, callback) {
        console.log("GetLogs query: "+query+" params : "+JSON.stringify(params));
        var queryResult = logSchema.find();
        if(params){
            try {
                console.log(params[config.LIMIT]);
                if(params[config.LIMIT])
                    queryResult.limit(params[config.LIMIT]);
                if(params[config.SORT])
                    queryResult.sort(params[config.SORT]);
                if(params[config.START])
                    queryResult.skip(params[config.START]);
            }catch (e){
                console.log(e)
            }
        }
        queryResult.exec(function (err, logs) {
            callback(err, logs)
        })
    },

    getAggregateLogs: function (reportName, params, callback) {
        switch (reportName){
            case "monthReport":
                console.log('getAggregateLogs logsForMonth GET request ');
                logSchema.aggregate([
                    { "$project": {
                        "month": { "$month": "$TimeCreated" }
                    }},
                    { "$group": {
                        "_id": "$month",
                        "count":{$sum:1}
                    }}
                ]).sort({"_id": 1}
                ).exec(function (err, logs) {
                    callback(err, logs)
                });
                break;
            case "hourReport":
                console.log('getAggregateLogs logsForHour GET request ');
                logSchema.aggregate([
                    { "$project": {
                        "hour": { "$hour": "$TimeCreated" }
                    }},
                    { "$group": {
                        "_id": "$hour",
                        "count":{$sum:1}
                    }}
                ]).sort({"_id": 1}
                ).exec(function (err, logs) {
                    callback(err, logs)
                });
                break;
            case "eventIdReport":
                console.log('getAggregateLogs logsForEventId GET request ');
                logSchema.aggregate([
                    { "$group": {
                        "_id": "$EventId",
                        "count":{$sum:1}
                    }}
                ]).exec(function (err, logs) {
                    callback(err, logs)
                });
                break;
            case "logsEventReport":
                console.log('getAggregateLogs logsForLogsEvent GET request ');
                logSchema.aggregate([
                    {"$project" : params.project},
                    {"$group" : params.group},
                    {"$match": params.match}
                ]).exec(function (err, logs) {
                    callback(err, logs)
                });
                break;
        }

    },

};

module.exports = storageManager;