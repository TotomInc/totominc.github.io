var shootRewardUpgradesOwned;
var shootRewardUpgrades = [
    new Upgrade("Shoot reward x5",      12,         		function() { shoot[7] *= 5 }),
    new Upgrade("Shoot reward x4",      160,         		function() { shoot[7] *= 4 }),
    new Upgrade("Shoot reward x3",      820,        		function() { shoot[7] *= 3 }),
    new Upgrade("Shoot reward x2",      3200,       		function() { shoot[7] *= 2 }),
    new Upgrade("Shoot reward x2",      24000,      		function() { shoot[7] *= 2 }),
    new Upgrade("Shoot reward x2",		204000,				function() { shoot[7] *= 2 }),
    new Upgrade("Shoot reward x6.66",	13250000,			function() { shoot[7] *= 6.66 }),
    new Upgrade("Shoot reward x8.88",	385000000,			function() { shoot[7] *= 8.88 }),
    new Upgrade("Shoot reward x10",		2750000000, 		function() { shoot[7] *= 10 }),
    new Upgrade("Shoot reward x12",		500000000000,		function() { shoot[7] *= 12 }),
    new Upgrade("Shoot reward x14",		2500000000000,		function() { shoot[7] *= 14 }),
    new Upgrade("Shoot reward x16",		25000000000000,		function() { shoot[7] *= 16 }),
    new Upgrade("Shoot reward x18",		350000000000000,	function() { shoot[7] *= 18 }),
    new Upgrade("Shoot reward x20",		1000000000000000,	function() { shoot[7] *= 20 })
];
var shootTimeUpgradesOwned;
var shootTimeUpgrades = [
    new Upgrade("Shoot time /1.50",     90,         	function() { shoot[3] /= 1.5 }),
    new Upgrade("Shoot time /1.50",     630,        	function() { shoot[3] /= 1.5 }),
    new Upgrade("Shoot time /1.25",     5750,       	function() { shoot[3] /= 1.25 }),
    new Upgrade("Shoot time /1.25",     50000,      	function() { shoot[3] /= 1.25 }),
    new Upgrade("Shoot time /1.10",		375000,			function() { shoot[3] /= 1.10 }),
    new Upgrade("Shoot time /1.10",		1300000,		function() { shoot[3] /= 1.10 })
];
var ammoStockUpgradesOwned;
var ammoStockUpgrades = [
    new Upgrade("Ammo stock x2",        90,         	function() { shoot[2] *= 2 }),
    new Upgrade("Ammo stock x2",        2500,       	function() { shoot[2] *= 2 }),
    new Upgrade("Ammo stock x2",        55000,      	function() { shoot[2] *= 2 }),
    new Upgrade("Ammo stock x2",		7500000,		function() { shoot[2] *= 2 })
];
var reloadTimeUpgradesOwned;
var reloadTimeUpgrades = [
    new Upgrade("Reload time /1.50",    270,        	function() { shoot[4] /= 1.50 }),
    new Upgrade("Reload time /1.50",    2000,       	function() { shoot[4] /= 1.50 }),
    new Upgrade("Reload time /1.25",    17500,      	function() { shoot[4] /= 1.25 }),
    new Upgrade("Reload time /1.25",    125000,     	function() { shoot[4] /= 1.25 }),
    new Upgrade("Reload time /1.10",	10000000,		function() { shoot[4] /= 1.10 })
];
var weedPriceUpgradesOwned;
var weedPriceUpgrades = [
    new Upgrade("Weed price x2",        760,					function() { drugMultiplier[0] *= 2 }),
    new Upgrade("Weed price x2",        2400,					function() { drugMultiplier[0] *= 2 }),
    new Upgrade("Weed price x2",        14500,					function() { drugMultiplier[0] *= 2 }),
    new Upgrade("Weed price x2",        215000,					function() { drugMultiplier[0] *= 2 }),
    new Upgrade("Weed price x2",		3250000,				function() { drugMultiplier[0] *= 2 }),
    new Upgrade("Weed price x2",		75000000,				function() { drugMultiplier[0] *= 2 }),
    new Upgrade("Weed price x2",		50000000000,			function() { drugMultiplier[0] *= 2 }),
    new Upgrade("Weed price x3",		5000000000000,			function() { drugMultiplier[0] *= 3 }),
    new Upgrade("Weed price x3",		25000000000000,			function() { drugMultiplier[0] *= 3 }),
    new Upgrade("Weed price x2",		500000000000000,		function() { drugMultiplier[0] *= 2 }),
    new Upgrade("Weed price x2",		1000000000000000,		function() { drugMultiplier[0] *= 2 })
];
var methPriceUpgradesOwned;
var methPriceUpgrades = [
    new Upgrade("Meth price x2",        500000,					function() { drugMultiplier[1] *= 2 }),
    new Upgrade("Meth price x2",        750000,					function() { drugMultiplier[1] *= 2 }),
    new Upgrade("Meth price x2",        95000000,				function() { drugMultiplier[1] *= 2 }),
    new Upgrade("Meth price x2",        1000000000,				function() { drugMultiplier[1] *= 2 }),
    new Upgrade("Meth price x2",		99999000000,			function() { drugMultiplier[1] *= 2 }),
    new Upgrade("Meth price x2",		2500000000000,			function() { drugMultiplier[1] *= 2 }),
    new Upgrade("Meth price x2",		25000000000000,			function() { drugMultiplier[1] *= 2 }),
    new Upgrade("Meth price x3",		950000000000000,		function() { drugMultiplier[1] *= 3 }),
    new Upgrade("Meth price x3",		5000000000000000,		function() { drugMultiplier[1] *= 3 }),
    new Upgrade("Meth price x2",		50000000000000000,		function() { drugMultiplier[1] *= 2 }),
    new Upgrade("Meth price x2",		500000000000000000,		function() { drugMultiplier[1] *= 2 }),
];
var cocainePriceUpgradesOwned;
var cocainePriceUpgrades = [
    new Upgrade("Cocaine price x2",     500000000,				function() { drugMultiplier[2] *= 2 }),
    new Upgrade("Cocaine price x2",     10000000000,			function() { drugMultiplier[2] *= 2 }),
    new Upgrade("Cocaine price x2",     25000000000,     		function() { drugMultiplier[2] *= 2 }),
    new Upgrade("Cocaine price x2",     125000000000,    		function() { drugMultiplier[2] *= 2 }),
    new Upgrade("Cocaine price x2",		850000000000,			function() { drugMultiplier[2] *= 2 }),
    new Upgrade("Cocaine price x2",		7500000000000,			function() { drugMultiplier[2] *= 2 }),
    new Upgrade("Cocaine price x2",		50000000000000,			function() { drugMultiplier[2] *= 2 }),
    new Upgrade("Cocaine price x3",		1000000000000000,		function() { drugMultiplier[2] *= 3 }),
    new Upgrade("Cocaine price x3",		75000000000000000,		function() { drugMultiplier[2] *= 3 }),
    new Upgrade("Cocaine price x2",		500000000000000000,		function() { drugMultiplier[2] *= 2 }),
    new Upgrade("Cocaine price x2",		1000000000000000000,	function() { drugMultiplier[2] *= 2 })
];

function Upgrade(name, price, run) {
	this.name = name;
	this.price = price;
	this.run = run;
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
		$("#up-shoot-reward").append('<li id="up-shoot-reward-' + (i+1) + '" class="list-group-item cur-p"><b>' + s.name + ' :</b> cost $' + fix(s.price, "money") + '</li>');
		$("#up-shoot-reward-" + (i+1)).attr("onclick", "Upgrade.buy('shoot-reward', " + i + ");");
	};
	for (var i = 0; i < shootTimeUpgrades.length; i++) {
		var s = shootTimeUpgrades[i];
		shootTimeUpgradesOwned.push(false);
		$("#up-shoot-time").append('<li id="up-shoot-time-' + (i+1) + '" class="list-group-item cur-p"><b>' + s.name + ' :</b> cost $' + fix(s.price, "money") + '</li>');
		$("#up-shoot-time-" + (i+1)).attr("onclick", "Upgrade.buy('shoot-time', " + i + ");");
	};
	for (var i = 0; i < ammoStockUpgrades.length; i++) {
		var a = ammoStockUpgrades[i];
		ammoStockUpgradesOwned.push(false);
		$("#up-ammo-stock").append('<li id="up-ammo-stock-' + (i+1) + '" class="list-group-item cur-p"><b>' + a.name + ' :</b> cost $' + fix(a.price, "money") + '</li>');
		$("#up-ammo-stock-" + (i+1)).attr("onclick", "Upgrade.buy('ammo-stock', " + i + ");");
	};
	for (var i = 0; i < reloadTimeUpgrades.length; i++) {
		var r = reloadTimeUpgrades[i];
		reloadTimeUpgradesOwned.push(false);
		$("#up-reload-time").append('<li id="up-reload-time-' + (i+1) + '" class="list-group-item cur-p"><b>' + r.name + ' :</b> cost $' + fix(r.price, "money") + '</li>');
		$("#up-reload-time-" + (i+1)).attr("onclick", "Upgrade.buy('reload-time', " + i + ");");
	};
	for (var i = 0; i < weedPriceUpgrades.length; i++) {
		var w = weedPriceUpgrades[i];
		weedPriceUpgradesOwned.push(false);
		$("#up-weed-price").append('<li id="up-weed-price-' + (i+1) + '" class="list-group-item cur-p"><b>' + w.name + ' :</b> cost $' + fix(w.price, "money") + '</li>');
		$("#up-weed-price-" + (i+1)).attr("onclick", "Upgrade.buy('weed-price', " + i + ");");
	};
	for (var i = 0; i < methPriceUpgrades.length; i++) {
		var m = methPriceUpgrades[i];
		methPriceUpgradesOwned.push(false);
		$("#up-meth-price").append('<li id="up-meth-price-' + (i+1) + '" class="list-group-item cur-p"><b>' + m.name + ' :</b> cost $' + fix(m.price, "money") + '</li>');
		$("#up-meth-price-" + (i+1)).attr("onclick", "Upgrade.buy('meth-price', " + i + ");");
	};
	for (var i = 0; i < cocainePriceUpgrades.length; i++) {
		var c = cocainePriceUpgrades[i];
		cocainePriceUpgradesOwned.push(false);
		$("#up-cocaine-price").append('<li id="up-cocaine-price-' + (i+1) + '" class="list-group-item cur-p"><b>' + c.name + ' :</b> cost $' + fix(c.price, "money") + '</li>');
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