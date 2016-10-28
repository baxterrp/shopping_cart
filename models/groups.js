var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
	name: String},
	{collection: 'groups'});

module.exports = mongoose.model('Groups', groupSchema);