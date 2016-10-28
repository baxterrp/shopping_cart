var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	password: String,
	isAdmin: Boolean,
	fname: String,
	lname: String,
	address: String,
	city: String,
	state: String,
	zip: String,
	phone: String},
	{collection: 'users'});

module.exports = mongoose.model('Users', userSchema);