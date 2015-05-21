var miningBuilds = [
	new Mining("Coal Miner",	200,	'coal',		1, 	1),
	new Mining("Crystal Miner",	2500,	'crystal',	1,	5),
	new Mining("Jade Miner",	10000,	'jade',		1,	10),
	new Mining("Ruby Miner",	50000,	'ruby',		1,	20),
	new Mining("Saphire Miner",	250000,	'saphire',	1,	40),
];
var miningBuildsOwned = [];

// mining
function Mining(name, price, itemType, perSec, levelReq) {
	this.name = name;
	this.price = price;
	this.itemType = itemType;
	this.perSec = perSec;
	this.levelReq = levelReq;
};
Mining.reward = function() {
	for (var i = 0; i < miningBuilds.length; i++) {
		var m = miningBuilds[i];
		if (m.itemType == 'coal') {
			pi.coal += (getMiningBuildReward(i) / 100);
		};
		if (m.itemType == 'crystal') {
			pi.crystal += (getMiningBuildReward(i) / 100);
		};
		if (m.itemType == 'jade') {
			pi.jade += (getMiningBuildReward(i) / 100);
		};
		if (m.itemType == 'ruby') {
			pi.ruby += (getMiningBuildReward(i) / 100);
		};
		if (m.itemType == 'saphire') {
			pi.saphire += (getMiningBuildReward(i) / 100);
		};
	};
};
Mining.buy = function(index) {
	if (ps.gold >= getMiningBuildPrice(index) && ps.level >= miningBuilds[index].levelReq) {
		ps.gold -= getMiningBuildPrice(index);
		miningBuildsOwned[index]++;
	};
	Mining.check();
};
Mining.craft = function(item) {
	if (item == 'crystal' && pi.coal >= 10) {
		pi.crystal++;
		pi.coal -= 10;
	};
	if (item == 'jade' && pi.crystal >= 10) {
		pi.jade++;
		pi.crystal -= 10;
	};
	if (item == 'ruby' && pi.jade >= 10) {
		pi.ruby++;
		pi.jade -= 10;
	};
	if (item == 'saphire' && pi.ruby >= 10) {
		pi.saphire++;
		pi.ruby -= 10;
	};
};
Mining.init = function() {
	Log("Calling Mining.init()");
	for (var i = 0; i < miningBuilds.length; i++) {
		miningBuildsOwned.push(0);
	};
};
Mining.check = function() {
	Log("Calling Mining.check()");
	for (var i = 0; i < miningBuilds.length; i++) {
		var m = miningBuilds[i];
		var o = miningBuildsOwned[i];
		$("#m-n" + (i+1)).html(m.name);
		$("#m-p" + (i+1)).html(beautify(getMiningBuildPrice(i), 0) + " gold");
		$("#m-o" + (i+1)).html(o + " owned");
		$("#m-l" + (i+1)).html(m.levelReq);
		$("#m-b" + (i+1)).attr("onclick", 'Mining.buy(' + i + ');');
	};
};