var money;
var earned;
var totalEarned;
var angels;
var angelRate;

var totalIncMultiplier;
var totalTimeMultiplier;
var minOwned;

var owned;
var incMultiplier;
var timeMultiplier;
var progress;

var upgradesOwned;
var managersOwned;
var achievementsOwned;

var before;
var speed;
var buyAmount;

var buildings = [
new Building("Lemonade Stand"		,4				,1 				,1.07	,1.5 	),
new Building("Newspaper Delivery"	,60				,60 			,1.15 	,3 		),
new Building("Car Wash"				,720			,540 			,1.14 	,6 		),
new Building("Pizza Delivery"		,8640			,4320 			,1.13 	,12 	),
new Building("Donut Shop"			,103680			,51840 			,1.12 	,24 	),
new Building("Shrimp Boat"			,1244160		,622080 		,1.11 	,96 	),
new Building("Hockey Team"			,14929920		,7464960 		,1.10 	,384 	),
new Building("Movie Studio"			,179159040		,89579520 		,1.09 	,1536 	),
new Building("Bank"					,2149908480		,1074954240 	,1.08 	,6144 	),
new Building("Oil Company"			,25789901760	,29668737024 	,1.07 	,36864 	) ];

var upgrades = [
new Upgrade("Little Umbrellas"			,"Lemonade Stand profit x3"			,250000							,"incMultiplier[0]"		,"*3"	),
new Upgrade("Funny Pages"				,"Newspaper Delivery profit x3"		,500000							,"incMultiplier[1]"		,"*3"	),
new Upgrade("Drive Through Wash"		,"Car Wash profit x3"				,1000000						,"incMultiplier[2]"		,"*3"	),
new Upgrade("Robot Cars"				,"Pizza Delivery profit x3"			,5000000						,"incMultiplier[3]"		,"*3"	),
new Upgrade("Pre-packaged Pastries"		,"Donut Shop profit x3"				,10000000						,"incMultiplier[4]"		,"*3"	),
new Upgrade("Shrimp Satellite"			,"Shrimp Boat profit x3"			,25000000						,"incMultiplier[5]"		,"*3"	),
new Upgrade("Team Jet"					,"Hockey Team profit x3"			,500000000						,"incMultiplier[6]"		,"*3"	),
new Upgrade("3D Cameras"				,"Movie Studio profit x3"			,10000000000					,"incMultiplier[7]"		,"*3"	),
new Upgrade("Gold Plated Vaults"		,"Bank profit x3"					,50000000000					,"incMultiplier[8]"		,"*3"	),
new Upgrade("Spill Proof Tankers"		,"Oil Company profit x3"			,250000000000					,"incMultiplier[9]"		,"*3"	),
new Upgrade("Monopoly"					,"All profits x3"					,1000000000000					,"totalIncMultiplier"	,"*3"	),
new Upgrade("Novelty Straws"			,"Lemonade Stand profit x5"			,20000000000000					,"incMultiplier[0]"		,"*5"	),
new Upgrade("Sports Pages"				,"Newspaper Delivery profit x5"		,50000000000000					,"incMultiplier[1]"		,"*5"	),
new Upgrade("Automatic Vacuums"			,"Car Wash profit x5"				,100000000000000				,"incMultiplier[2]"		,"*5"	),
new Upgrade("Online Ordering"			,"Pizza Delivery profit x5"			,500000000000000				,"incMultiplier[3]"		,"*5"	),
new Upgrade("Donut Holes"				,"Donut Shop profit x5"				,1000000000000000				,"incMultiplier[4]"		,"*5"	),
new Upgrade("Shrimp Magnets"			,"Shrimp Boat profit x5"			,2000000000000000				,"incMultiplier[5]"		,"*5"	),
new Upgrade("Energy Drink Sponsors"		,"Hockey Team profit x5"			,5000000000000000				,"incMultiplier[6]"		,"*5"	),
new Upgrade("Green Screens"				,"Movie Studio profit x5"			,7000000000000000				,"incMultiplier[7]"		,"*5"	),
new Upgrade("Free Fancy Pens"			,"Bank profit x5"					,10000000000000000				,"incMultiplier[8]"		,"*5"	),
new Upgrade("Eco-safe Pipeline"			,"Oil Company profit x5"			,20000000000000000				,"incMultiplier[9]"		,"*5"	),
new Upgrade("Monopsony"					,"All profits x5"					,50000000000000000				,"totalIncMultiplier"	,"*5"	),
new Upgrade("Holy Moola"				,"Angel Investor effectiveness +1%"	,100000000000000000				,"angelRate"			,"+1"	),
new Upgrade("Imported Ice Cubes"		,"Lemonade Stand profit x9"			,250000000000000000				,"incMultiplier[0]"		,"*9"	),
new Upgrade("Business Pages"			,"Newspaper Delivery profit x9"		,500000000000000000				,"incMultiplier[1]"		,"*9"	),
new Upgrade("Microfiber Sponges"		,"Car Wash profit x9"				,750000000000000000				,"incMultiplier[2]"		,"*9"	),
new Upgrade("Drone Delivery"			,"Pizza Delivery profit x9"			,1000000000000000000			,"incMultiplier[3]"		,"*9"	),
new Upgrade("Bacon Sprinkles"			,"Donut Shop profit x9"				,2000000000000000000			,"incMultiplier[4]"		,"*9"	),
new Upgrade("Carbon Nanotube Nets"		,"Shrimp Boat profit x9"			,3000000000000000000			,"incMultiplier[5]"		,"*9"	),
new Upgrade("GPS Puck Tracker"			,"Hockey Team profit x9"			,5000000000000000000			,"incMultiplier[6]"		,"*9"	),
new Upgrade("Smell-O-Vision"			,"Movie Studio profit x9"			,7000000000000000000			,"incMultiplier[7]"		,"*9"	),
new Upgrade("Credit Card Implants"		,"Bank profit x9"					,10000000000000000000			,"incMultiplier[8]"		,"*9"	),
new Upgrade("Hyperloop Pumps"			,"Oil Company profit x9"			,20000000000000000000			,"incMultiplier[9]"		,"*9"	),
new Upgrade("Illuminati"				,"All profits x9"					,50000000000000000000			,"totalIncMultiplier"	,"*9"	),
new Upgrade("Immaculate Consumption"	,"Angel Investor effectiveness +1%"	,100000000000000000000			,"angelRate"			,"+1"	),
new Upgrade("Combustible Lemons"		,"Lemonade Stand profit x11"		,250000000000000000000			,"incMultiplier[0]"		,"*11"	),
new Upgrade("Gossip Pages"				,"Newspaper Delivery profit x11"	,500000000000000000000			,"incMultiplier[1]"		,"*11"	),
new Upgrade("Blue Sky Brand Wax"		,"Car Wash profit x11"				,1000000000000000000000			,"incMultiplier[2]"		,"*11"	),
new Upgrade("Caviar Stuffed Crust"		,"Pizza Delivery profit x11"		,2000000000000000000000			,"incMultiplier[3]"		,"*11"	),
new Upgrade("Free Coffee"				,"Donut Shop profit x11"			,3000000000000000000000			,"incMultiplier[4]"		,"*11"	),
new Upgrade("3D Printed Shrimp"			,"Shrimp Boat profit x11"			,4000000000000000000000			,"incMultiplier[5]"		,"*11"	),
new Upgrade("Lord Stanley's Cup"		,"Hockey Team profit x11"			,5000000000000000000000			,"incMultiplier[6]"		,"*11"	),
new Upgrade("James Camera"				,"Movie Studio profit x11"			,6000000000000000000000			,"incMultiplier[7]"		,"*11"	),
new Upgrade("Cryptocurrency"			,"Bank profit x11"					,7000000000000000000000			,"incMultiplier[8]"		,"*11"	),
new Upgrade("Biodiesel Derricks"		,"Oil Company profit x11"			,8000000000000000000000			,"incMultiplier[9]"		,"*11"	),
new Upgrade("Profit Prophet"			,"All profits x11"					,9000000000000000000000			,"totalIncMultiplier"	,"*11"	), 
new Upgrade("Eternal Revenue Service"	,"Angel Investor effectiveness +2%"	,100000000000000000000000		,"angelRate"			,"+2"	) ];

var managers = [
new Manager("Cabe Johnson"			,"Automatically runs the lemonade stand"		,1000 			),
new Manager("Perry Black"			,"Automatically runs the newspaper delivery"	,15000 			),
new Manager("W. W. Heisenbird"		,"Automatically runs the car wash"				,100000 		),
new Manager("Mama Sean"				,"Automatically runs the pizza delivery"		,500000 		),
new Manager("Jim Thorton"			,"Automatically runs the donut shop"			,1200000 		),
new Manager("Forest Trump"			,"Automatically runs the shrimp boat"			,10000000 		),
new Manager("Dawn Cheri"			,"Automatically runs the hockey team"			,111111111 		),
new Manager("Stefani Speilburger"	,"Automatically runs the movie studio"			,555555555 		),
new Manager("The Dark Lord"			,"Automatically runs the bank"					,10000000000 	),
new Manager("Derrick Plainview"		,"Automatically runs the oil company"			,100000000000 	) ];

var achievements = [
new Achievement("Easy Squeezy"					,"Acquire 25 Lemonade Stands"		,"Lemonade Stands Speed x2"		,"owned[0]"		,25 	,"timeMultiplier[0]"	,"/2"	),
new Achievement("Thirst Quencher"				,"Acquire 50 Lemonade Stands"		,"Lemonade Stands Speed x2"		,"owned[0]"		,50 	,"timeMultiplier[0]"	,"/2"	),
new Achievement("Lemon Lord"					,"Acquire 100 Lemonade Stands"		,"Lemonade Stands Speed x2"		,"owned[0]"		,100 	,"timeMultiplier[0]"	,"/2"	),
new Achievement("Citrus Emperor"				,"Acquire 200 Lemonade Stands"		,"Lemonade Stands Speed x2"		,"owned[0]"		,200 	,"timeMultiplier[0]"	,"/2"	),
new Achievement("The Zestiest"					,"Acquire 300 Lemonade Stands"		,"Lemonade Stands Speed x2"		,"owned[0]"		,300 	,"timeMultiplier[0]"	,"/2"	),
new Achievement("Lemontopia"					,"Acquire 400 Lemonade Stands"		,"Lemonade Stands Speed x2"		,"owned[0]"		,400 	,"timeMultiplier[0]"	,"/2"	),
new Achievement("Acceptable!"					,"Acquire 500 Lemonade Stands"		,"Lemonade Stands Speed x2"		,"owned[0]"		,500 	,"timeMultiplier[0]"	,"/2"	),
new Achievement("Extra Extra!"					,"Acquire 25 Newspaper Delivery"	,"Newspaper Delivery Speed x2"	,"owned[1]"		,25 	,"timeMultiplier[1]"	,"/2"	),
new Achievement("Read All About It"				,"Acquire 50 Newspaper Delivery"	,"Newspaper Delivery Speed x2"	,"owned[1]"		,50 	,"timeMultiplier[1]"	,"/2"	),
new Achievement("Daily Deliveries"				,"Acquire 100 Newspaper Delivery"	,"Newspaper Delivery Speed x2"	,"owned[1]"		,100 	,"timeMultiplier[1]"	,"/2"	),
new Achievement("Digital Digest"				,"Acquire 200 Newspaper Delivery"	,"Newspaper Delivery Speed x2"	,"owned[1]"		,200 	,"timeMultiplier[1]"	,"/2"	),
new Achievement("Telepathic News"				,"Acquire 300 Newspaper Delivery"	,"Newspaper Delivery Speed x2"	,"owned[1]"		,300 	,"timeMultiplier[1]"	,"/2"	),
new Achievement("News FROM THE FUTURE"			,"Acquire 400 Newspaper Delivery"	,"Newspaper Delivery Speed x2"	,"owned[1]"		,400 	,"timeMultiplier[1]"	,"/2"	),
new Achievement("Omniscience at 11:00"			,"Acquire 500 Newspaper Delivery"	,"Newspaper Delivery Speed x2"	,"owned[1]"		,500 	,"timeMultiplier[1]"	,"/2"	),
new Achievement("Working at the Carwash!"		,"Acquire 25 Car Wash"				,"Car Wash Speed x2"			,"owned[2]"		,25 	,"timeMultiplier[2]"	,"/2"	),
new Achievement("Wash and Wax"					,"Acquire 50 Car Wash"				,"Car Wash Speed x2"			,"owned[2]"		,50 	,"timeMultiplier[2]"	,"/2"	),
new Achievement("Supreme Service"				,"Acquire 100 Car Wash"				,"Car Wash Speed x2"			,"owned[2]"		,100 	,"timeMultiplier[2]"	,"/2"	),
new Achievement("Diamond Sealed"				,"Acquire 200 Car Wash"				,"Car Wash Speed x2"			,"owned[2]"		,200 	,"timeMultiplier[2]"	,"/2"	),
new Achievement("Infinite Clean"				,"Acquire 300 Car Wash"				,"Car Wash Speed x2"			,"owned[2]"		,300 	,"timeMultiplier[2]"	,"/2"	),
new Achievement("Artificially Intelligent Suds"	,"Acquire 400 Car Wash"				,"Car Wash Speed x2"			,"owned[2]"		,400 	,"timeMultiplier[2]"	,"/2"	),
new Achievement("Grey Goo Detergent"			,"Acquire 500 Car Wash"				,"Car Wash Speed x2"			,"owned[2]"		,500 	,"timeMultiplier[2]"	,"/2"	),
new Achievement("30 min or Less"				,"Acquire 25 Pizza Delivery"		,"Pizza Delivery Speed x2"		,"owned[3]"		,25 	,"timeMultiplier[3]"	,"/2"	),
new Achievement("Fancy Toppings"				,"Acquire 50 Pizza Delivery"		,"Pizza Delivery Speed x2"		,"owned[3]"		,50 	,"timeMultiplier[3]"	,"/2"	),
new Achievement("Gourmet Crust"					,"Acquire 100 Pizza Delivery"		,"Pizza Delivery Speed x2"		,"owned[3]"		,100 	,"timeMultiplier[3]"	,"/2"	),
new Achievement("Free Cheese Bread"				,"Acquire 200 Pizza Delivery"		,"Pizza Delivery Speed x2"		,"owned[3]"		,200 	,"timeMultiplier[3]"	,"/2"	),
new Achievement("Home Rehydrator"				,"Acquire 300 Pizza Delivery"		,"Pizza Delivery Speed x2"		,"owned[3]"		,300 	,"timeMultiplier[3]"	,"/2"	),
new Achievement("Intravenous Cheese"			,"Acquire 400 Pizza Delivery"		,"Pizza Delivery Speed x2"		,"owned[3]"		,400 	,"timeMultiplier[3]"	,"/2"	),
new Achievement("Everlasting Pepperoni"			,"Acquire 500 Pizza Delivery"		,"Pizza Delivery Speed x2"		,"owned[3]"		,500 	,"timeMultiplier[3]"	,"/2"	),
new Achievement("Lots of Dough"					,"Acquire 25 Donut Shop"			,"Donut Shop Speed x2"			,"owned[4]"		,25 	,"timeMultiplier[4]"	,"/2"	),
new Achievement("Extra Sprinkles"				,"Acquire 50 Donut Shop"			,"Donut Shop Speed x2"			,"owned[4]"		,50 	,"timeMultiplier[4]"	,"/2"	),
new Achievement("Deep Fried"					,"Acquire 100 Donut Shop"			,"Donut Shop Speed x2"			,"owned[4]"		,100 	,"timeMultiplier[4]"	,"/2"	),
new Achievement("Donut Filled Donuts"			,"Acquire 200 Donut Shop"			,"Donut Shop Speed x2"			,"owned[4]"		,200 	,"timeMultiplier[4]"	,"/2"	),
new Achievement("Doughnut Shaped Universe"		,"Acquire 300 Donut Shop"			,"Donut Shop Speed x2"			,"owned[4]"		,300 	,"timeMultiplier[4]"	,"/2"	),
new Achievement("Unified Donut Theory"			,"Acquire 400 Donut Shop"			,"Donut Shop Speed x2"			,"owned[4]"		,400 	,"timeMultiplier[4]"	,"/2"	),
new Achievement("Final Donut"					,"Acquire 500 Donut Shop"			,"Donut Shop Speed x2"			,"owned[4]"		,500 	,"timeMultiplier[4]"	,"/2"	),
new Achievement("Wanna Buy A Shrimp Boat?"		,"Acquire 25 Shrimp Boat"			,"Shrimp Boat Speed x2"			,"owned[5]"		,25 	,"timeMultiplier[5]"	,"/2"	),
new Achievement("Surf and Turf"					,"Acquire 50 Shrimp Boat"			,"Shrimp Boat Speed x2"			,"owned[5]"		,50 	,"timeMultiplier[5]"	,"/2"	),
new Achievement("Gumbo King"					,"Acquire 100 Shrimp Boat"			,"Shrimp Boat Speed x2"			,"owned[5]"		,100 	,"timeMultiplier[5]"	,"/2"	),
new Achievement("Gigantic Shrimp"				,"Acquire 200 Shrimp Boat"			,"Shrimp Boat Speed x2"			,"owned[5]"		,200 	,"timeMultiplier[5]"	,"/2"	),
new Achievement("Galactic Fleet"				,"Acquire 300 Shrimp Boat"			,"Shrimp Boat Speed x2"			,"owned[5]"		,300 	,"timeMultiplier[5]"	,"/2"	),
new Achievement("Celestial Shrimp"				,"Acquire 400 Shrimp Boat"			,"Shrimp Boat Speed x2"			,"owned[5]"		,400 	,"timeMultiplier[5]"	,"/2"	),
new Achievement("Cosmic Grill"					,"Acquire 500 Shrimp Boat"			,"Shrimp Boat Speed x2"			,"owned[5]"		,500 	,"timeMultiplier[5]"	,"/2"	),
new Achievement("Underdogs"						,"Acquire 25 Hockey Team"			,"Hockey Team Speed x2"			,"owned[6]"		,25 	,"timeMultiplier[6]"	,"/2"	),
new Achievement("Division Champs"				,"Acquire 50 Hockey Team"			,"Hockey Team Speed x2"			,"owned[6]"		,50 	,"timeMultiplier[6]"	,"/2"	),
new Achievement("All Stars"						,"Acquire 100 Hockey Team"			,"Hockey Team Speed x2"			,"owned[6]"		,100 	,"timeMultiplier[6]"	,"/2"	),
new Achievement("Hall of Fame"					,"Acquire 200 Hockey Team"			,"Hockey Team Speed x2"			,"owned[6]"		,200 	,"timeMultiplier[6]"	,"/2"	),
new Achievement("The Great Ones"				,"Acquire 300 Hockey Team"			,"Hockey Team Speed x2"			,"owned[6]"		,300 	,"timeMultiplier[6]"	,"/2"	),
new Achievement("Dream Team"					,"Acquire 400 Hockey Team"			,"Hockey Team Speed x2"			,"owned[6]"		,400 	,"timeMultiplier[6]"	,"/2"	),
new Achievement("Perfect Puck"					,"Acquire 500 Hockey Team"			,"Hockey Team Speed x2"			,"owned[6]"		,500 	,"timeMultiplier[6]"	,"/2"	),
new Achievement("Lights!"						,"Acquire 25 Movie Studio"			,"Movie Studio Speed x2"		,"owned[7]"		,25 	,"timeMultiplier[7]"	,"/2"	),
new Achievement("Camera!"						,"Acquire 50 Movie Studio"			,"Movie Studio Speed x2"		,"owned[7]"		,50 	,"timeMultiplier[7]"	,"/2"	),
new Achievement("Action!"						,"Acquire 100 Movie Studio"			,"Movie Studio Speed x2"		,"owned[7]"		,100 	,"timeMultiplier[7]"	,"/2"	),
new Achievement("Blockbuster!"					,"Acquire 200 Movie Studio"			,"Movie Studio Speed x2"		,"owned[7]"		,200 	,"timeMultiplier[7]"	,"/2"	),
new Achievement("Statuette Sweeper!"			,"Acquire 300 Movie Studio"			,"Movie Studio Speed x2"		,"owned[7]"		,300 	,"timeMultiplier[7]"	,"/2"	),
new Achievement("Library Of Congress"			,"Acquire 400 Movie Studio"			,"Movie Studio Speed x2"		,"owned[7]"		,400 	,"timeMultiplier[7]"	,"/2"	),
new Achievement("Cultural Masterpiece"			,"Acquire 500 Movie Studio"			,"Movie Studio Speed x2"		,"owned[7]"		,500 	,"timeMultiplier[7]"	,"/2"	),
new Achievement("A Capital Idea"				,"Acquire 25 Bank"					,"Bank Speed x2"				,"owned[8]"		,25 	,"timeMultiplier[8]"	,"/2"	),
new Achievement("Not-So-Petty Cash"				,"Acquire 50 Bank"					,"Bank Speed x2"				,"owned[8]"		,50 	,"timeMultiplier[8]"	,"/2"	),
new Achievement("Too Big To Fail"				,"Acquire 100 Bank"					,"Bank Speed x2"				,"owned[8]"		,100 	,"timeMultiplier[8]"	,"/2"	),
new Achievement("Galactic Reserve"				,"Acquire 200 Bank"					,"Bank Speed x2"				,"owned[8]"		,200 	,"timeMultiplier[8]"	,"/2"	),
new Achievement("All The Moneys"				,"Acquire 300 Bank"					,"Bank Speed x2"				,"owned[8]"		,300 	,"timeMultiplier[8]"	,"/2"	),
new Achievement("Bourgeois Banks"				,"Acquire 400 Bank"					,"Bank Speed x2"				,"owned[8]"		,400 	,"timeMultiplier[8]"	,"/2"	),
new Achievement("It Prints Money!"				,"Acquire 500 Bank"					,"Bank Speed x2"				,"owned[8]"		,500 	,"timeMultiplier[8]"	,"/2"	),
new Achievement("Slick Enterprise"				,"Acquire 25 Oil Company"			,"Oil Company Speed x2"			,"owned[9]"		,25 	,"timeMultiplier[9]"	,"/2"	),
new Achievement("Black Gold"					,"Acquire 50 Oil Company"			,"Oil Company Speed x2"			,"owned[9]"		,50 	,"timeMultiplier[9]"	,"/2"	),
new Achievement("There Will Be Oil"				,"Acquire 100 Oil Company"			,"Oil Company Speed x2"			,"owned[9]"		,100 	,"timeMultiplier[9]"	,"/2"	),
new Achievement("Crude Empire"					,"Acquire 200 Oil Company"			,"Oil Company Speed x2"			,"owned[9]"		,200 	,"timeMultiplier[9]"	,"/2"	),
new Achievement("Oil Nebula"					,"Acquire 300 Oil Company"			,"Oil Company Speed x2"			,"owned[9]"		,300 	,"timeMultiplier[9]"	,"/2"	),
new Achievement("Carbon Universe"				,"Acquire 400 Oil Company"			,"Oil Company Speed x2"			,"owned[9]"		,400 	,"timeMultiplier[9]"	,"/2"	),
new Achievement("Planke Petrol"					,"Acquire 500 Oil Company"			,"Oil Company Speed x2"			,"owned[9]"		,500 	,"timeMultiplier[9]"	,"/2"	),
new Achievement("Mogul"							,"Acquire 25 of Everything"			,"All Investments Speed x2"		,"minOwned"		,25 	,"totalTimeMultiplier"	,"/2"	),
new Achievement("Oligarch"						,"Acquire 50 of Everything"			,"All Investments Speed x2"		,"minOwned"		,50 	,"totalTimeMultiplier"	,"/2"	),
new Achievement("Tycoon"						,"Acquire 100 of Everything"		,"All Investments Speed x2"		,"minOwned"		,100 	,"totalTimeMultiplier"	,"/2"	),
new Achievement("Adam Smith Award"				,"Acquire 200 of Everything"		,"All Investments Speed x2"		,"minOwned"		,200 	,"totalTimeMultiplier"	,"/2"	),
new Achievement("Universal Capitalist"			,"Acquire 300 of Everything"		,"All Investments Speed x2"		,"minOwned"		,300 	,"totalTimeMultiplier"	,"/2"	),
new Achievement("Theoretical Economist"			,"Acquire 400 of Everything"		,"All Investments Speed x2"		,"minOwned"		,400 	,"totalTimeMultiplier"	,"/2"	),
new Achievement("The One True Investor"			,"Acquire 500 of Everything"		,"All Investments Speed x2"		,"minOwned"		,500 	,"totalTimeMultiplier"	,"/2"	) ];

var speeds = [1, 3, 10, 100, 1000];
var buyAmounts = [1, 10, 100, -1];

var fps = 60; 
var interval = (1000 / fps); 
var save = 0;
var menuIndex = 0;

var init = false; // if initialization is complete
var allVars = ["money","earned","totalEarned","angels","angelRate","totalIncMultiplier","totalTimeMultiplier","minOwned","owned","incMultiplier","timeMultiplier","progress","upgradesOwned","managersOwned","achievementsOwned","before","speed","buyAmount"];
var salt = "CapKey"; 

// helper functions to store and load information
function getItem(key) {
	return JSON.parse(localStorage.getItem(key));
}

function setItem(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

// stolen from stackoverflow (http://stackoverflow.com/a/10899795)
function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

// make numbers look pretty
function fix(x, n) {
	if (x >= 1e9) {
		var z = Math.floor(logFloor(x)/3);
		var prefixes = ["Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion","Undecillion","Duodecillion","Tredecillion"];
		var s = fix(x/Math.pow(10,3*z),n);
		return s+" "+prefixes[z-3];	
	}
	return numberWithCommas(x.toFixed(n));
}

function logFloor(x) {
	var count = 0;
	while (x >= 10) {
		count++;
		x /= 10;
	}
	return count;
}

// returns random integer between 0 and n-1
function random(n) {
	return Math.floor(n*Math.random());
}

function initVariables() {
	money = 0;
	earned = 0;
	totalEarned = 0;
	angels = 0;
	angelRate = 2;

	totalIncMultiplier = 1;
	totalTimeMultiplier = 1;
	minOwned = 0;

	owned = [];
	for (var i = 0; i < buildings.length; i++)
		owned.push(0);
	owned[0] = 1; // free building to start with

	incMultiplier = [];
	for (var i = 0; i < buildings.length; i++)
		incMultiplier.push(1);

	timeMultiplier = [];
	for (var i = 0; i < buildings.length; i++)
		timeMultiplier.push(1);

	progress = [];
	for (var i = 0; i < buildings.length; i++)
		progress.push(0);

	upgradesOwned = [];
	for (var i = 0; i < upgrades.length; i++)
		upgradesOwned.push(false);

	managersOwned = [];
	for (var i = 0; i < managers.length; i++)
		managersOwned.push(false);

	achievementsOwned = [];
	for (var i = 0; i < achievements.length; i++)
		achievementsOwned.push(false);

	before = new Date().getTime();
	speed = 0;
	buyAmount = 0;
}


window.onload = function() {
	// initialize variables for new game
	initVariables();

	// retrieve all the saved info if there is a savefile
	for (var i = 0; i < allVars.length; i++) 
		if (getItem(allVars[i]+salt) != null && getItem(allVars[i]+salt) != undefined) 
			window[allVars[i]] = getItem(allVars[i]+salt);

	// initialize upgrades
	for (var i = 0; i < upgrades.length; i++) {
		var u = upgrades[i];
		$("#upgradeName"+(i+1)).html(u.name);
		$("#upgradeText"+(i+1)).html(u.text);
		$("#upgradePrice"+(i+1)).html("$"+fix(u.price,0));
	}

	for (var i = 0; i < upgrades.length; i++)
		if (upgradesOwned[i])
			$("#upgradeBought"+(i+1)).css("display","initial");
		else
			$("#upgradeBought"+(i+1)).css("display","none");


	// initialize managers
	for (var i = 0; i < managers.length; i++) {
		var m = managers[i];
		$("#managerName"+(i+1)).html(m.name);
		$("#managerText"+(i+1)).html(m.text);
		$("#managerPrice"+(i+1)).html("$"+fix(m.price,0));
	}

	for (var i = 0; i < managers.length; i++)
		if (managersOwned[i])
			$("#managerBought"+(i+1)).css("display","initial");
		else
			$("#managerBought"+(i+1)).css("display","none");


	// initialize achievements
	for (var i = 1; i <= achievements.length; i++) {
		if (i % 4 == 1) // buffers on side
			$("#display2").append( $("<div class='box hidden'></div>") );
		var a = achievements[i-1];
		var show = "<div class='show'><div class='achieveText1'>" + a.name + "</div><div class='achieveText2'>" + a.text1 + "</div><div class='achieveText3'>" + a.text2 + "</div></div>"
		$("#display2").append( $("<div class='box'><div id='achievement" + i + "' class='inside'></div>" + show + "</div>") );
		if (i % 4 == 0) // buffers on side
			$("#display2").append( $("<div class='box2 hidden'></div>") ); // class box2 just for firefox
	}

	// initialize speeds
	for (var i = 0; i < speeds.length; i++)
		$("#speedText"+(i+1)).html("x"+speeds[i]);
	changeSpeed(speed+1);

	// initialize buy amounts
	for (var i = 0; i < buyAmounts.length; i++)
		$("#buyText"+(i+1)).html(buyAmounts[i]>0?("x"+buyAmounts[i]):"MAX");
	changeBuy(buyAmount+1);

	updateBuildings();

	// initialization complete
	init = true;
}

// get cost of building, 0-indexed
function getPrice(index) {
	var b = buildings[index];
	var mul = Math.pow(b.inflation,owned[index]-(index==0?1:0));
	return b.price*mul;
}

// get inc of building, 0-indexed
function getInc(index) {
	return buildings[index].inc * incMultiplier[index] * totalIncMultiplier * (1+angels*angelRate/100);
}

// get time of building, 0-indexed
function getTime(index) {
	return buildings[index].time * timeMultiplier[index] * totalTimeMultiplier;
}

// set name, owned, price, and inc of buildings; allow buildings to be used
function updateBuildings() {
	for (var i = 1; i <= buildings.length; i++) {
		$(".name"+i).html(buildings[i-1].name);
		$("#owned"+i).html(owned[i-1]);
		$("#cost"+i).html("$"+fix(getPrice(i-1),2));
		$(".inc"+i).html("$"+fix(owned[i-1]*getInc(i-1),2));
		if (owned[i-1] == 0)
			$("#block"+i).css("display","initial"); // can't click if no buildings owned
		else
			$("#block"+i).css("display","none");

		if (progress[i-1] == 0 && !managersOwned[i-1])
			$("#clickme"+i).css("display","initial"); // no more need for manual clicking
		else
			$("#clickme"+i).css("display","none"); // no more need for manual clicking

	}

	minOwned = owned[0];
	for (var i = 1; i < owned.length; i++)
		minOwned = Math.min(minOwned, owned[i]);

	updateAchievements();
}

function updateAchievements() {
	for (var i = 0; i < achievements.length; i++)
		if (!achievementsOwned[i] && achievements[i].isComplete()) {
			achievements[i].achieve();
			achievementsOwned[i] = true;
		}
	for (var i = 0; i < achievements.length; i++)
		if (achievementsOwned[i])
			$("#achievement"+(i+1)).css("background-color","yellow")
		else
			$("#achievement"+(i+1)).css("background-color","black")
}

// begin the progress bar, 1-indexed
function clickme(index) {
	$("#clickme"+index).css("display","none");
	progress[index-1] = 0.01;
}

// buy the building, 1-indexed
function buyBuilding(index) {
	var amount = buyAmounts[buyAmount] // how many to buy, -1 for max
	if (amount > 0) 
		for (var i = 0; i < amount; i++)
			buyBuildingOnce(index);
	else 
		while (money >= getPrice(index-1))
			buyBuildingOnce(index);
	updateBuildings();
}

function buyBuildingOnce(index) {
	if (money < getPrice(index-1)) // cannot afford
		return;
	money -= getPrice(index-1)
	owned[index-1]++;
}

// buy the upgrade, 1-indexed
function buyUpgrade(index) {
	if (money < upgrades[index-1].price || upgradesOwned[index-1]) // cannot afford or owned
		return;
	money -= upgrades[index-1].price;
	upgradesOwned[index-1] = true;
	upgrades[index-1].upgrade();
	$("#upgradeBought"+index).css("display","initial");
	updateBuildings();
}

// buy the manager, 1-indexed
function buyManager(index) {
	if (money < managers[index-1].price || managersOwned[index-1]) // cannot afford or owned
		return;
	money -= managers[index-1].price;
	managersOwned[index-1] = true;
	$("#clickme"+index).css("display","none"); // no more need for manual clicking
	$("#managerBought"+index).css("display","initial");
}

function buyAllUpgrades() {
	for (var i = 1; i <= upgrades.length; i++)
		buyUpgrade(i);
}

function buyAllManagers() {
	for (var i = 1; i <= managers.length; i++)
		buyManager(i);
}

// gain amount of money, change earned as well
function gainMoney(amount) {
	money += amount;
	earned += amount;
	totalEarned += amount;
}

// number of angels based on all time total
function numAngels(amount) {
	return Math.floor(150*Math.sqrt(amount/1e15));
}

function update(times) {
	// if initialization is not complete
	if (!init)
		return;

	times *= speeds[speed];

	// update buildings
	for (var i = 0; i < buildings.length; i++) 
		if (owned[i] > 0 && (progress[i] > 0 || managersOwned[i])) {
			var b = buildings[i];
			var t = getTime(i);
			progress[i] += times/fps;
			if (managersOwned[i]) {
				gainMoney(Math.floor(progress[i]/t)*getInc(i)*owned[i]);
				progress[i] %= t;
				var width = progress[i]/t*100;
				if (t < 0.1*speeds[speed])
					width = 100; // always green at a certain point
				width = Math.max(width,1);
				$("#bar"+(i+1)).css("width",width+"%");
			}
			else
				if (progress[i] >= t) {
					gainMoney(getInc(i)*owned[i]);
					progress[i] = 0;
					$("#clickme"+(i+1)).css("display","initial");
				}
				else {
					var width = progress[i]/t*100;
					width = Math.max(width,1);
					$("#bar"+(i+1)).css("width",width+"%");
				}
		}

	// check if buildings are buyable
	for (var i = 0; i < buildings.length; i++)
		if (money >= getPrice(i))
			$("#button"+(i+1)).css("display","initial");
		else
			$("#button"+(i+1)).css("display","none");

	// check if upgrades are buyable
	for (var i = 0; i < upgrades.length; i++)
		if (!upgradesOwned[i] && money >= upgrades[i].price)
			$("#upgradeButton"+(i+1)).css("display","initial");
		else
			$("#upgradeButton"+(i+1)).css("display","none");


	// check if managers are buyable
	for (var i = 0; i < managers.length; i++)
		if (!managersOwned[i] && money >= managers[i].price)
			$("#managerButton"+(i+1)).css("display","initial");
		else
			$("#managerButton"+(i+1)).css("display","none");

	// display money and stuff
	$("#money").html("$"+fix(money,2));
	$("#earned").html("$" + fix(earned,2));
	$("#allTimeEarned").html("$" + fix(totalEarned,2));
	$("#angels").html(fix(angels,0));
	$("#angelsGain").html(fix(numAngels(totalEarned)-angels,0));

	// saving all your data like I'm the NSA
	save += times/fps;
	if (save > 1) { // every 1 second
		saveData();
		save = 0;
	}
}

// select an item from the menu
function menu(index) {
	if (index == menuIndex)
		index = 0;
	for (var i = 0; i <= 4; i++)
		$("#display"+i).css("display","none");
	$("#display"+index).css("display","initial");
	menuIndex = index;
}

function softReset() {
var conf = confirm("Are you sure you want to reset?\nYou will gain "+fix(numAngels(totalEarned)-angels,0)+" angel investors.");
	if (conf) {
		var temp1 = speed;
		var temp2 = buyAmount;
		var temp3 = totalEarned;
		var temp4 = numAngels(totalEarned);
		initVariables();
		speed = temp1;
		buyAmount = temp2;
		totalEarned = temp3;
		angels = temp4;
		// correctly display bars
		for (var i = 1; i <= buildings.length; i++) {
			$("#clickme"+i).css("display","initial");
			$("#bar"+i).css("width","0%");
		}
		// correctly display upgrades and managers
		for (var i = 1; i <= upgrades.length; i++)
			$("#upgradeBought"+i).css("display","none");
		for (var i = 1; i <= managers.length; i++)
			$("#managerBought"+i).css("display","none");

		changeSpeed(speed+1);
		changeBuy(buyAmount+1);
		updateBuildings();
		saveData();
	}
}

function hardReset() {
var conf = confirm("Destroy all progress and start from scratch?\nAll money and angel investors will be lost!");
	if (conf) {
		var temp1 = speed;
		var temp2 = buyAmount;
		initVariables();
		speed = temp1;
		buyAmount = temp2;
		for (var i = 1; i <= buildings.length; i++) {
			$("#clickme"+i).css("display","initial");
			$("#bar"+i).css("width","0%");
		}
		// correctly display bars
		for (var i = 1; i <= buildings.length; i++) {
			$("#clickme"+i).css("display","initial");
			$("#bar"+i).css("width","0%");
		}
		// correctly display upgrades and managers
		for (var i = 1; i <= upgrades.length; i++)
			$("#upgradeBought"+i).css("display","none");
		for (var i = 1; i <= managers.length; i++)
			$("#managerBought"+i).css("display","none");

		changeSpeed(speed+1);
		changeBuy(buyAmount+1);
		updateBuildings();
		saveData();
	}
}

function saveData() {
	for (var i = 0; i < allVars.length; i++)
		setItem(allVars[i]+salt,window[allVars[i]]);
}

function changeSpeed(index) {
	for (var i = 1; i <= 5; i++)
		$("#speed"+i).css("background-color","#CCCCCC");
	$("#speed"+index).css("background-color","#777777");
	speed = index-1;
}

function changeBuy(index) {
	for (var i = 1; i <= 4; i++)
		$("#buy"+i).css("background-color","#CCCCCC");
	$("#buy"+index).css("background-color","#777777");
	buyAmount = index-1;
}

// game loop
setInterval(function() {
    now = new Date().getTime();
    var elapsedTime = now - before;
    if(elapsedTime > interval)
        update(Math.floor(elapsedTime/interval)); // recover the motion lost while inactive
    else
        update(1);
    before = new Date().getTime(); 
}, interval);

// classes and methods down here

// buildings/investments
function Building(name, price, inc, inflation, time) {
	this.name = name;			// name of building
	this.price = price;			// initial price of building
	this.inc = inc;				// building production rate
	this.inflation = inflation;	// price increase rate
	this.time = time;			// time needed for building
}

// upgrades for increasing profit
function Upgrade(name, text, price, changeName, changeString) {
	this.name = name;					// name of upgrade
	this.text = text;					// display text
	this.price = price;					// price of upgrade
	this.changeName = changeName;		// name of changed variable
	this.changeString = changeString;	// how to change the variable
}

Upgrade.prototype.upgrade = function() {
	var index = this.changeName.indexOf("["); 
	if (index < 0) {
		var value = window[this.changeName];
		window[this.changeName] = eval(value + this.changeString);
	}
	else {
		var str = this.changeName.substring(0,index);
		var i = parseInt(this.changeName.substring(index+1,this.changeName.length-1));
		var value = window[str][i];
		window[str][i] = eval(value + this.changeString);
	}
}

// managers for automating buildings
function Manager(name, text, price) {
	this.name = name;		// name of manager
	this.text = text;		// display text
	this.price = price;		// price of manager
}

// achievements for decreasing building time
function Achievement(name, text1, text2, reqName, reqNum, changeName, changeString) {
	this.name = name;					// name of achievement
	this.text1 = text1;					// top text
	this.text2 = text2;					// bottom text
	this.reqName = reqName; 			// name of required variable
	this.reqNum = reqNum; 				// number of required variable
	this.changeName = changeName;		// name of changed variable
	this.changeString = changeString; 	// how to change the variable
}

Achievement.prototype.isComplete = function() {
	var value;
	var index = this.reqName.indexOf("["); // for array elements
	if (index < 0)
		value = window[this.reqName];
	else {
		var str = this.reqName.substring(0,index);
		var i = parseInt(this.reqName.substring(index+1,this.reqName.length-1));
		value = window[str][i];
	}
	return value >= this.reqNum;
}

Achievement.prototype.achieve = function() {
	var index = this.changeName.indexOf("["); 
	if (index < 0) {
		var value = window[this.changeName];
		window[this.changeName] = eval(value + this.changeString);
	}
	else {
		var str = this.changeName.substring(0,index);
		var i = parseInt(this.changeName.substring(index+1,this.changeName.length-1));
		var value = window[str][i];
		window[str][i] = eval(value + this.changeString);
	}
}
