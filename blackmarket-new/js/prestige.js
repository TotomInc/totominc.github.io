var prestigeRanks = [
    new PrestigeRank("Bronze I",				0,  25,         2.00),
    new PrestigeRank("Bronze II",            	1,  100,        4.00),
    new PrestigeRank("Bronze III",           	2,  400,        6.00),
    new PrestigeRank("Bronze Master",         	3,  1000,       8.00),
    new PrestigeRank("Silver I",				4,  2500,       20.00),
    new PrestigeRank("Silver II",            	5,  10000,      30.00),
    new PrestigeRank("Silver III",           	6,  50000,      40.00),
    new PrestigeRank("Silver Master",         	7,  100000,     50.00),
    new PrestigeRank("Platinum I",				8,  500000,     100.00),
    new PrestigeRank("Platinum II",          	9,  1000000,    150.00),
    new PrestigeRank("Platinum III",         	10, 2000000,    200.00),
    new PrestigeRank("Platinum Master",			11, 5000000,    250.00),
    new PrestigeRank("Legendary Dealer I",		12, 10000000,   400.00),
    new PrestigeRank("Legendary Dealer II",  	13, 50000000,   500.00),
    new PrestigeRank("Legendary Dealer III",  	14, 100000000,  600.00),
    new PrestigeRank("Legendary Dealer Master",	15,	750000000,	700.00)
];
var prestigeUpgradesOwned;
var prestigeUpgrades = [
	new PrestigeUpgrade("All drugs prices x2",	10,			function() { drugMultiplier[0] *= 2; drugMultiplier[1] *= 2; drugMultiplier[2] *= 2; }),
	new PrestigeUpgrade("All drugs prices x2",	500,		function() { drugMultiplier[0] *= 2; drugMultiplier[1] *= 2; drugMultiplier[2] *= 2; }),
	new PrestigeUpgrade("All drugs prices x5",	10000,		function() { drugMultiplier[0] *= 5; drugMultiplier[1] *= 5; drugMultiplier[2] *= 5; }),
	new PrestigeUpgrade("All drugs prices x5",	50000,		function() { drugMultiplier[0] *= 5; drugMultiplier[1] *= 5; drugMultiplier[2] *= 5; }),
	new PrestigeUpgrade("All drugs prices x5",	5000000,	function() { drugMultiplier[0] *= 5; drugMultiplier[1] *= 5; drugMultiplier[2] *= 5; })
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
		if (prestige[0] >= p.needed) {
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
		$("#td-exp-" + i).html(fix(p.needed) + " exp.");
		$("#td-multiplier-" + i).html("x" + fix(p.multiplier));
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
		$("#prestige-upgrades").append('<li id="prestige-upgrade-' + (i+1) + '" class="list-group-item cur-p"><b>' + p.name + '</b> : cost ' + fix(p.price) + ' experience');
		$("#prestige-upgrade-" + (i+1)).attr("onclick", "PrestigeUpgrade.buy(" + i + ");");
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
};
PrestigeUpgrade.buy = function(index) {
	if (prestige[0] >= prestigeUpgrades[index].price) {
		prestige[0] -= prestigeUpgrades[index].price;
		prestigeUpgradesOwned[index] = true;
		prestigeUpgrades[index].run();
		$("#prestige-upgrade-" + (index+1)).attr("onclick", "");
		$("#prestige-upgrade-" + (index+1)).attr("class", "list-group-item up-list-group-owned");
		$("#prestige-upgrade-" + (index+1)).append('<span class="badge">Owned</span>');
	};
};