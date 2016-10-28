var obj = {
	
	init : function(){
		//call validate() function
		return obj.validate();		
	}
}

//delError() called to remove error symbol		
obj.delError = function(input){	
	//checks for existing error symbols by searching for spans
	if(input.parentNode.firstChild.nextSibling.nextSibling.nextSibling.tagName == "SPAN")
	{
		//creates variable containg node list of spans, targets text box(input)'s parentNode and uses removeChild to delete span [0] of node list
		var delSpan = input.parentNode.getElementsByTagName('SPAN');
		input.parentNode.removeChild(delSpan[0]);
	}
}	

//addError() called to add error symbols
obj.addError = function(input){
	
	//creates span - targets text box(input)'s parentNode and uses insert before to place it before the text box - uses .className to change class name to glyphicon
	var errSpan = document.createElement("span");
	input.parentNode.insertBefore(errSpan, input);
	errSpan.className = "glyphicon glyphicon-exclamation-sign red";
}

obj.validate = function(){
	
	//boxes: node list of inputs 
	//tagPattern: empty string that will later contain regex code
	//len: length of input node list - 1 for the button
	//errCount: add 1 when text box is blank - ensures empty string won't get passed to regex .test
	var boxes = document.getElementsByTagName("input");
	var tagPattern = "";
	var len = boxes.length-1;
	var errCount = 0;
	var errors = 0;
	
	//loop through node list boxes
	for(var i = 0; i < len; i++){
		
		//run delError() to remove any existing error symbols - ensure two don't stack
		obj.delError(document.getElementById(boxes[i].id));
		
		//if statement checks value of inputs
		if(boxes[i].value == "")
		{
			//if value is blank - addError()
			obj.addError(document.getElementById(boxes[i].id));
			//increment errCount to skip over regex .test
			errCount++;
			errors++;
		}
		//else statements check id's and assign a regex to tagPattern, reset errCount to 0 to run regex .test
		else if(boxes[i].id == "fname" || boxes[i].id == "lname" || boxes[i].id == "city" || boxes[i].id == "state")
		{
			tagPattern = /[a-zA-Z]/;
			errCount = 0;
		}
		else if(boxes[i].id == "address" || boxes[i].id == "password" || boxes[i].id == "confirm")
		{
			tagPattern = /^[a-zA-Z0-9]/;
			errCount = 0;
		}
		else if(boxes[i].id == "zip")
		{
			tagPattern = /^[0-9]+[0-9]+[0-9]+[0-9]+[0-9]$/;
			errCount = 0;
		}
		else if(boxes[i].id == "phone")
		{
			tagPattern = /^\d{3}-\d{3}-\d{4}$/;
			errCount = 0;
		}
		else if(boxes[i].id == "email")
		{
			tagPattern = /[\w-]+@([\w-]+\.)+[\w-]+/;
			errCount = 0;
		}
		
		//if errCount is 0, the targeted text box was not blank, run this code
		if(errCount == 0)
		{
			//get text entered to the targeted text box
			var tagValue = document.getElementById(boxes[i].id).value;
			
			//use .test to check tagPattern's value against tagValue
			if(!tagPattern.test(tagValue)){
				
				//if value doesn't match regex code , addError()
				obj.addError(document.getElementById(boxes[i].id));
				errors++;
			}
		}
	}
	if(errors > 0){return false;}
}