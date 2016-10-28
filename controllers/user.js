var groups = require('../models').Groups,
	users = require('../models').Users,
	products = require('../models').Products;

module.exports = {
	
	//Home page
	index : function(req, res){
		groups.find({}, function(err, groups){
			if(req.session.success == 'guest'){
				res.render('home', {title: 'Shopping Cart - Home', h1: 'Shopping Cart - Home', h2: 'Home', admin: false, groups: groups, count: req.session.count});
			}else if(req.session.success == 'user'){
				res.render('home', {title: 'Shopping Cart - Home', h1: 'Shopping Cart - Home', h2: 'Home', admin: false, groups: groups, count: req.session.count, logged: true});
			}else{
				req.session.regenerate(function(err){
					if(err){
						console.log(err);
					}else{
						req.session.success = 'guest';
						req.session.count = 0;
						req.session.cart = [];
						res.redirect('/');
					}
				});
			}
	})},

	create_table : function(req, res){
		var groupId = req.body.data;
		
		if(groupId === "0"){
			res.send("");
		}
		else{
				
			groups.findOne({_id: groupId}, function(err, myGroup){
				products.find({group: myGroup.name}, function(err, myItems){
								
					var output = "<table class='table-bordered table-striped table'><thead><tr><th>Image</th><th>Product Name</th><th>Price</th><th>Description</th><th>Add to Cart</th></tr></thead><tbody>";
					
					if(myItems.length === 0){
						output = "There are no items in this category";
					}else{
						for(var i = 0; i < myItems.length; i++){
							output += "<tr><td><image src = " + myItems[i].image + " width = '96' /></td><td>" + myItems[i].name + "</td><td>$" + myItems[i].price + "</td><td><input id='test' type='button' class='btn btn-primary' value='Description' /></td><td><input type='button' class='btn btn-success addToCart' id ='" + myItems[i].id + "'" + "value='Add to Cart' /></td></tr>";
						}
						
						output += "</tbody>";
					}
						res.send(output);
				})
			})
		}
	},

	//update shopping cart
	updateCart : function(req, res){
		var data = req.body.data.split(',');

		//update cart count
		var count = req.session.count;
		var thisCount = parseInt(data[1]);
		count += thisCount;
		req.session.count = count;
		count += "";

		//update cart information in session
		//use flag for do while loop
		var flag = true;
		var len = req.session.cart.length;

		do{
			for(var i = 0; i < len; i++){
				//if this item is in cart, update quantity;;;
				if(req.session.cart[i].id == data[0]){
					console.log(req.session.cart[i].id);
					console.log(data[0]);
					req.session.cart[i].count++;
					flag = false;
				}
			}
			//if not add it
			if(flag){
				req.session.cart.push({id: data[0], count: thisCount});
				console.log(data[0]);
				flag = false;
			}
		}while(flag);

		console.log(req.session.cart);
		res.send(count);
	},

	//registration page
	register : function(req, res){
		if(req.session.success == 'guest'){
			res.render('register', {title: 'Shopping Cart - Registration', h1: 'Shopping Cart - Registration', h2: 'Registration', admin: false, count: req.session.count});
		}else if(req.session.success == 'user'){
			res.redirect('/');
		}else{
			req.session.regenerate(function(err){
				if(err){
					console.log(err);
				}else{
					req.session.success = 'guest';
					req.session.count = 0;
					req.session.cart = [];
					res.redirect('/register');
				}
			});
		}
	},

	//POST registration
	registerUser : function(req, res){

		var newUser = users({
			fname: req.body.fname,
			lname: req.body.lname,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zip: req.body.zip,
			phone: req.body.phone,
			name: req.body.email,
			password: req.body.password
		});

		newUser.save(function(err){
			if(err){
				console.log(err);
			}else{
				console.log("User Added");
				res.redirect('/login');
			}

		});
	},

	//login page
	login : function(req, res){
		res.render('login', {title: 'Shopping Cart - Login', h1: 'Shopping Cart - Login', h2: 'Login', admin: false, count: req.session.count});
	},

	//POST login
	loginUser : function(req, res){
		users.findOne({name: req.body.email, password: req.body.password}, function(err, user){
			if(err){
				console.log("No user found by that name");
			}else if(user){
				req.session.success = "user";
				req.session.user = {id: user.id, name: user.name, password: user.password, fname: user.fname, lname: user.lname, address: user.address, city: user.city, state: user.state, zip: user.zip}
				res.redirect('/checkout');
			};
		});
	},

	//logout of application
	logout : function(req, res){
		req.session.destroy(function(err){
			if(err){
				console.log(err);
			}else{
				res.redirect('/');
			}
		})
	},

	//view shopping cart page
	cart : function(req, res){
		if(req.session.success == 'guest'){
			res.render('cart', {title: 'Shopping Cart - View Cart', h1: 'Shopping Cart - View Cart', h2: 'View Cart', admin: false, count: req.session.count});
		}else if(req.session.success == 'user'){
			res.render('cart', {title: 'Shopping Cart - View Cart', h1: 'Shopping Cart - View Cart', h2: 'View Cart', admin: false, count: req.session.count, logged: true});
		}else{req.session.regenerate(function(err){
			if(err){
				console.log(err);
			}else{
				req.session.success = "guest";
				req.session.count = 0;
				req.session.cart = [];
				res.redirect('/view_cart');
			}});
		}
	},

	//view checkout page
	checkout : function(req, res){
		if(req.session.success == "user"){
			res.render('checkout', {user: req.session.user, title: 'Shopping Cart - Checkout', h1: 'Shopping Cart - Checkout', h2: 'Checkout', admin: false, count: req.session.count, logged: true});
		}else{
			res.redirect('/login');
		}
	}
}