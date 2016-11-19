	var createTable = {},
		cart = {},
		launchDescription = {};

	createTable.mySelect = document.getElementsByTagName('select')[0];
	cart.myCart = document.getElementById('cartCount');
	cart.updateButton = document.getElementById('myTable');

	if(document.getElementById("home_page")){
		createTable.addTable = function(){
			createTable.mySelect.addEventListener('change', function(){
				
				document.getElementById("myTable").innerHTML = "Loading table... Please wait...";

				var data = createTable.mySelect.value;
				Ajax.sendRequest('/create_table', function(res){
					document.getElementById("myTable").innerHTML = res.responseText;
					launchDescription.showDescription();
			}, data);}, false);

		}
	
		cart.addToCart = function(){
			cart.updateButton.addEventListener('click', function(e){
				if(e.target.type == 'button' && e.target.className == "btn btn-success addToCart"){
					
					var thisID = e.target.id + ',1';

					Ajax.sendRequest('/updateCart', function(res){
						var updateCount = res.responseText.split('^^^');
						cart.myCart.innerHTML = updateCount[0];
					}, thisID);}
				}, false);
		}
	
		createTable.addTable();
		cart.addToCart();
	}

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
							var output = '<div class="row drop-bottom"><div class="col-lg-12 checkOut"><input type="button" class="btn btn-success" value="Check Out" onclick="window.location.href=\'/checkout\'"/></div></div><div class="row"><div class="col-lg-12"><table id="productTable" class="table-bordered table-striped table">';
							output+= '<thead><tr><th>Image</th><th>Product Name</th><th>Price</th><th>Quantity</th><th>Description</th><th>Update</th></tr></thead><tbody>';
							for(var i = 0; i < myCart.length; i++){
								output += '<tr><td><image src = ' + myCart[i].image + ' width = \'96\' /></td><td>' + myCart[i].name + '</td><td>$' + myCart[i].price + '</td><td class=\'set-width\'><input id = "' + myCart[i].id + '" type=\'text\' class=\'form-control\' value="'+ myCart[i].quantity + '" /></td><td><input type=\'button\' class=\'btn btn-primary\' value=\'Description\' /></td><td><input id= "' + myCart[i].id + '" type=\'button\' name="' + myCart[i].id + '" class=\'btn btn-success update_cart\' value=\'Update\' /></td></tr>';
							}
							output += '</tbody></table></div></div>';
						}
						updateCart.updateButton.innerHTML = output;

						launchDescription.showDescription();

					}, data);

				}
			},false);
		}

		updateCart.addTable();

	}

	launchDescription.showDescription = function(){
		if(document.getElementById("productTable")){
			var row = document.getElementById("productTable");
			row.addEventListener('click', function(e){
				if(e.target.value == 'Description'){
					var data = e.target.parentNode.nextElementSibling.firstElementChild.id;
					Ajax.sendRequest('/getDescriptionBox', function(res){
						var productArr = res.responseText.split('^^^');
						
						var descriptionBox = document.getElementById("descriptionBox");
						var output = '<div class="row drop-bottom" style="background-color: #4285F4; color: white; height: 35px;" ><div class="col-lg-12"><h5><strong>Description</strong></h5></div></div>';
						output += '<div class = "row drop-bottom"><div class="col-lg-4"><img src="' + productArr[1] + '" /></div>';
						output += '<div  style="padding-left: 25px;" class="col-lg-8"><h2>' + productArr[0] + '</h2>';
						output += '<strong><h4 style="color: green;">Price: $' + productArr[2] + '</h4></strong>';
						output += '<p>'+ productArr[3] + '</p></div></div>';
						output += '<div class="row"><div class="col-lg-12"><input type="button" id="closeDescription" value="Okay" class="btn btn-primary" /></div></div></div>';
						descriptionBox.innerHTML = output;
						descriptionBox.className = "show";
						launchDescription.hideDescription();

					}, data);
				}
			}, false);
		}
	}
	
	launchDescription.hideDescription = function(){
		if(document.getElementById("closeDescription")){
			var okayButton = document.getElementById("closeDescription");
			okayButton.addEventListener('click', function(e){
				if(e.target.type == 'button'){
					document.getElementById("descriptionBox").className = "hide";
				}
			});
		}
	}

	launchDescription.showDescription();

