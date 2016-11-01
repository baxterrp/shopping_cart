if(document.getElementById("home_page")){
	
	var createTable = {};
	var addToCart = {};

	createTable.mySelect = document.getElementsByTagName('select')[0];
	addToCart.myCart = document.getElementById('cartCount');
	addToCart.updateButton = document.getElementById('myTable');

	createTable.addTable = function(){
		createTable.mySelect.addEventListener('change', function(){
			
			document.getElementById("myTable").innerHTML = "Loading table... Please wait...";

			var data = createTable.mySelect.value;
			Ajax.sendRequest('/create_table', function(res){
				document.getElementById("myTable").innerHTML = res.responseText;
		}, data);}, false);
	}

	addToCart.launch = function(){
		addToCart.updateButton.addEventListener('click', function(e){
			if(e.target.type == 'button' && e.target.className == "btn btn-success addToCart"){
				
				var thisID = e.target.id + ',1';

				Ajax.sendRequest('/updateCart', function(res){
					var updateCount = res.responseText.split('^^^');
					addToCart.myCart.innerHTML = updateCount[0];
				}, thisID);}
			}, false);
	}

	createTable.addTable();
	addToCart.launch();
}