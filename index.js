var express = require('express'),
	config = require('./server/configure'),
	app = express(),
	mongoose = require('mongoose'),
	https = require('https'),
	http = require('http'),
	fs = require('fs'),
	options = {
		key: fs.readFileSync('key.pem'),
		cert: fs.readFileSync('cert.pem')
	};

app = config(app);

mongoose.connect('mongodb://127.0.0.1/shoppingCart');
mongoose.connection.on('open', function(){
	console.log("mongoose connected");
});

mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 443);

app.set('views', __dirname + '/views');

http.createServer(app).listen(80);
https.createServer(options, app).listen(app.get('port'), function(){
	console.log('Server up : https://107.170.2.146:' + app.get('port'));
});

/*
app.listen(app.get('port'), function(){
	console.log("Up and running...");
});*/