var events = require('events');
var io = require('socket.io');

var logEventEmitter = new events.EventEmitter();

logEventEmitter.on('someEvent', function (logs) {
    if(logEventEmitter.socket) {
        console.log("logEventEmitter: "+logs.length+" logs");
        logEventEmitter.socket.emit('event', logs)
        console.log("logEventEmitter: emit event");
    }
    else{
        console.log("logEventEmitter: no socket \n");
    }
});

logEventEmitter.setSocket = function(socket){
    console.log("logEventEmitter: setSocket \n");
    logEventEmitter.socket = socket;
};

module.exports = logEventEmitter;