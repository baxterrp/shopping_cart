if(document.getElementById("registerAccount")){
	var submitButton = document.getElementById("registerAccount");
	var states = [{
	    	"name": "Alabama",
        	"abbreviation": "AL"
    	},
   		{
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]

	submitButton.addEventListener('click', function(e){
		var boxes = document.getElementsByTagName("input");
		var len = boxes.length-1;
		var errors = 0;
		for(var i = 0; i < len; i++){
			if((boxes[i].id == "fname" || boxes[i].id == "lname" || boxes[i].id == "city" || boxes[i].id == "state")){
				var tagPattern = /^[a-zA-Z]+$/;
				if(boxes[i].value == ""){
					errors++;
					setToShow(boxes[i], true);
				}else if(boxes[i].id == "state"){
					for(var j = 0; j < states.length; j++){
						if(boxes[i].value.toUpperCase() == states[j].abbreviation){
							setToShow(boxes[i], false);
							j = states.length;
						}else{
							if(j == states.length-1){
								setToShow(boxes[i], true);
							}
						}
					}
				}else if(!tagPattern.test(boxes[i].value)){
					errors++;
					setToShow(boxes[i], true);
				}else{
					setToShow(boxes[i], false);
				}
			}else if(boxes[i].id == "address" || boxes[i].id == "password" || boxes[i].id == "confirm"){
				var tagPattern = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
				if(boxes[i].id == "confirm"){
					if(boxes[i].value != boxes[i-1].value || boxes[i].value == ""){
						errors++;
						setToShow(boxes[i], true);
					}else{
						setToShow(boxes[i], false);
					}
				}else if(boxes[i].value == ""){
					errors++;
					setToShow(boxes[i], true)
				}else if(!tagPattern.test(boxes[i].value)){
					setToShow(boxes[i], true);
				}else{
					setToShow(boxes[i], false);
				}
			}else if(boxes[i].id == "zip"){
				var tagPattern = /\b\d{5}\b/g
				if(boxes[i].value == ""){
					errors++;
					setToShow(boxes[i], true);
				}else if(!tagPattern.test(boxes[i].value)){
					errors++;
					setToShow(boxes[i], true);
				}else{
					setToShow(boxes[i], false);
				}
			}else if(boxes[i].id == "phone"){
				var tagPattern = /^\d{3}-\d{3}-\d{4}$/
				if(boxes[i].value == ""){
					errors++;
					setToShow(boxes[i], true);
				}else if(!tagPattern.test(boxes[i].value)){
					errors++;
					setToShow(boxes[i], true);
				}else{
					setToShow(boxes[i], false);
				}
			}else if(boxes[i].id == "email"){
				var tagPattern = /[\w-]+@([\w-]+\.)+[\w-]+/
				if(boxes[i].value == ""){
					errors++;
					setToShow(boxes[i], true);
				}else if(!tagPattern.test(boxes[i].value)){
					errors++;
					setToShow(boxes[i], true);
				}else{
					setToShow(boxes[i], false);
				}
			}
		}

		var form = document.getElementsByTagName("form")[0];
		var	spans = form.getElementsByTagName('span');
		for(var i = 0; i < spans.length; i++){
			if(spans[i].id == 'fnameSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="fnameSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="fnameSpan"').popover('hide');
				}, false);
			}else if(spans[i].id == 'lnameSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="lnameSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="lnameSpan"').popover('hide');
				}, false);
			}else if(spans[i].id == 'addressSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="addressSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="addressSpan"').popover('hide');
				}, false);
			}else if(spans[i].id == 'citySpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="citySpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="citySpan"').popover('hide');
				}, false);
			}else if(spans[i] == 'stateSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="stateSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="stateSpan"').popover('hide');
				}, false);
			}else if(spans[i].id == 'zipSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="zipSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="zipSpan"').popover('hide');
				}, false);
			}else if(spans[i].id == 'phoneSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="phoneSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="phoneSpan"').popover('hide');
				}, false);
			}else if(spans[i].id == 'emailSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="emailSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="emailSpan"').popover('hide');
				}, false);
			}else if(spans[i].id == 'passSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="passSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="passSpan"').popover('hide');
				}, false);
			}else if(spans[i].id == 'confirmSpan'){
				spans[i].addEventListener('mouseover', function(e){
					$('[id="confirmSpan"').popover('show');
				}, false);
				spans[i].addEventListener('mouseout', function(e){
					$('[id="confirmSpan"').popover('hide');
				}, false);
			}
		}
		if(errors > 0)
			e.preventDefault();
	});
}

function setToShow(currentNode, show){
	if(show)
		currentNode.parentNode.firstElementChild.nextElementSibling.className = "glyphicon glyphicon-exclamation-sign red";
	else
		currentNode.parentNode.firstElementChild.nextElementSibling.className = "";

}