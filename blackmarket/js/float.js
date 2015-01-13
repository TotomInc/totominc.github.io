function Float() { //The basic structure for our floating text display
	this.id = 0;
	this.timer = FloatTimer;
	this.opacity = 100;
}

//Timer Related Variables
var FloatTimer = 3; //The time floats will stay on screen in seconds
var RefreshSpeed = 10; //The number of milliseconds between refreshes
var FloatIncrement = (1000 / RefreshSpeed) * FloatTimer; //The number of resfreshes per float
var FadeSpeed = 350 / FloatIncrement; //The percentage at which floats fade per refresh

//Float Related Variables
var FloatText = "+1 Click!"; //The text for floats
var Floats = []; //This array will hold all our floating text information

//Timers
var Timer = window.setInterval(function(){Tick()}, 1000); //A per second timer
var Timer2 = window.setInterval(function(){Refresh()},RefreshSpeed); //A faster timer for display updates

function CreateFloat(index) { //Create a new floating text div
	//Find the lowest float ID. We start with 0 to keep with array standards. Since we will splice in later, we can simply look for
	//a location that has a higher ID than its array location.
	for (var i=0;i<Floats.length;i++) {
		if (Floats[i].id > i) {break;}
	}
	
	//Note that if the array has a length of 0, i will return as 0
	
	//Create the new float class structure and assign the ID
	var NewFloat = new Float();
	NewFloat.id = i;
	Floats.splice(i,0,NewFloat); //Add the new element into its appropriate place in the array

	//Create the new div
	var NewDiv = document.createElement("div");
	NewDiv.innerHTML = FloatText;
	NewDiv.className = "FloatingText";
	NewDiv.id = "Float" + i;
	
	//Get the max left and top as the width and height of the Clickables container
	//Note the 50 and 20 are the width and height of the floating divs as set in the CSS file
	var MaxLeft = document.getElementById("p-1").offsetWidth - 50;
	var MaxHeight = document.getElementById("p-1").offsetHeight - 20;
	
	//Randomly create a left and top value for the new div
	var Left = Math.round(Math.random() * MaxLeft);
	var Top = Math.round(Math.random() * MaxHeight);
	
	//Readjust for the maximum left and top positions
	if (Left > MaxLeft) {Left = MaxLeft;}
	if (Top > MaxHeight) {Top = MaxHeight;}
	
	//Apply the left and top figures
	NewDiv.style.left = Left + "px";
	NewDiv.style.top = Top + "px";
	
	document.getElementById("p-1").appendChild(NewDiv);
}

function Tick() {
	for (var i=0;i<Floats.length;i++) {
		Floats[i].timer--;
		
		//Get the element and store it in a variable for ease of use later
		var element = document.getElementById("Float" + Floats[i].id);

		if (Floats[i].timer <= 0) {
			//Remove the element from the display
			element.parentNode.removeChild(element);
			
			//Remove the item from the array. Since we're shifting a number down, we need to decrement i to cycle this particular number again.
			Floats.splice(i,1);
			i--;
		}
	}
}

function Refresh() {
	for (var i=0;i<Floats.length;i++) {
		//Get the element and store it in a variable for ease of use later
		var element = document.getElementById("Float" + Floats[i].id);

		//Modify the display of the float by lifting it up slightly
		element.style.top = (element.offsetTop - 1) + "px";
		
		//Calculate the new opacity value
		Floats[i].opacity -= FadeSpeed;
		
		//Apply the new opacity
		element.style.opacity = Math.floor(Floats[i].opacity) / 100;
		element.style.filter = "alpha(opacity=" + Math.floor(Floats[i].opacity) + ")";
	}
}