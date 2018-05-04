var mongoose = require('mongoose');

var RuleMapSchema = new mongoose.Schema({
    EventId: 		{type: String, required: [true, "EventId can't be empty"]},
    Period: 		{type: [String], required: [true, "Period can't be empty"]},
    PeriodType: 	{type: String, required: [true, "PeriodType can't be empty"]},
    Maximum: 		{type: Number, required: [true, "Maximum can't be empty"]},
    OnlyFailed:     {type: Boolean, required: [true, "OnlyFailed can't be empty"]},
});

mongoose.model('RuleMap', RuleMapSchema);