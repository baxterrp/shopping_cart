if(document.getElementById("update_products")){
	
	var createTable = {};

	createTable.mySelect = document.getElementsByTagName('select')[0];
	createTable.myTable = document.getElementById('myTable');
	
	
	createTable.updateProduct = function(){
		if(document.getElementsByClassName("btn btn-primary updateButton")){
			createTable.myTable.addEventListener('click', function(e){
				if(e.target.type == "button" && e.target.className == "btn btn-primary updateButton"){
					var data = e.target.parentNode.parentNode.id;
					Ajax.sendRequest('/admin/updateProductPage?id=' + data, function(res){
						//console.log(res.responseText);
					});
				}
			}, false);
		}
	}

	createTable.addTable = function(){
		createTable.mySelect.addEventListener('change', function(){
			
			document.getElementById("myTable").innerHTML = "Loading table... Please wait...";

			var data = createTable.mySelect.value;

			Ajax.sendRequest('/createUpdateTable', function(res){
				document.getElementById("myTable").innerHTML = res.responseText;
		}, data);}, false);
	}



	createTable.addTable();
	createTable.updateProduct();
}