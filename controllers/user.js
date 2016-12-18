var groups = require('../models').Groups,
	users = require('../models').Users,
	products = require('../models').Products,
	orders = require('../models').Orders,
	bcrypt = require('bcrypt');

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

	createTable : function(req, res){
		var groupId = req.body.data;
		
		if(groupId === "0"){
			res.send("Not a g");
		}
		else{
				
			groups.findOne({_id: groupId}, function(err, myGroup){
				products.find({group: myGroup.name}, function(err, myItems){
								
					var output = "<table id='productTable' class='table-bordered table-striped table'>";
					output += "<thead><tr><th>Image</th><th>Product Name</th><th>Price</th><th>Description</th><th>Add to Cart</th></tr></thead><tbody>";
					var items = 0;

					if(myItems.length === 0){
						output = "There are no items in this category";
					}else{
						for(var i = 0; i < myItems.length; i++){
							if(myItems[i].isActive != false){
								output += "<tr><td><image src = " + myItems[i].image + " width = '96' /></td><td>" + myItems[i].name + "</td><td>$" + myItems[i].price + "</td><td><input type='button' class='btn btn-primary' value='Description' /></td><td><input type='button' class='btn btn-success addToCart' id ='" + myItems[i].id + "'" + "value='Add to Cart' /></td></tr>";
								items++;
							}
						}
						output += "</tbody>";
						if(items == 0)
							output = "There are no items in this category";	

					}
						res.send(output);
				})
			})
		}
	},

	//update shopping cart
	updateCart : function(req, res){
		var data = req.body.data.split(',');

		//backend check for invalid entries
		if(data[1] > 99)
			data[1] = 1;
		if(isNaN(data[1]))
			data[1] = 1;

		/*if(parseInt(data[1]) > 99 || isNaN(data[1]){
			data[1] = 1;
		}*/

		products.findOne({_id: data[0]}, function(err, product){

			//using undefined/true for third peramater - true for updating quantity, false for incrementing by one
			if(data[2] == 'undefined'){
				var update = false;
			}else if(data[2] == 'true'){
				var update = true;
			}				

			//using flag for do while and continuing search for item
			var flag = true;
			var len = req.session.cart.length;


			do{
				for(var i = 0; i < len; i++){
					if(req.session.cart[i].id == data[0]){
						if(update){
							//if update - change quantity
							req.session.cart[i].quantity = data[1];
						}else{
							//else increment by one
							req.session.cart[i].quantity++;
						}
						req.session.cart[i].total = (req.session.cart[i].quantity * parseFloat(req.session.cart[i].price)).toFixed(2);
						//item found - trigger flag
						flag = false;

						//if quantity set to 0 - remove item
						if(req.session.cart[i].quantity == 0){
							req.session.cart.splice(i, 1);

							//reset loop max
							len = req.session.cart.length;
						}
					}
				}
			
				//if item wasn't found in for loop - add item - trigger flag
				if(flag){
					req.session.cart.push({id: data[0], quantity: 1, name: product.name, price: product.price, image: product.image, total: parseFloat(product.price).toFixed(2)});
					req.session.count++;
					flag = false;
				}

				//reset count - count each item with for loop using .quantity
				req.session.count = 0;
				for(var i = 0; i < req.session.cart.length; i++){
					req.session.count += parseInt(req.session.cart[i].quantity);
				}
			}while(flag);

			//calculate total
			req.session.grand = 0;
			for(var i = 0; i < req.session.cart.length; i++){
				req.session.grand += parseFloat(req.session.cart[i].total);
			}

			//2 digit fix
			//convert count to string for output
			req.session.grand = req.session.grand.toFixed(2);
			var count = req.session.count + "";
			var output = count + '^^^' + JSON.stringify(req.session.cart);

			res.send(output);
		});
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
		var saltRounds = 10;
		
		bcrypt.hash(req.body.password, saltRounds, function(err, hash){

			var newUser = users({
				name: req.body.email,
				password: hash,
				isAdmin: false,
				fname: req.body.fname,
				lname: req.body.lname,
				address: req.body.address,
				city: req.body.city,
				state: req.body.state,
				zip: req.body.zip,
				phone: req.body.phone
			});

			users.findOne({name: req.body.email}, function(err, user){
				if(user){
					res.redirect('/register?error=taken');
				}
				else{
					newUser.save(function(err){
						if(err){
							console.log(err);
						}else{
							users.findOne({name: req.body.email}, function(err, user){
								if(user){
									req.session.success = "user";
									req.session.user = {id: user.id, name: user.name, password: user.password, fname: user.fname, lname: user.lname, address: user.address, city: user.city, state: user.state, zip: user.zip}
									res.redirect('/checkout');
								};
							});
						}
					});
				}
			});
		});
	},

	//login page
	login : function(req, res){
		res.render('login', {title: 'Shopping Cart - Login', h1: 'Shopping Cart - Login', h2: 'Login', admin: false, count: req.session.count});
	},

	//POST login
	loginUser : function(req, res){
		users.findOne({name: req.body.email}, function(err, user){
			if(user){
				bcrypt.compare(req.body.password, user.password, function(err, response){
					if(response){
						req.session.success = "user";
						req.session.user = {id: user.id, name: user.name, password: user.password, fname: user.fname, lname: user.lname, address: user.address, city: user.city, state: user.state, zip: user.zip}
						res.redirect('/checkout');
					}else{
						res.redirect('/login?error=invalid-user');
					}
				});
			}else{
				res.redirect('/login?error=invalid-user');
			}
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
		var showCart = false;

		if(req.session.success == 'guest'){
			if(req.session.count > 0)
				showCart = true;
			res.render('cart', {showCart: showCart, title: 'Shopping Cart - View Cart', h1: 'Shopping Cart - View Cart', h2: 'View Cart', admin: false, count: req.session.count, cart: req.session.cart});
		}else if(req.session.success == 'user'){
			if(req.session.count > 0)
				showCart = true;
			res.render('cart', {showCart: showCart, title: 'Shopping Cart - View Cart', h1: 'Shopping Cart - View Cart', h2: 'View Cart', admin: false, count: req.session.count, cart: req.session.cart, logged: true});
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

	getDescriptionBox : function(req, res){
		var id = req.body.data;

		products.findById(id, function(err, product){
			var output = product.name + '^^^' + product.image + '^^^' + product.price + '^^^' + product.description;

			res.send(output);
		});
	},

	//view checkout page
	checkout : function(req, res){
		var showCart = false;
		if(req.session.success == "user"){
			if(req.session.count > 0){
				showCart = true;
			}
			res.render('checkout', {showCart: showCart, user: req.session.user, cart: req.session.cart, grand: req.session.grand, title: 'Shopping Cart - Checkout', h1: 'Shopping Cart - Checkout', h2: 'Checkout', admin: false, count: req.session.count, logged: true});
		}else{
			res.redirect('/login');
		}
	},

	thank_you : function(req, res){
		if(req.session.success == "user"){
			var len = req.session.cart.length;

			var prodArr = [];

			for(var i = 0; i < len; i++){
				var newItem = {
					name: req.session.cart[i].name,
					itemId: req.session.cart[i].id,
					itemCount: req.session.cart[i].quantity,
					price: req.session.cart[i].price
				}
				prodArr.push(newItem);
			}

			var newOrder = orders({
				customer: req.session.user.id,
				timeStamp: Date.now(),
				productArr: prodArr
			});

			newOrder.save(function(err){
				if(err){
					console.log(err);
				}else{
					console.log("saving order");
					req.session.destroy(function(err){
						if(err){
							console.log(err);
						}else{
							var count = 0;
							res.render('thank_you', {count: count, title: 'Shopping Cart - Order Complete', h1: 'Shopping Cart - Order Complete', h2: 'Thank you! For your order!'})
						}
					});
				}
			});
		}else{
			res.redirect('/');
		}
	}
}