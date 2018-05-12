var eventController = {
    init: function () {
        console.log("eventController init")
        this.socket = io();
        this.bindEvent()
    },

    bindEvent: function () {
        this.socket.on('event', function (event) {
            console.log(event);
            eventController.postEvent(event);
        })
    },

    postEvent: function (logs) {
        toastr.error("A new event sent to the admin", "ALERT");
    }
};