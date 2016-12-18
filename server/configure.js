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

	app.use(function(req, res){
		res.status(400);
		if(req.session.success == 'guest')
			res.render('404error', {text: 'Page not found', title: 'Shopping Cart - Page Not Found', h1: '404 - Page Not Found', admin: false, count: req.session.count})
		else if(req.session.success == 'user')
			res.render('404error', {text: 'Page not found', title: 'Shopping Cart - Page Not Found', h1: '404 - Page Not Found', admin: false, count: req.session.count, logged: true})
		else if(req.session.success == 'admin')
			res.render('404error', {text: 'Page not found', title: 'Shopping Cart - Page Not Found', h1: '404 - Page Not Found', admin: true, adminLogged: true});
	});

	app.use(function(error, req, res, next){
		res.status(500);
		if(req.session.success == 'guest')
			res.render('404error', {text: 'Internal Server Error', title: 'Shopping Cart - Internal Server Error', h1: '500 - Internal Server Error', admin: false, count: req.session.count})
		else if(req.session.success == 'user')
			res.render('404error', {text: 'Internal Server Error', title: 'Shopping Cart - Internal Server Error', h1: '500 - Internal Server Error', admin: false, count: req.session.count, logged: true})
		else if(req.session.success == 'admin')
			res.render('404error', {text: 'Internal Server Error', title: 'Shopping Cart - Internal Server Error', h1: '500 - Internal Server Error', admin: true, adminLogged: true});
	});
	
	return app;
}
