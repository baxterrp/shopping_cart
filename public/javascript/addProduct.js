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

				console.log(formData);

				Ajax.sendRequest('/addProduct', function(res){

				}, formData, true);
			}
		}, false);
	}
	uploadImage.init();
}