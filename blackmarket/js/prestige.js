var prestigeRanks = [
    new PrestigeRank("Bronze I",				0,  25,         		2.22),
    new PrestigeRank("Bronze II",            	1,  100,        		4.44),
    new PrestigeRank("Bronze III",           	2,  400,        		6.66),
    new PrestigeRank("Bronze Master",         	3,  1000,       		8.88),
    new PrestigeRank("Silver I",				4,  2500,       		20.00),
    new PrestigeRank("Silver II",            	5,  10000,      		30.00),
    new PrestigeRank("Silver III",           	6,  25000,      		40.00),
    new PrestigeRank("Silver Master",         	7,  50000,     			50.00),
    new PrestigeRank("Platinum I",				8,  100000,     		75.00),
    new PrestigeRank("Platinum II",          	9,  250000,    			100.00),
    new PrestigeRank("Platinum III",         	10, 1000000,			125.00),
    new PrestigeRank("Platinum Master",			11, 5000000,			150.00),
    new PrestigeRank("Legendary Dealer I",		12, 17500000, 			200.00),
    new PrestigeRank("Legendary Dealer II",  	13, 50000000,   		300.00),
    new PrestigeRank("Legendary Dealer III",  	14, 100000000,  		400.00),
    new PrestigeRank("Legendary Dealer Master",	15,	250000000,			500.00),
    new PrestigeRank("Diamond Dealer I",		16,	500000000,			750.00),
    new PrestigeRank("Diamond Dealer II",		17,	1000000000,			1000.00),
    new PrestigeRank("Diamond Dealer III",		18,	2000000000,			1250.00),
    new PrestigeRank("Diamond Dealer Master",	19,	5000000000,			1500.00),
    new PrestigeRank("Hacker I",				20,	10000000000,		2000.00),
    new PrestigeRank("Hacker II",				21,	25000000000,		3000.00),
    new PrestigeRank("Hacker III",				22,	50000000000,		4000.00),
    new PrestigeRank("Hacker IV",				23,	100000000000,		5000.00),
    new PrestigeRank("Hacker V",				24,	250000000000,		6000.00)
];
var prestigeUpgradesOwned;
var prestigeUpgrades = [
	new PrestigeUpgrade("All drugs prices x2",	10,				function() { drugMultiplier[0] *= 2; drugMultiplier[1] *= 2; drugMultiplier[2] *= 2; }),
	new PrestigeUpgrade("All drugs prices x2",	500,			function() { drugMultiplier[0] *= 2; drugMultiplier[1] *= 2; drugMultiplier[2] *= 2; }),
	new PrestigeUpgrade("All drugs prices x2",	10000,			function() { drugMultiplier[0] *= 2; drugMultiplier[1] *= 2; drugMultiplier[2] *= 2; }),
	new PrestigeUpgrade("All drugs prices x2",	50000,			function() { drugMultiplier[0] *= 2; drugMultiplier[1] *= 2; drugMultiplier[2] *= 2; }),
	new PrestigeUpgrade("All drugs prices x2",	5000000,		function() { drugMultiplier[0] *= 2; drugMultiplier[1] *= 2; drugMultiplier[2] *= 2; }),
	new PrestigeUpgrade("All drugs prices x2",	75000000,		function() { drugMultiplier[0] *= 2; drugMultiplier[1] *= 2; drugMultiplier[2] *= 2; }),
	new PrestigeUpgrade("All drugs prices x3",	500000000,		function() { drugMultiplier[0] *= 3; drugMultiplier[1] *= 3; drugMultiplier[2] *= 3; }),
	new PrestigeUpgrade("All drugs prices x3",	15000000000,	function() { drugMultiplier[0] *= 3; drugMultiplier[1] *= 3; drugMultiplier[2] *= 3; })
];
var prestigeShootOwned;
var prestigeShoot = [
	new PrestigeUpgrade("Shoot earn 1% of $/sec",	250,		function() { shootPercent += 1; }),
	new PrestigeUpgrade("Shoot earn 1% of $/sec",	6666,		function() { shootPercent += 1; }),
	new PrestigeUpgrade("Shoot earn 1% of $/sec",	35000,		function() { shootPercent += 1; }),
	new PrestigeUpgrade("Shoot earn 1% of $/sec",	75000,		function() { shootPercent += 1; }),
	new PrestigeUpgrade("Shoot earn 1% of $/sec",	250000,		function() { shootPercent += 1; }),
	new PrestigeUpgrade("Shoot earn 2% of $/sec",	1000000,	function() { shootPercent += 2; }),
	new PrestigeUpgrade("Shoot earn 2% of $/sec",	75000000,	function() { shootPercent += 2; }),
	new PrestigeUpgrade("Shoot earn 2% of $/sec",	250000000,	function() { shootPercent += 2; }),
	new PrestigeUpgrade("Shoot earn 4% of $/sec",	1000000000,	function() { shootPercent += 4; })
];
var prestigeShootingOwned;
var prestigeShooting = [
	new PrestigeUpgrade("Enable auto-shooting",		100,	function() { prestigeShootingOwned = true; })
];
var prestigeReloadingOwned;
var prestigeReloading = [
	new PrestigeUpgrade("Enable auto-reloading",	100,	function() { prestigeReloadingOwned = true; })
];

function PrestigeRank(name, index, needed, multiplier) {
    this.name = name;
    this.index = index;
    this.needed = needed;
    this.multiplier = multiplier;
};
PrestigeRank.rankup = function() {
	for (var i = 0; i < prestigeRanks.length; i++) {
		var p = prestigeRanks[i];
		if (prestige[0] + experienceSpent >= p.needed) {
			prestige[3] = p.name;
			prestige[2] = p.multiplier;
		};
	};
};
PrestigeRank.fillTable = function() {
	for (var i = 0; i < prestigeRanks.length; i++) {
		var p = prestigeRanks[i];
		$("#prestige-table").append('<tr id="tr-' + i + '"></tr>');
		$("#tr-" + i).append('<td id="td-rank-' + i + '"></td>');
		$("#tr-" + i).append('<td id="td-exp-' + i + '"></td>');
		$("#tr-" + i).append('<td id="td-multiplier-' + i + '"></td>');
		$("#td-rank-" + i).html(p.name);
		$("#td-exp-" + i).html(fix(p.needed, "prestige") + " exp.");
		$("#td-multiplier-" + i).html("x" + fix(p.multiplier, "multiplier"));
		if (isOdd(i) == 1) {
			$("#tr-" + i).attr("class", "success");
		};
	};
	Log("Prestige-table filled!");
};
function PrestigeUpgrade(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};
PrestigeUpgrade.init = function() {
	Log("Calling PrestigeUpgrade.init()");
	prestigeUpgradesOwned = [];
	for (var i = 0; i < prestigeUpgrades.length; i++) {
		var p = prestigeUpgrades[i];
		prestigeUpgradesOwned.push(false);
		$("#prestige-upgrades").append('<li id="prestige-upgrade-' + (i+1) + '" class="list-group-item cur-p"><b>' + p.name + '</b> : cost ' + fix(p.price, "money") + ' experience');
		$("#prestige-upgrade-" + (i+1)).attr("onclick", "PrestigeUpgrade.buy('drugs', " + i + ");");
	};
	prestigeShootOwned = [];
	for (var i = 0; i < prestigeShoot.length; i++) {
		var p = prestigeShoot[i];
		prestigeShootOwned.push(false);
		$("#prestige-shoot").append('<li id="prestige-shoot-' + (i+1) + '" class="list-group-item cur-p"><b>' + p.name + '</b> : cost ' + fix(p.price, "money") + ' experience');
		$("#prestige-shoot-" + (i+1)).attr("onclick", "PrestigeUpgrade.buy('shoot', " + i + ");");
	};
	prestigeShootingOwned = false;
	for (var i = 0; i < prestigeShooting.length; i++) {
		var p = prestigeShooting[i];
		$("#prestige-shooting").append('<li id="prestige-shooting-' + (i+1) + '" class="list-group-item cur-p"><b>' + p.name + '</b> : cost ' + fix(p.price, "money") + ' experience');
		$("#prestige-shooting-" + (i+1)).attr("onclick", "PrestigeUpgrade.buy('autoshoot', " + i + ");");
	};
	prestigeReloadingOwned = false;
	for (var i = 0; i < prestigeReloading.length; i++) {
		var p = prestigeReloading[i];
		$("#prestige-reloading").append('<li id="prestige-reloading-' + (i+1) + '" class="list-group-item cur-p"><b>' + p.name + '</b> : cost ' + fix(p.price, "money") + ' experience');
		$("#prestige-reloading-" + (i+1)).attr("onclick", "PrestigeUpgrade.buy('autoreload', " + i + ");");
	};
};
PrestigeUpgrade.saveCheck = function() {
	Log("Calling PrestigeUpgrade.saveCheck()");
	for (var i = 0; i < prestigeUpgrades.length; i++) {
		var p = prestigeUpgrades[i];
		if (prestigeUpgradesOwned[i] == true) {
			$("#prestige-upgrade-" + (i+1)).attr("onclick", "");
			$("#prestige-upgrade-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#prestige-upgrade-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	for (var i = 0; i < prestigeShoot.length; i++) {
		var p = prestigeShoot[i];
		if (prestigeShootOwned[i] == true) {
			$("#prestige-shoot-" + (i+1)).attr("onclick", "");
			$("#prestige-shoot-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#prestige-shoot-" + (i+1)).append('<span class="badge">Owned</span>');
		};
	};
	for (var i = 0; i < prestigeShooting.length; i++) {
		var p = prestigeShooting[i];
		if (prestigeShootingOwned == true) {
			$("#prestige-shooting-" + (i+1)).attr("onclick", "");
			$("#prestige-shooting-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#prestige-shooting-" + (i+1)).append('<span class="badge">Owned</span>');
			$("#actions-auto-shoot").css("display", "block");
		} else {
			$("#actions-auto-shoot").css("display", "none");
		};
	};
	for (var i = 0; i < prestigeReloading.length; i++) {
		var p = prestigeReloading[i];
		if (prestigeReloadingOwned == true) {
			$("#prestige-reloading-" + (i+1)).attr("onclick", "");
			$("#prestige-reloading-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
			$("#prestige-reloading-" + (i+1)).append('<span class="badge">Owned</span>');
			$("#actions-auto-reload").css("display", "block");
		} else {
			$("#actions-auto-reload").css("display", "none");
		};
	};
};
PrestigeUpgrade.buy = function(type, index) {
	if (type == "drugs" && prestige[0] >= prestigeUpgrades[index].price) {
		prestige[0] -= prestigeUpgrades[index].price;
		prestigeUpgradesOwned[index] = true;
		experienceSpent += prestigeUpgrades[index].price;
		prestigeUpgrades[index].run();
		$("#prestige-upgrade-" + (index+1)).attr("onclick", "");
		$("#prestige-upgrade-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#prestige-upgrade-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	if (type == "shoot" && prestige[0] >= prestigeShoot[index].price) {
		prestige[0] -= prestigeShoot[index].price;
		prestigeShootOwned[index] = true;
		experienceSpent += prestigeShoot[index].price;
		prestigeShoot[index].run();
		$("#prestige-shoot-" + (index+1)).attr("onclick", "");
		$("#prestige-shoot-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#prestige-shoot-" + (index+1)).append('<span class="badge">Owned</span>');
	};
	if (type == "autoshoot" && prestige[0] >= prestigeShooting[index].price) {
		prestige[0] -= prestigeShooting[index].price;
		prestigeShootingOwned = true;
		experienceSpent += prestigeShooting[index].price;
		prestigeShooting[index].run();
		$("#prestige-shooting-" + (index+1)).attr("onclick", "");
		$("#prestige-shooting-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#prestige-shooting-" + (index+1)).append('<span class="badge">Owned</span>');
		$("#actions-auto-shoot").css("display", "block");
	};
	if (type == "autoreload" && prestige[0] >= prestigeReloading[index].price) {
		prestige[0] -= prestigeReloading[index].price;
		prestigeReloadingOwned = true;
		experienceSpent += prestigeReloading[index].price;
		prestigeReloading[index].run();
		$("#prestige-reloading-" + (index+1)).attr("onclick", "");
		$("#prestige-reloading-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#prestige-reloading-" + (index+1)).append('<span class="badge">Owned</span>');
		$("#actions-auto-reload").css("display", "block");
	};
};
PrestigeUpgrade.afterReset = function() {
	for (var i = 0; i < prestigeUpgrades.length; i++) {
		var p = prestigeUpgrades[i];
		if (prestigeUpgradesOwned[i] == true) {
			p.run();
		};
	};
	for (var i = 0; i < prestigeShoot.length; i++) {
		var p = prestigeShoot[i];
		if (prestigeShootOwned[i] == true) {
			p.run();
		};
	};

	if (prestigeShootingOwned == true) {
		prestigeShooting[0].run();
	};
	if (prestigeReloadingOwned == true) {
		prestigeReloading[0].run();
	};
};