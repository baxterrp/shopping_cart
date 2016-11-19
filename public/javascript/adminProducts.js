if(document.getElementById("addProduct")){

	var form = document.getElementById("addProduct");

	var uploadImage = {};

	uploadImage.init = function(){

		form.addEventListener('click', function(e){

			if(e.target.type == "button"){

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

				}, formData, true);
			}
		}, false);
	}
	uploadImage.init();
}

if(document.getElementById("update_products")){
	
	var createTable = {};

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
}

if(document.getElementById("updateProductPage")){
	var updateProds = {}

	updateProds.updateButton = document.getElementById("updateProductPage");

	updateProds.updateButton.addEventListener('click', function(e){
		if(e.target.type =="button"){

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
					console.log(res.responseText);
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

				output += "<tr><td>" + theMonth + "-" + theDay + "-" + theYear + " at " + theHour + ":" + theMins + " " + mid + "</td><td>" + orders[i]._id + "</td><td><button type='button' class='btn btn-primary'>Details</button</td></tr>";
			}
			output += "</tbody></table></div></div>";

			document.getElementById("myTable").innerHTML = output;
		}, data);
	}, false);	
}

launchDescription = {};

launchDescription.showDescription = function(){
	if(document.getElementById("myTable")){
		var row = document.getElementById("myTable");
		row.addEventListener('click', function(e){
			if(e.target.type == 'button'){
				var id = e.target.parentNode.parentNode.firstElementChild.nextElementSibling.firstChild.nodeValue;
				Ajax.sendRequest('/admin/getOrderBox', function(res){
					var total = 0;
					var order = JSON.parse(res.responseText);
					var products = order.productArr;
					var descriptionBox = document.getElementById("descriptionBox");
					var output = '<div class="row drop-bottom" style="background-color: #4285F4; color: white; height: 35px;" ><div class="col-lg-12"><h5><strong>Description</strong></h5></div></div>';
					output += "<table class='table table-bordered table-striped'><thead><tr><th>Product Id</th><th>Product Name</th><th>Count</th><th>Price</th><th>Total</th></thead><tbody>";
					for(var i = 0; i < products.length; i++){
						output += "<tr><td>" + products[i].itemId + "</td><td>" + products[i].name + "</td><td>" + products[i].itemCount + "</td><td>$" + products[i].price + "</td><td>$" + (products[i].price * products[i].itemCount).toFixed(2) + "</td></tr>";
						total += products[i].price * products[i].itemCount;
					}
					output += "<tr><td colspan='3'></td><td>Grand Total</td><td>$" + total.toFixed(2) + "</td></tr>";
					output += "</tbody></table>";
					output += '<div class="row"><div class="col-lg-12"><input type="button" id="closeDescription" value="Okay" class="btn btn-primary" /></div></div></div>';
					descriptionBox.innerHTML = output;
					descriptionBox.className = "show";
					launchDescription.hideDescription();
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

launchDescription.showDescription();