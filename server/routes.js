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
	router.get('/thank_you', user.thank_you);


	//user POST
	router.post('/login', user.loginUser);
	router.post('/register', user.registerUser);
	router.post('/create_table', user.createTable);
	router.post('/updateCart', user.updateCart);
	router.post('/getDescriptionBox', user.getDescriptionBox);


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
	router.post('/updateProdsWithImage', multer({dest:'./public/images/'}).single('file'), admin.updateProdsWithImage);
	router.post('/updateProdsNoImage', admin.updateProdsNoImage);
	router.post('/admin/add_group', admin.addGroupPost);
	router.post('/admin/returnOrderTable', admin.returnOrderTable);
	router.post('/admin/getOrderBox', admin.getOrderBox);

	app.use(router);
}