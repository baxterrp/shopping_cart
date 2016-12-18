if(document.getElementById("addGroup")){
	var addGroup = document.getElementById("addGroup");
	addGroup.addEventListener('click', function(e){
		var group = document.getElementById("group").value;
		var folder = document.getElementById("folder").value;
		launchConfirmation.showConfirmation("Product Group Added", "Adding Product Group, Please Wait...","#4285F4");
		Ajax.sendRequest('/admin/add_group', function(res){
			launchConfirmation.showConfirmation("Success", "Product group has been created", "#5cb85c");
			var confirmationBox = document.getElementById("confirmationBox");
			confirmationBox.innerHTML += "<div class='row' style='width: 400px;'><div class='col-lg-12'><input type='button' id='closeConfirmation' value='Okay' class='btn btn-primary' /></div>";				
			launchConfirmation.hideConfirmation();
		}, group + '^^^' + folder);
		document.getElementById("group").value = "";
		document.getElementById("folder").value = "";
	}, false);

}

if(document.getElementById("invalidAdmin")){
	var error = window.location.href.split("error=");
	console.log(error);
	if(error[1] == "invalid-user"){
		document.getElementById("invalidAdmin").className = "show";
	}
}

if(document.getElementById("addProduct")){

	var form = document.getElementById("addProduct");

	var uploadImage = {};

	uploadImage.init = function(){

		form.addEventListener('click', function(e){

			if(e.target.type == "button"){

				launchConfirmation.showConfirmation("Product Added", "Product Being Added Please Wait...", "#4285F4");

				var formData = new FormData();

				var group = document.getElementById("groupName").value,
					name = document.getElementById("name").value,
					price = document.getElementById("price").value,
					file = document.getElementById("file"),
					description = document.getElementById("description").value;

				formData.append('group', group);
				formData.append('name', name);
				formData.append('price', price);
				formData.append('file', file.files[0]);
				formData.append('description', description);

				Ajax.sendRequest('/addProduct', function(res){
					launchConfirmation.showConfirmation("Success", "Product Added", "#5cb85c");
					var confirmationBox = document.getElementById("confirmationBox");
					confirmationBox.innerHTML += "<div class='row' style='width: 400px;'><div class='col-lg-12'><input type='button' id='closeConfirmation' value='Okay' class='btn btn-primary' /></div>";				
					launchConfirmation.hideConfirmation();
					document.getElementById("name").value = "";
					document.getElementById("groupName").value = "Please Select a Product Group";
					document.getElementById("price").value = "";
					document.getElementById("file").value = "";
					document.getElementById("description").value = "";
				}, formData, true);
			}
		}, false);
	}
	uploadImage.init();
}

if(document.getElementById("update_products")){
	
	var createTable = {};
	var deleteProduct = {};

	createTable.mySelect = document.getElementsByTagName('select')[0];
	createTable.myTable = document.getElementById('myTable');
	
	createTable.addTable = function(){
		createTable.mySelect.addEventListener('change', function(){
			
			document.getElementById("myTable").innerHTML = "Loading table... Please wait...";

			var data = createTable.mySelect.value;

			Ajax.sendRequest('/createUpdateTable', function(res){
				document.getElementById("myTable").innerHTML = res.responseText;
		}, data);}, false);
	}
	createTable.addTable();

	deleteProduct.init = function(){
		createTable.myTable.addEventListener('click', function(e){
			if(e.target.value == 'Delete Product'){
				var id = e.target.parentNode.parentNode.id;

				launchConfirmation.showConfirmation("Warning!", "You are about to permanently delete this record. It cannot be undone. If you want to continue, click \"Okay\". Otherwise, click \"Cancel\".", "#d9534f");
				var confirmationBox = document.getElementById("confirmationBox");
				confirmationBox.innerHTML += "<div class='row' style='width: 400px;'><div class='col-lg-12'><input type='button' id='closeConfirmation' value='Cancel' class='btn btn-danger' style='margin-right: 5px;' /><input type='button' id='confirmDelete' value='Okay' class='btn btn-success' /></div>";
				launchConfirmation.hideConfirmation();

				var deleteButton = document.getElementById("confirmDelete");
				deleteButton.addEventListener('click', function(e){
					Ajax.sendRequest('/admin/deleteProduct', function(res){
						Ajax.sendRequest('/createUpdateTable', function(res){
							document.getElementById("confirmationBox").className = "hide";
							document.getElementById("myTable").innerHTML = res.responseText;
						}, createTable.mySelect.value);
					}, id);
				}, false);
			}
		}, false);
	}
	deleteProduct.init();
}

if(document.getElementById("updateProductPage")){
	var updateProds = {}

	updateProds.updateButton = document.getElementById("updateProductPage");

	updateProds.updateButton.addEventListener('click', function(e){
		if(e.target.type =="button"){
			launchConfirmation.showConfirmation("Updating Product", "Updating Product Please Wait...", "#4285F4");
			var group = document.getElementById("groupName").value,
				name = document.getElementById("name").value,
				price = document.getElementById("price").value,
				description = document.getElementById("description").value,
				id = document.getElementById("hidden").value,
				file = document.getElementById("file");
			if(file.files[0]){
				console.log("there is an image");
				var formData = new FormData();
				formData.append('prodId', id);
				formData.append('group', group);
				formData.append('name', name);
				formData.append('price', price);
				formData.append('description', description);
				formData.append('file', file.files[0]);
				formData.append('imageSent', true);
				Ajax.sendRequest('/updateProdsWithImage', function(res){
						launchConfirmation.showConfirmation("Success", "Product Updated", "#5cb85c");
					var confirmationBox = document.getElementById("confirmationBox");
					confirmationBox.innerHTML += "<div class='row' style='width: 400px;'><div class='col-lg-12'><input type='button' id='closeConfirmation' value='Okay' class='btn btn-primary' /></div>";
					launchConfirmation.hideConfirmation();
				}, formData, true);
			}else{
				var formData = {};
				formData.group = group;
				formData.name = name;
				formData.price = price;
				formData.description = description;

				var prodId = id;

				formData = JSON.stringify(formData) + '^^^' + prodId;
				Ajax.sendRequest('/updateProdsNoImage', function(res){
					console.log("hi");
					launchConfirmation.showConfirmation("Success", "Product Updated", "#5cb85c");
					var confirmationBox = document.getElementById("confirmationBox");
					confirmationBox.innerHTML += "<div class='row' style='width: 400px;'><div class='col-lg-12'><input type='button' id='closeConfirmation' value='Okay' class='btn btn-primary' /></div>";
					launchConfirmation.hideConfirmation();
				}, formData);
			}
		}
	}, false);
}

if(document.getElementById('view_customers')){
	var select = document.getElementsByTagName('select')[0];

	select.addEventListener('change', function(){
		
		data = select.value;

		Ajax.sendRequest('/admin/returnOrderTable', function(res){

			var orders = JSON.parse(res.responseText);
			var output = "<div class='row'><div class='col-lg-12'>";
			output += "<table class='table table-bordered table-striped'>";
			output += "<thead><tr><th>Date and Time</th><th>Order Number</th><th>Get Details</th></tr>";
			output += "<tbody>";
			
			for(var i = 0; i < orders.length; i++){
				var newDate = new Date(parseInt(orders[i].timeStamp)),
					theMonth = newDate.getMonth()+1,
					theDay = newDate.getDate(),
					theYear = newDate.getFullYear(),
					theHour = newDate.getHours(),
					theMins = newDate.getMinutes();

				if(theMins < 10){
					theMins = '0' + theMins;
				}
				var mid = 'am';
				if(theHour > 12){
					theHour -= 12;
					if((newDate.getHours()+1) > 12)
						mid = 'pm';
				}

				output += "<tr><td>" + theMonth + "-" + theDay + "-" + theYear + " at " + theHour + ":" + theMins + " " + mid + "</td><td>" + orders[i]._id + "</td><td><button type='button' class='btn btn-primary' name='details'>Details</button</td></tr>";
			}
			output += "</tbody></table></div></div>";

			document.getElementById("myTable").innerHTML = output;
		}, data);
	}, false);	
}



launchDescription = {};
launchConfirmation = {};

launchDescription.showDescription = function(){
	if(document.getElementById("myTable")){
		var row = document.getElementById("myTable");
		row.addEventListener('click', function(e){
			if(e.target.type == 'button' && e.target.name == 'details'){
				var id = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.firstChild.nodeValue;
				Ajax.sendRequest('/admin/getOrderBox', function(res){
					var total = 0;
					var order = JSON.parse(res.responseText);
					var products = order.productArr;
					var descriptionBox = document.getElementById("descriptionBox");
					var output = '<div class="row drop-bottom" style="background-color: #4285F4; color: white; height: 35px;" ><div class="col-lg-12"><h5><strong>Description</strong></h5></div></div>';
					output += "<table class='table table-bordered table-striped'><thead><tr><th>Product Id</th><th>Product Name</th><th>Count</th><th>Price</th><th>Total</th></thead><tbody>";
					var i = 0;
					function getIsActive(){
						Ajax.sendRequest('/admin/getIsActive', function(res){
							output += "<tr><td>" + products[i].itemId;
							console.log(res.responseText);
							if(res.responseText == "false")
								output += "<span style='color: red'> PRODUCT REMOVED</span>";
							output += "</td><td>" + products[i].name + "</td><td>" + products[i].itemCount + "</td><td>$" + products[i].price + "</td><td>$" + (products[i].price * products[i].itemCount).toFixed(2) + "</td></tr>";
							total += products[i].price * products[i].itemCount;
							i++;
							if(i < products.length){
								getIsActive();
							}else{
								output += "<tr><td colspan='3'></td><td>Grand Total</td><td>$" + total.toFixed(2) + "</td></tr>";
								output += "</tbody></table>";
								output += '<div class="row"><div class="col-lg-12"><input type="button" id="closeDescription" value="Okay" class="btn btn-primary" /></div></div></div>';
								descriptionBox.innerHTML = output;
								descriptionBox.className = "show";
								launchDescription.hideDescription();
							}
						}, products[i].itemId);
					}
					getIsActive();

				}, id);
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

launchConfirmation.showConfirmation = function(header, description, color){

	if(header != undefined){
		var confirmationBox = document.getElementById("confirmationBox");
		confirmationBox.innerHTML = "<div class = 'row' style='width: 400px; background-color: " + color + "; color: white; height: 35px;'><div class='col-lg-12'><h5><strong>" + header + "</strong></h5></div></div>";
		confirmationBox.innerHTML += "<div class = 'row' style ='width: 400px; padding-top: 15px;'><div class='col-lg-12'><p>" + description + "</p></div></div>";
		confirmationBox.className = "show";
	}
}

launchConfirmation.hideConfirmation = function(){
	console.log("hideConfirmation");
	var okayButton = document.getElementById("closeConfirmation");
	okayButton.addEventListener('click', function(e){
		document.getElementById("confirmationBox").className = "hide";
	});
}

launchConfirmation.showConfirmation();
launchDescription.showDescription();