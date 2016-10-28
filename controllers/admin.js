module.exports = {
	
	index : function(req, res){
		res.render('admin', {title: 'Shopping Cart - Admin Home', h1: 'Shopping Cart - Admin Home', h2: 'Admin Home', admin: true});
	},

	add_product : function(req, res){
		res.render('add_product', {title: 'Shopping Cart - Admin Add Product', h1: 'Shopping Cart - Admin Add Product', h2: 'Add Product', admin: true});
	},

	update : function(req, res){
		res.render('update', {title: 'Shopping Cart - Admin Update Product', h1: 'Shopping Cart - Admin Update Product', h2: 'Update Product', admin: true});
	},

	add_group : function(req, res){
		res.render('add_group', {title: 'Shopping Cart - Admin Add Group', h1: 'Shopping Cart - Admin Add Group', h2: 'Add Group', admin: true});
	},

	orders : function(req, res){
		res.render('orders', {title: 'Shopping Cart - Admin Check Orders', h1: 'Shopping Cart - Admin Check Orders', h2: 'Check Orders', admin: true});
	}
}