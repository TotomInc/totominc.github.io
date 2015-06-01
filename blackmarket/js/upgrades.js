var shootRewardUpgradesOwned;
var shootRewardUpgrades = [
    new Upgrade("Paper Targets",                                10,         			    function() { shoot[7] *= 5 },   "shoot reward x5"),
    new Upgrade("Paper Targets II",                             100,         			    function() { shoot[7] *= 4 },   "shoot reward x4"),
    new Upgrade("Glow-in-the-Dark Paper Targets",               240,         			    function() { shoot[7] *= 2 },   "shoot reward x2"),
	new Upgrade("Indoor Range",                                 650,         			    function() { shoot[7] *= 1.5 }, "shoot reward x1.5"),
    new Upgrade("Indoor Range II",                              15000,        			    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Indoor Range Upgrade",                         32000,       			    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Moving Targets",                               240000,      			    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Moving Targets II",		                    2040000,					function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Faster Targets",	                            132500000,				    function() { shoot[7] *= 2.66 },"shoot reward x2.66"),
    new Upgrade("Personal Trainer",	                            3850000000,				    function() { shoot[7] *= 2.88 },"shoot reward x2.88"),
    new Upgrade("Camera Review System",		                    27500000000, 			    function() { shoot[7] *= 3 },   "shoot reward x3"),
    new Upgrade("Digital Impact System",		                5000000000000,			    function() { shoot[7] *= 3 },   "shoot reward x3"),
    new Upgrade("Indoor Range III",		                        25000000000000,			    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Indoor Range Armory",		                    250000000000000,			function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("200 Acre Outdoor Rifle Range",		            3500000000000000,		    function() { shoot[7] *= 1.5 }, "shoot reward x1.5"),
    new Upgrade("Rifle Range Tower",		                    10000000000000000,		    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Tower Laser Range Finder",		                150000000000000000,		    function() { shoot[7] *= 1.5 }, "shoot reward x1.5"),
    new Upgrade("Tower Digital Impact System",		            750000000000000000,		    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Indoor Range Bar",		                        1500000000000000000,	    function() { shoot[7] *= 3 },   "shoot reward x3"),
    new Upgrade("250 Acre Close-Quarter Marksman Range",		10000000000000000000,	    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Close-Quarter Range Instructor",		        12500000000000000000,	    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Close-Quarter Range Tower",		            25000000000000000000,	    function() { shoot[7] *= 2 },   "shoot reward x2"),
    new Upgrade("Sniper School",		                        50000000000000000000,	    function() { shoot[7] *= 3 },   "shoot reward x3"),
    new Upgrade("2,000 Acre Sniper Range",		                75000000000000000000,	    function() { shoot[7] *= 3 },   "shoot reward x3"),
    new Upgrade("Sniper Range Digital Overhaul",		        500000000000000000000,	    function() { shoot[7] *= 2 },   "shoot reward x2"),
	new Upgrade("25,000 Acre Range Expansion/Upgrade",          1000000000000000000000,     function() { shoot[7] *= 2 },   "shoot reward x2")
];

var shootTimeUpgradesOwned;
var shootTimeUpgrades = [
    new Upgrade("Weston Select Trigger",     		90,         				function() { shoot[3] /= 1.5 },     "shoot time /1.5"),
    new Upgrade("Trigger Assembly Upgrade",     	630,        				function() { shoot[3] /= 1.5 },     "shoot time /1.5"),
    new Upgrade("Selector Switch Upgrade",     		5750,       				function() { shoot[3] /= 1.25 },    "shoot time /1.25"),
    new Upgrade("Hammer Upgrade",     				50000,      				function() { shoot[3] /= 1.25 },    "shoot time /1.25"),
    new Upgrade("Automatic Selector",				375000,						function() { shoot[3] /= 1.10 },    "shoot time /1.10"),
    new Upgrade("BuzzFire Trigger Kit",				1000000000,					function() { shoot[3] /= 1.10 },    "shoot time /1.10"),
    new Upgrade("Internal Hammer",					1000000000000,				function() { shoot[3] /= 1.25 },    "shoot time /1.25"),
    new Upgrade("Competition Shooter Series Kit",	1000000000000000,			function() { shoot[3] /= 1.25 },    "shoot time /1.25"),
    new Upgrade("Fully Automatic Kit",				1000000000000000000,		function() { shoot[3] /= 1.25 },    "shoot time /1.25"),
    new Upgrade("Special Operations Kit",			1000000000000000000000,		function() { shoot[3] /= 1.25 },    "shoot time /1.25")
];

var ammoStockUpgradesOwned;
var ammoStockUpgrades = [
    new Upgrade("Ammunition Pouch",      		        100,         	    function() { shoot[2] *= 2 },    "ammo stock x2"),
    new Upgrade("Extra Magazine",      			        25000,       	    function() { shoot[2] *= 2 },    "ammo stock x2"),
    new Upgrade("LR Magazine Extension kit",	        150000,      	    function() { shoot[2] *= 2 },    "ammo stock x2"),
    new Upgrade("X250 Dual Sport Magazine",		        75000000,		    function() { shoot[2] *= 2 },    "ammo stock x2"),
	new Upgrade("Miles Gear Triple Slot Magazine",		500000000,		    function() { shoot[2] *= 2 },    "ammo stock x2")
];

var reloadTimeUpgradesOwned;
var reloadTimeUpgrades = [
    new Upgrade("Magazine Ejector",    					270,        	    function() { shoot[4] /= 1.50 },    "reload time /1.50"),
    new Upgrade("Magazine Ejector Upgrade",    			2000,       	    function() { shoot[4] /= 1.50 },    "reload time /1.50"),
    new Upgrade("Integrated Ejection Switch",   		17500,      	    function() { shoot[4] /= 1.25 },    "reload time /1.25"),
    new Upgrade("Automatic Ejection System",   			125000,     	    function() { shoot[4] /= 1.25 },    "reload time /1.25"),
    new Upgrade("Competitive Series Ejector",			10000000,		    function() { shoot[4] /= 1.10 },    "reload time /1.10"),
    new Upgrade("Wulframe Signature Series Ejector",	10000000000,	    function() { shoot[4] /= 1.25 },    "reload time /1.25"),
    new Upgrade("Gold Industries PlatinumX Ejector",	10000000000000,	    function() { shoot[4] /= 1.25 },    "reload time /1.25"),
	new Upgrade("Special Operations Ejection System",	100000000000000,	function() { shoot[4] /= 1.25 },    "reload time /1.25")
];

var weedPriceUpgradesOwned;
var weedPriceUpgrades = [
    new Upgrade("Field Expansion I",                        5000,					    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Field Expansion II",                       24000,					    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Field Expansion III",                      145000,					    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Harvesting Equipment",                     2150000,					function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Field Expansion",		                    32500000,				    function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("Worker Smoke Area",		                7500000000,				    function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("Harvesting Equipment II",		            5000000000000,			    function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("Worker Training",		                    500000000000000,			function() { drugMultiplier[0] *= 5 },    "weed price x5"),
    new Upgrade("Extra Workers",		                    2500000000000000,			function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("Field Expansion IV",		                5000000000000000,		    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Biologists",		                        10000000000000000,		    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Biologists II",		                    250000000000000000,		    function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("High-Tech Security System",		        1000000000000000000,		function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Research Institution",		                5000000000000000000,		function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Advanced Biology Laboratory",		        25000000000000000000,	    function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("Genetically Modified Weed I",		        75000000000000000000,	    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
	new Upgrade("Genetically Modified Weed II",             125000000000000000000,      function() { drugMultiplier[0] *= 2 },    "weed price x2"),
	new Upgrade("Genetically Modified Weed III",	        725000000000000000000,	    function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("Genetically Modified Weed IV",	            1750000000000000000000,	    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
	new Upgrade("Genetically Modified Weed V",              12500000000000000000000,    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Another weed price upgrade...",            150000000000000000000000,   function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("Another weed price upgrade...",            650000000000000000000000,   function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Another weed price upgrade...",            1250000000000000000000000,  function() { drugMultiplier[0] *= 3 },    "weed price x3"),
    new Upgrade("Antoher weed price upgrade...",            150000000000000000000000000,    function() { drugMultiplier[0] *= 2 },    "weed price x2"),
    new Upgrade("Another weed price upgrade...",            750000000000000000000000000,    function() { drugMultiplier[0] *= 3 },    "weed price x3")
];

var methPriceUpgradesOwned;
var methPriceUpgrades = [
    new Upgrade("Chemist",                          2500000,				    function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Storage Equipment",                10000000,				    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("Beakers",                          500000000,				    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("Beakers II",                       2500000000,				    function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Graduated Cylinders",		        99999000000,			    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("Safety Equipment",		            5000000000000,			    function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Chemist II",		                85000000000000,			    function() { drugMultiplier[1] *= 4 },    "meth price x4"),
    new Upgrade("Chemical Burner",		            950000000000000,		    function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Storage Flask",		            5000000000000000,		    function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Storage Flask II",		            50000000000000000,		    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("+20 Chemists",		                500000000000000000,		    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("Biologist",		                750000000000000000,		    function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Cessna Transport Aircraft",		2500000000000000000,	    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("+5 Biologists",		            12500000000000000000,	    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("Transport Mules",		            50000000000000000000,	    function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Brand New Equipment",		        321000000000000000000,	    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
	new Upgrade("Tubes, Lots of Tubes",		        750000000000000000000,	    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
	new Upgrade("High-Tech Lab",	                1500000000000000000000,	    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
	new Upgrade("Ivy League Chemists",	            5000000000000000000000,	    function() { drugMultiplier[1] *= 3 },    "meth price x3"),
	new Upgrade("Amezcua State-of-the-Art Lab",	    10000000000000000000000,	function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("Another meth price upgrade...",    150000000000000000000000,   function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Another meth price upgrade...",    750000000000000000000000,   function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("Another meth price upgrade...",    13500000000000000000000000,     function() { drugMultiplier[1] *= 3 },    "meth price x3"),
    new Upgrade("Another meth price upgrade...",    250000000000000000000000000,    function() { drugMultiplier[1] *= 2 },    "meth price x2"),
    new Upgrade("Another meth price upgrade...",    950000000000000000000000000,    function() { drugMultiplier[1] *= 3 },    "meth price x3")
];

var cocainePriceUpgradesOwned;
var cocainePriceUpgrades = [
    new Upgrade("Jungle Lab",                           30000000000,			    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Small Chemical Lab",                   250000000000,			    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Packaging Machine",                    750000000000,     		    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Chemical Press",                       1500000000000,    		    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Trash Can o'Mixing",                   5000000000000,			    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Gasoline Container",		            25000000000000,			    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Cocaine Base Filter",		            750000000000000,		    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Cocaine Drying Machine",		        3500000000000000,		    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Hydraulic Press",		                75000000000000000,		    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Microwave Oven",		                500000000000000000,		    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Industrial Refrigerator",		        1000000000000000000,	    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Kidnap more Workers",		            25000000000000000000,	    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Field Expansion I",		            50000000000000000000,	    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Field Expansion II",		            125000000000000000000,	    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Field Expansion III",		            654000000000000000000,	    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Field Expansion IV",		            1500000000000000000000,	    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
	new Upgrade("Kitchen Upgrade",		                2500000000000000000000,	    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Professional Underground Lab",		    5000000000000000000000,	    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Field Expansion V",		            12500000000000000000000,	function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Field Expansion VI",		            65400000000000000000000,	function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Professional Underground Lab II",		150000000000000000000000,	function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Another cocaine price upgrade...",     1000000000000000000000000,  function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Another cocaine price upgrade...",     25000000000000000000000000,     function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Another cocaine price upgrade...",     175000000000000000000000000,    function() { drugMultiplier[2] *= 3 },    "cocaine price x3"),
    new Upgrade("Another cocaine price upgrade...",     825000000000000000000000000,    function() { drugMultiplier[2] *= 2 },    "cocaine price x2"),
    new Upgrade("Another cocaine price upgrade...",     10000000000000000000000000000,  function() { drugMultiplier[2] *= 3 },    "cocaine price x3")
];

function Upgrade(name, price, run, desc) {
	this.name = name;
	this.price = price;
	this.run = run;
    this.desc = desc;
};
Upgrade.init = function() {
	Log("Calling Upgrade.init()");
	shootRewardUpgradesOwned = [];
	shootTimeUpgradesOwned = [];
	ammoStockUpgradesOwned = [];
	reloadTimeUpgradesOwned = [];
	weedPriceUpgradesOwned = [];
	methPriceUpgradesOwned = [];
	cocainePriceUpgradesOwned = [];

	for (var i = 0; i < shootRewardUpgrades.length; i++) {
		var s = shootRewardUpgrades[i];
		shootRewardUpgradesOwned.push(false);
		$("#up-shoot-reward").append('<li id="up-shoot-reward-' + (i+1) + '" class="list-group-item cur-p"><b>' + s.name + ' </b>: ' + s.desc + ' - <i>cost $' + fix(s.price, "money") + '</i></li>');
		$("#up-shoot-reward-" + (i+1)).attr("onclick", "Upgrade.buy('shoot-reward', " + i + ");");
	};
	for (var i = 0; i < shootTimeUpgrades.length; i++) {
		var s = shootTimeUpgrades[i];
		shootTimeUpgradesOwned.push(false);
		$("#up-shoot-time").append('<li id="up-shoot-time-' + (i+1) + '" class="list-group-item cur-p"><b>' + s.name + ' </b>: ' + s.desc + ' - <i>cost $' + fix(s.price, "money") + '</i></li>');
		$("#up-shoot-time-" + (i+1)).attr("onclick", "Upgrade.buy('shoot-time', " + i + ");");
	};
	for (var i = 0; i < ammoStockUpgrades.length; i++) {
		var a = ammoStockUpgrades[i];
		ammoStockUpgradesOwned.push(false);
		$("#up-ammo-stock").append('<li id="up-ammo-stock-' + (i+1) + '" class="list-group-item cur-p"><b>' + a.name + ' </b>: ' + a.desc + ' - <i>cost $' + fix(a.price, "money") + '</i></li>');
		$("#up-ammo-stock-" + (i+1)).attr("onclick", "Upgrade.buy('ammo-stock', " + i + ");");
	};
	for (var i = 0; i < reloadTimeUpgrades.length; i++) {
		var r = reloadTimeUpgrades[i];
		reloadTimeUpgradesOwned.push(false);
		$("#up-reload-time").append('<li id="up-reload-time-' + (i+1) + '" class="list-group-item cur-p"><b>' + r.name + ' </b>: ' + r.desc + ' - <i>cost $' + fix(r.price, "money") + '</i></li>');
		$("#up-reload-time-" + (i+1)).attr("onclick", "Upgrade.buy('reload-time', " + i + ");");
	};
	for (var i = 0; i < weedPriceUpgrades.length; i++) {
		var w = weedPriceUpgrades[i];
		weedPriceUpgradesOwned.push(false);
		$("#up-weed-price").append('<li id="up-weed-price-' + (i+1) + '" class="list-group-item cur-p"><b>' + w.name + ' </b>: ' + w.desc + ' - <i>cost $' + fix(w.price, "money") + '</i></li>');
		$("#up-weed-price-" + (i+1)).attr("onclick", "Upgrade.buy('weed-price', " + i + ");");
	};
	for (var i = 0; i < methPriceUpgrades.length; i++) {
		var m = methPriceUpgrades[i];
		methPriceUpgradesOwned.push(false);
		$("#up-meth-price").append('<li id="up-meth-price-' + (i+1) + '" class="list-group-item cur-p"><b>' + m.name + ' </b>: ' + m.desc + ' - <i>cost $' + fix(m.price, "money") + '</i></li>');
		$("#up-meth-price-" + (i+1)).attr("onclick", "Upgrade.buy('meth-price', " + i + ");");
	};
	for (var i = 0; i < cocainePriceUpgrades.length; i++) {
		var c = cocainePriceUpgrades[i];
		cocainePriceUpgradesOwned.push(false);
		$("#up-cocaine-price").append('<li id="up-cocaine-price-' + (i+1) + '" class="list-group-item cur-p"><b>' + c.name + ' </b>: ' + c.desc + ' - <i>cost $' + fix(c.price, "money") + '</i></li>');
		$("#up-cocaine-price-" + (i+1)).attr("onclick", "Upgrade.buy('cocaine-price', " + i + ");");
	};
};
Upgrade.saveCheck = function() {
	Log("Calling Upgrade.saveCheck()");
	for (var i = 0; i < shootRewardUpgrades.length; i++) {
		var s = shootRewardUpgrades[i];
		if (shootRewardUpgradesOwned[i] == true) {
			$("#up-shoot-reward-" + (i+1)).attr("onclick", "");
			$("#up-shoot-reward-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#up-shoot-reward-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	for (var i = 0; i < shootTimeUpgrades.length; i++) {
		var s = shootTimeUpgrades[i];
		if (shootTimeUpgradesOwned[i] == true) {
			$("#up-shoot-time-" + (i+1)).attr("onclick", "");
			$("#up-shoot-time-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#up-shoot-time-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	for (var i = 0; i < ammoStockUpgrades.length; i++) {
		var a = ammoStockUpgrades[i];
		if (ammoStockUpgradesOwned[i] == true) {
			$("#up-ammo-stock-" + (i+1)).attr("onclick", "");
			$("#up-ammo-stock-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#up-ammo-stock-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	for (var i = 0; i < reloadTimeUpgrades.length; i++) {
		var r = reloadTimeUpgrades[i];
		if (reloadTimeUpgradesOwned[i] == true) {
			$("#up-reload-time-" + (i+1)).attr("onclick", "");
			$("#up-reload-time-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#up-reload-time-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	for (var i = 0; i < weedPriceUpgrades.length; i++) {
		var w = weedPriceUpgrades[i];
		if (weedPriceUpgradesOwned[i] == true) {
			$("#up-weed-price-" + (i+1)).attr("onclick", "");
			$("#up-weed-price-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#up-weed-price-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	for (var i = 0; i < methPriceUpgrades.length; i++) {
		var m = methPriceUpgrades[i];
		if (methPriceUpgradesOwned[i] == true) {
			$("#up-meth-price-" + (i+1)).attr("onclick", "");
			$("#up-meth-price-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#up-meth-price-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	for (var i = 0; i < cocainePriceUpgrades.length; i++) {
		var c = cocainePriceUpgrades[i];
		if (cocainePriceUpgradesOwned[i] == true) {
			$("#up-cocaine-price-" + (i+1)).attr("onclick", "");
			$("#up-cocaine-price-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#up-cocaine-price-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	Upgrade.hide();
};
Upgrade.buy = function(type, index) {
	if (type == 'shoot-reward' && money[0] >= shootRewardUpgrades[index].price) {
		money[0] -= shootRewardUpgrades[index].price;
		shootRewardUpgradesOwned[index] = true;
		shootRewardUpgrades[index].run();
		$("#up-shoot-reward-" + (index+1)).attr("onclick", "");
		$("#up-shoot-reward-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#up-shoot-reward-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	if (type == 'shoot-time' && money[0] >= shootTimeUpgrades[index].price) {
		money[0] -= shootTimeUpgrades[index].price;
		shootTimeUpgradesOwned[index] = true;
		shootTimeUpgrades[index].run();
		$("#up-shoot-time-" + (index+1)).attr("onclick", "");
		$("#up-shoot-time-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#up-shoot-time-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	if (type == 'ammo-stock' && money[0] >= ammoStockUpgrades[index].price) {
		money[0] -= ammoStockUpgrades[index].price;
		ammoStockUpgradesOwned[index] = true;
		ammoStockUpgrades[index].run();
		$("#up-ammo-stock-" + (index+1)).attr("onclick", "");
		$("#up-ammo-stock-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#up-ammo-stock-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	if (type == 'reload-time' && money[0] >= reloadTimeUpgrades[index].price) {
		money[0] -= reloadTimeUpgrades[index].price;
		reloadTimeUpgradesOwned[index] = true;
		reloadTimeUpgrades[index].run();
		$("#up-reload-time-" + (index+1)).attr("onclick", "");
		$("#up-reload-time-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#up-reload-time-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	if (type == 'weed-price' && money[0] >= weedPriceUpgrades[index].price) {
		money[0] -= weedPriceUpgrades[index].price;
		weedPriceUpgradesOwned[index] = true;
		weedPriceUpgrades[index].run();
		$("#up-weed-price-" + (index+1)).attr("onclick", "");
		$("#up-weed-price-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#up-weed-price-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	if (type == 'meth-price' && money[0] >= methPriceUpgrades[index].price) {
		money[0] -= methPriceUpgrades[index].price;
		methPriceUpgradesOwned[index] = true;
		methPriceUpgrades[index].run();
		$("#up-meth-price-" + (index+1)).attr("onclick", "");
		$("#up-meth-price-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#up-meth-price-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	if (type == 'cocaine-price' && money[0] >= cocainePriceUpgrades[index].price) {
		money[0] -= cocainePriceUpgrades[index].price;
		cocainePriceUpgradesOwned[index] = true;
		cocainePriceUpgrades[index].run();
		$("#up-cocaine-price-" + (index+1)).attr("onclick", "");
		$("#up-cocaine-price-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#up-cocaine-price-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	Upgrade.hide();
};
Upgrade.hide = function() {
	if (showUpgradesOwnedCheckBox.checked == false) {
		for (var i = 0; i < shootRewardUpgrades.length; i++) {
			var s = shootRewardUpgrades[i];
			if (shootRewardUpgradesOwned[i] == true) {
				$("#up-shoot-reward-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < shootTimeUpgrades.length; i++) {
			var s = shootTimeUpgrades[i];
			if (shootTimeUpgradesOwned[i] == true) {
				$("#up-shoot-time-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < ammoStockUpgrades.length; i++) {
			var a = ammoStockUpgrades[i];
			if (ammoStockUpgradesOwned[i] == true) {
				$("#up-ammo-stock-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < reloadTimeUpgrades.length; i++) {
			var r = reloadTimeUpgrades[i];
			if (reloadTimeUpgradesOwned[i] == true) {
				$("#up-reload-time-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < weedPriceUpgrades.length; i++) {
			var w = weedPriceUpgrades[i];
			if (weedPriceUpgradesOwned[i] == true) {
				$("#up-weed-price-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < methPriceUpgrades.length; i++) {
			var m = methPriceUpgrades[i];
			if (methPriceUpgradesOwned[i] == true) {
				$("#up-meth-price-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < cocainePriceUpgrades.length; i++) {
			var c = cocainePriceUpgrades[i];
			if (cocainePriceUpgradesOwned[i] == true) {
				$("#up-cocaine-price-" + (i+1)).css("display", "none");
			};
		};
	} else {
		for (var i = 0; i < shootRewardUpgrades.length; i++) {
			var s = shootRewardUpgrades[i];
			if (shootRewardUpgradesOwned[i] == true) {
				$("#up-shoot-reward-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < shootTimeUpgrades.length; i++) {
			var s = shootTimeUpgrades[i];
			if (shootTimeUpgradesOwned[i] == true) {
				$("#up-shoot-time-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < ammoStockUpgrades.length; i++) {
			var a = ammoStockUpgrades[i];
			if (ammoStockUpgradesOwned[i] == true) {
				$("#up-ammo-stock-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < reloadTimeUpgrades.length; i++) {
			var r = reloadTimeUpgrades[i];
			if (reloadTimeUpgradesOwned[i] == true) {
				$("#up-reload-time-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < weedPriceUpgrades.length; i++) {
			var w = weedPriceUpgrades[i];
			if (weedPriceUpgradesOwned[i] == true) {
				$("#up-weed-price-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < methPriceUpgrades.length; i++) {
			var m = methPriceUpgrades[i];
			if (methPriceUpgradesOwned[i] == true) {
				$("#up-meth-price-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < cocainePriceUpgrades.length; i++) {
			var c = cocainePriceUpgrades[i];
			if (cocainePriceUpgradesOwned[i] == true) {
				$("#up-cocaine-price-" + (i+1)).css("display", "block");
			};
		};
	};
};