var events = require('events');

var logEventEmitter = new events.EventEmitter();

logEventEmitter.on('someEvent', function (logs) {
    console.log("logEventEmmitter: \n"+logs);
})

module.exports = logEventEmitter;