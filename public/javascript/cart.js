if(document.getElementById("cartTable")){
	var updateCart = {};

	updateCart.myCart = document.getElementById('cartCount');
	updateCart.updateButton = document.getElementById('cartTable');

	updateCart.addTable = function(){
		updateCart.updateButton.addEventListener('click', function(e){
			if(e.target.type == 'button' && e.target.className == 'btn btn-success update_cart'){
				var num = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.value;
				var id = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.id;

				var data = id + ',' + num + ',true';

				Ajax.sendRequest('/updateCart', function(res){
					var updateCount = res.responseText.split('^^^');
					updateCart.myCart.innerHTML = updateCount[0];
					var myCart = JSON.parse(updateCount[1]);

					if(myCart.length == 0){
						output = "There are no items in your cart";
					}else{
						var output = '<div class="row drop-bottom"><div class="col-lg-12 checkOut"><input type="button" class="btn btn-success" value="Check Out" onclick="window.location.href=\'/checkout\'"/></div></div><div class="row"><div class="col-lg-12"><table class="table-bordered table-striped table"><thead><tr><th>Image</th><th>Product Name</th><th>Price</th><th>Quantity</th><th>Description</th><th>Update</th></tr></thead><tbody>';
						for(var i = 0; i < myCart.length; i++){
							output += '<tr><td><image src = ' + myCart[i].image + ' width = \'96\' /></td><td>' + myCart[i].name + '</td><td>$' + myCart[i].price + '</td><td class=\'set-width\'><input id = "' + myCart[i].id + '" type=\'text\' class=\'form-control\' value="'+ myCart[i].quantity + '" /></td><td><a href=\'#description\' data-toggle=\'modal\' data-backdrop=\'false\'><input id=\'test\' type=\'button\' class=\'btn btn-primary\' value=\'Description\' /></td></a><td><input type=\'button\' name="' + myCart[i].id + '" class=\'btn btn-success update_cart\' value=\'Update\' /></td></tr>';
						}
						output += '</tbody></table></div></div>';
					}
					updateCart.updateButton.innerHTML = output;

				}, data);

			}
		},false);
	}

	updateCart.addTable();

}