var groups = require('../models').Groups,
	users = require('../models').Users,
	products = require('../models').Products,
	orders = require('../models').Orders,
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
		users.findOne({name: req.body.email, password: req.body.password, isAdmin: true}, function(err, user){
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

	updateProdsNoImage : function(req, res){
		var documentData = {};
		var response = req.body.data.split('^^^');
		var productInfo = JSON.parse(response[0]);
		var productId = response[1];

		products.findById(productId, function(err, product){
			if(err){
				console.log(err);
			}else if(product){
				product.name = productInfo.name;
				product.price = productInfo.price;
				product.description = productInfo.description;
				product.group = productInfo.group;

				product.save(function(err){
					if(err) throw err;

					console.log("successfully updated");
				});
			}
		});
	},

	updateProdsWithImage : function(req, res){
		var prodId = req.body.prodId;
		if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
			fs.rename('./public/images/' + req.file.filename, './public/images/' + req.body.group + '/' + req.file.filename + '.jpg', function(err){
				products.findById(prodId, function(err, product){
					if(err){
						console.log(err);
					}else if(product){
						var path = '/public/images/' + product.group + '/' + product.image;
						fs.unlink(path, function(err){
							if(err){
								console.log(err);
							}else{
								console.log("image removed");
							}
						});
						product.name = req.body.name;
						product.price = req.body.price;
						product.group = req.body.group;
						product.description = req.body.description;
						product.image = '/public/images/' + req.body.group + '/' + req.file.filename + '.jpg';

						product.save(function(err){
							if(err) throw err;

							console.log("successfully updated with image");
						});
					}
				});
			});
		}
	},



	addGroup : function(req, res){
		if(req.session.success == 'admin'){
			res.render('add_group', {title: 'Shopping Cart - Admin Add Group', h1: 'Shopping Cart - Admin Add Group', h2: 'Add Group', admin: true, adminLogged: true});
		}else{
			res.redirect('/admin/login');
		}
	},

	addGroupPost: function(req, res){
				
		var group = req.body.group,
			folder = req.body.folder;
			
		var newGroup = new groups({
			name: group
		});
		
		console.log(group + folder);
		newGroup.save(function(err){
			if(err){
				console.log(err);
			}else{
				console.log("new group added");
			}
		});
		
		var newDirectory = "public/images/" + folder;
			
		fs.mkdir(newDirectory, function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log('Directory Made');
			}
		});

		res.redirect('/admin')
	},

	orders : function(req, res){
		if(req.session.success == 'admin'){
			users.find({isAdmin: false}, function(err, users){
				res.render('orders', {users: users, title: 'Shopping Cart - Admin View Customers', h1: 'Shopping Cart - Admin View Customers', h2: 'View Customers', admin: true, adminLogged: true});
			});
			
		}else{
			res.redirect('/admin/login');
		}
	},

	returnOrderTable : function(req, res){
		var id = req.body.data;

		orders.find({customer: id}, function(err, orders){
			if(err){
				res.send("no entries");
			}else{
				res.send(orders);
			}
		});
	},

	getOrderBox : function(req, res){
		var id = req.body.data;

		orders.findOne({_id : id}, function(err, order){
			res.send(order);
		});
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