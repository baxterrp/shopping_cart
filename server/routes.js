var express = require('express'),
	router = express.Router(), 

	user = require('../controllers/user'),
	admin = require('../controllers/admin'),
	multer = require('multer');

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
	router.post('/create_table', user.createTable);
	router.post('/updateCart', user.updateCart);


	//admin
	router.get('/admin', admin.index);
	router.get('/admin/login', admin.login);
	router.get('/admin/getAddProduct', admin.getAddProduct);
	router.get('/admin/update', admin.update);
	router.get('/admin/updateProductPage', admin.updateProductPage);
	router.get('/admin/add_group', admin.addGroup);
	router.get('/admin/orders', admin.orders);
	router.get('/admin/logout', admin.logout);

	//admin POST
	router.post('/admin/login', admin.loginAdmin);
	router.post('/createUpdateTable', admin.createUpdateTable);
	router.post('/addProduct', multer({dest:'./public/images/'}).single('file'), admin.addProduct);

	app.use(router);
}