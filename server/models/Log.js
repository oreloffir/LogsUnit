var mongoose = require('mongoose');
var timeago  = require('timeago.js');

/**
 * LogSchema - the log model has those members:
 *
 *  @EventId - the event id
 *  @Computer - the computer of the event
 *  @TimeCreated - when the event occur
 *  @IpAddress - the ip of the computer
 *  @FailureReason - for fails actions the reason
 *  @TargetUserName - on what occur the event
 *  @SubjectUserName - the subject name of the target
 */
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
mongoose.model('Log', LogSchema);