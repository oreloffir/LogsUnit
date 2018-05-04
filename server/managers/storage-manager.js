var mongoose = require('mongoose');
var validator = require('../managers/validator');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/LogsUnitDB', {server: { poolSize: 5 }});
// import object schema fro mongoDB @see /model
var logSchema = mongoose.model('Log');


var storageManager = {
	addLog: function (data, callback) {
        console.log("S-M add log: "+JSON.stringify(data, null, 4));
		console.log("S-M add log TimeCreated: "+data["TimeCreated"]);
		console.log("S-M add log Computer: "+data['Computer']);
		console.log("S-M add log EventID: "+data['EventId']);

		var moreInfo = ['IpAddress','SubjectUserName','TargetUserName','FailureReason'];
		data["moreInfo"].forEach(function(val, i) {
			console.log("i ="+i+"data[i+1]="+data["moreInfo"][i+1]);
			if (moreInfo.indexOf(data["moreInfo"][i+1]) === -1)
				data[val] = data["moreInfo"][i+1];
		});
		console.log(JSON.stringify(data, null, 4));
		console.log("-----1-----");

		var log = new logSchema(data);
		console.log(JSON.stringify(log, null, 4));
		console.log("-----2-----");
		//log.save(callback);
		log.save(callback);
        console.log("Log Saved");

	},

	getAllLogs: function (query, params, callback) {
		logSchema.find(query)
			.limit(params.limit)
			.sort({TimeCreated: -1})
			.exec(function (err, logs) {
				callback(err, logs)
			})
	},

    getAggregateLogs: function(eventTitle, params, callback) {

	    logSchema.find(params)
            .exec(function (err, logs){
                callback(err, logs)
            });
    },

    getLogsGrupeBy:	function (group, callback) {
    logSchema.aggregate(group)
        .exec(function (err, logs) {
            callback(err, logs)
        })
    },
};

module.exports = storageManager;