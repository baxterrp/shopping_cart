var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	group: String,
	name: String,
	price: String,
	image: String,
	description: String,
	isActive: Boolean},
	{collection: 'products'});

module.exports = mongoose.model('Products', productSchema);
