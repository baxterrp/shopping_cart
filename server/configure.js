var routes = require('./routes'),
	express = require('express'),
	exphbs = require('express-handlebars'),
	path = require('path'),
	bodyParser = require('body-parser'),
	session = require('express-session');
	
module.exports = function(app){

	app.use(bodyParser.urlencoded({'extended':false}));
		
	app.use(session({
	  secret: 'robssecret',
	  resave: false,
	  saveUninitialized: false
	}));

	routes(app);

	app.use('/public/', express.static(path.join(__dirname, '../public')));

	
	app.engine('handlebars', exphbs.create({
		defaultLayout: 'main',
		layoutDir: app.get('views') + '/layouts',
		partialDir: app.get('views') + '/partials'
	}).engine);

	app.set('view engine', 'handlebars');
	
	return app;
}
