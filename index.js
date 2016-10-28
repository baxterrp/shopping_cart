var express = require('express'),
	config = require('./server/configure'),
	app = express(),
	mongoose = require('mongoose');

app = config(app);

mongoose.connect('mongodb://127.0.0.1/shoppingCart');
mongoose.connection.on('open', function(){
	console.log("mongoose connected");
});

mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/views');

app.listen(app.get('port'), function(){
	console.log("Up and running...");
});