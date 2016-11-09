var groups = require('../models').Groups,
	users = require('../models').Users,
	products = require('../models').Products,
	fs = require('fs');

module.exports = {

	index : function(req, res){
		if(req.session.success == 'admin'){
			res.render('admin', {title: 'Shopping Cart - Admin Home', h1: 'Shopping Cart - Admin Home', h2: 'Admin Home', admin: true, adminLogged: true});
		}else{
			res.redirect('/admin/login');
		}
	},

	login : function(req, res){
		if(req.session.success == 'admin'){
			res.redirect('/admin');
		}else{
			res.render('admin_login', {title: 'Shopping Cart - Admin Login', h1: 'Shopping Cart - Admin Login', h2: 'Admin Login', admin: true});
		}
	},

	loginAdmin : function(req, res){
		users.findOne({name: req.body.email, password: req.body.password, admin: true}, function(err, user){
			if(err){
				console.log("Invalid Admin Login");
			}else if(user){
				req.session.success = "admin";
				//req.session.user = {id: user.id, name: user.name, password: user.password, admin: true};
				res.redirect('/admin');
			};
		});
	},

	getAddProduct : function(req, res){
		groups.find(function(err, groups){
			if(err){
				console.log(err);
			}else if(groups){
				if(req.session.success == 'admin'){
					res.render('add_product', {title: 'Shopping Cart - Admin Add Product', h1: 'Shopping Cart - Admin Add Product', h2: 'Add Product', admin: true, adminLogged: true, groups: groups});
				}else{
					res.redirect('/admin/login');
				}
			}
		});

	},

	addProduct: function(req, res){
		if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
			fs.rename('./public/images/' + req.file.filename, './public/images/' + req.body.group + '/' + req.file.filename + '.jpg', function(err){
				if(err){
					console.log(err);
				}else{
					var documentData = {};
					
					documentData.group = req.body.group;
					documentData.name = req.body.name;
					documentData.price = req.body.price;
					documentData.image = '/public/images/' + req.body.group + '/' + req.file.filename + '.jpg';
					documentData.description = req.body.description;

					var doc = new products(documentData);
					doc.save(function(err){
						if(err){
							res.send("error");
						}else{
							res.send("success");
						}
					});
				}
			});
		}
	},

	update : function(req, res){
		if(req.session.success == 'admin'){
			groups.find(function(err, groups){
				if(err){
					console.log(err);
				}else if(groups){
					res.render('update', {groups: groups, title: 'Shopping Cart - Admin Update Product', h1: 'Shopping Cart - Admin Update Product', h2: 'Update Product', admin: true, adminLogged: true});
				}
			});
		}else{
			res.redirect('/admin/login');
		}
	},

	createUpdateTable : function(req, res){
		products.find({group: req.body.data}, function(err, products){
			if(err){
				console.log(err);
			}else if(products){
				var output = '<div class="row"><div class="col-lg-12"><form><table class="table table-bordered table-striped"><thead><tr><th>Product Name</th><th>Update Product</th><th>Delete Product</th></tr></thead><tbody>';
				for(var i = 0; i < products.length; i++){
					output += '<tr id="' + products[i].id + '"><td>' + products[i].name + '</td><td><a href="/admin/updateProductPage?id=' + products[i].id + '"><input type="button" class="btn btn-primary updateButton" value="Update Product" /></a></td><td><input type="button" class="btn btn-danger" value="Delete Product" /></td></tr>';					
				}						
				output += '</tbody></table></form></div></div>';
			}
			res.send(output);
		});
	},

	updateProductPage : function(req, res){
		var url = require('url');
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query.id;

		query += "";

		groups.find(function(err, groups){
			if(err){
				console.log("this is an error for groups");
			}else if(groups){

				products.findById(query, function(err, product){
					if(err){
						console.log(err);
					}else if(product){
						var firstGroup = [];
						var notGroup = [];
						for(var i = 0; i < groups.length; i++){
							if(groups[i].name != product.group){
								notGroup.push(groups[i]);
							}else{
								firstGroup.push(groups[i]);
							}
						}
						res.render('updateProduct', {firstGroup: firstGroup[0], notGroup: notGroup, product: product, title: 'Shopping Cart - Admin Update Product Page', h1: 'Shopping Cart - Admin Update Product', h2: 'Update Product', admin: true, adminLogged: true});
					}
				});
			}
		});
	},



	addGroup : function(req, res){
		if(req.session.success == 'admin'){
			res.render('add_group', {title: 'Shopping Cart - Admin Add Group', h1: 'Shopping Cart - Admin Add Group', h2: 'Add Group', admin: true, adminLogged: true});
		}else{
			res.redirect('/admin/login');
		}
	},

	orders : function(req, res){
		if(req.session.success == 'admin'){
			res.render('orders', {title: 'Shopping Cart - Admin View Customers', h1: 'Shopping Cart - Admin View Customers', h2: 'View Customers', admin: true, adminLogged: true});
		}else{
			res.redirect('/admin/login');
		}
	},

	logout : function(req, res){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			}else{
				res.redirect('/admin/login');
			}
		});
	}
}