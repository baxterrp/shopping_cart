var express = require('express'),
	router = express.Router(), 

	user = require('../controllers/user'),
	admin = require('../controllers/admin');

module.exports = function(app){

	//user GET
	router.get('/login', user.login);
	router.get('/', user.index);
	router.get('/view_cart', user.cart);
	router.get('/checkout', user.checkout);
	router.get('/register', user.register);
	router.get('/logout', user.logout);


	//user POST
	router.post('/login', user.loginUser);
	router.post('/register', user.registerUser);
	router.post('/create_table', user.create_table);
	router.post('/updateCart', user.updateCart);

	//admin
	router.get('/admin', admin.index);
	router.get('/admin/add_product', admin.add_product);
	router.get('/admin/update', admin.update);
	router.get('/admin/add_group', admin.add_group);
	router.get('/admin/orders', admin.orders);

	app.use(router);
}