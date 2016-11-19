var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	customer: String,
	timeStamp: String,
	productArr: [{
		name: String,
		itemId: String,
		itemCount: Number,
		price: String
	}]},
{collection: 'orders'});

module.exports = mongoose.model('Orders', orderSchema);