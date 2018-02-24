var mongoose = require('mongoose');
var timeago  = require('timeago.js');

var LogSchema = new mongoose.Schema({
	EventId: 		{ type: String, required: [true, "EventId can't be empty"]},
	Computer: 		{ type: String, required: [true, "Computer can't be empty"] },
	TimeCreated:    { type: Date, default: Date.now },
	IpAddress: 		{ type: String },
	FailureReason: 	{ type: String },
	TargetUserName: { type: String },
	SubjectUserName:{ type: String },

	moreInfo:       [{ type: String}],
});
LogSchema.methods.timeago = function(date) {
	return timeago().format(date);
};
mongoose.model('Log', LogSchema)