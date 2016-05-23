var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var musicModel = new Schema({
	author: {type: String},
	song: {type: String},
	date: {type: Date, default: new Date()},
	listen: {type: Boolean, default: false}
});

module.exports = mongoose.model('Music', musicModel);