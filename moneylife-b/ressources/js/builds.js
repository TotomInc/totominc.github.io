var builds = {};
builds.business = bb = {};
builds.production = bp = {};

bb.create = function(name, price, moneyReward, inflation, time) {
	this.name = name;
	this.price = price;
	this.moneyReward = moneyReward;
	this.inflation = inflation;
	this.time = time;
};
bp.create = function(name, price, moneyReward, ressource, ressourceReward, inflation, time) {
	this.name = name;
	this.price = price;
	this.moneyReward = moneyReward;
	this.ressource = ressource;
	this.ressourceReward = ressourceReward;
	this.inflation = inflation;
	this.time = time;
};

bb.init = false;
bb.owned = [];
bb.progress = [];
bb.multiplier = [];
bb.timeMultiplier = [];
bb.list = [
	new bb.create("Lemonade Stand", 4, 			1, 		1.10, 2),
	new bb.create("Coffee-Shop",	70,			60,		1.10, 6),
	new bb.create("Palace",			720,		540,	1.10, 12),
	new bb.create("Seaside Resort",	6400,		4320,	1.10, 24)
];
bp.init = false;
bp.owned = [];
bp.progress = [];
bp.list = [
	new bp.create('Factory',		103680,		51840,		'parts',	1, 1.07, 48),
	new bp.create('Nuclearplant',	1244160,	622080,		'energy',	1, 1.07, 96),
	new bp.create('Farm',			14929920,	7464961,	'food',		1, 1.07, 192),
	new bp.create('Forge',			179159040,	89579521,	'iron',		1, 1.07, 576)
];

// init functions called during game init
bb.init = function() {
	for (var i = 0; i < bb.list.length; i++) {
		var a = bb.list[i];
		bb.owned.push(0);
		if (i == 0)
			bb.owned[i] = 1;
		bb.progress.push(0);
		bb.multiplier.push(1);
		bb.timeMultiplier.push(1);
		$("#bb-buy-" + (i+1)).attr('onclick', 'bb.buy(' + i + ');');
		$("#bb-name-" + (i+1)).html(a.name);
		$("#bb-time-" + (i+1)).html(a.time + " seconds");
		$("#bb-infos-" + (i+1)).html("Owned : " + bb.owned[i] + "<br>+" + fix(h.bb.getMoneyReward(i), 2) + "$<br>Cost " + fix(h.bb.getPrice(i), 2) + "$");
	};
	bb.init = true;
};
bp.init = function() {
	for (var i = 0; i < bp.list.length; i++) {
		var a = bp.list[i];
		bp.owned.push(0);
		bp.progress.push(0);
		$("#bp-name-" + (i+1)).html(a.name);
		$("#bp-time-" + (i+1)).html(a.time + " seconds");
		$("#bp-infos-" + (i+1)).html("Owned : " + bb.owned[i] + "<br>+" + fix(a.ressourceReward, 2) + " " + a.ressource + "<br>+" + fix(a.moneyReward, 2) + "$<br>Cost " + fix(a.price, 2) + "$");
		var b = window["c"][a.ressource];
		$("#bp-ressource-" + (i+1)).html(fix(b, 2) + " " + a.ressource);
	};
	bp.init = true;
};
// must be called when buying a build, an upgrade, etc.
bb.update = function() {
	for (var i = 0; i < bb.list.length; i++) {
		var a = bb.list[i];
		var b = h.bb.displayPrice(c.buy, i);
		$("#bb-time-" + (i+1)).html(a.time + " seconds");
		$("#bb-infos-" + (i+1)).html("Owned : " + bb.owned[i] + "<br>+" + fix(h.bb.getMoneyReward(i), 2) + "$<br>Cost " + fix(b, 2) + "$");
	};
};
// buying functions
bb.buy = function(i) {
	var a = h.bb.getPrice(i);
	var b = c.buy;

	if (b > 1) {
		for (var e = 0; e < b; e++)
			bb.buyOnce(i);
	}
	else
		bb.buyOnce(i);

	bb.update();
};
bb.buyOnce = function(i) {
	if (c.money < h.bb.getPrice(i))
		return;
	else {
		c.money -= h.bb.getPrice(i);
		bb.owned[i]++;
	};
};
// builds functions to gain money + ressources
bb.gain = function(times) {
	for (var i = 0; i < bb.list.length; i++) {
		var a = bb.list[i];
		if (bb.owned[i] > 0) {
			var b = h.bb.getTime(i);
			bb.progress[i] += (times / c.fps);
			h.gain(Math.floor(bb.progress[i] / b) * h.bb.getMoneyReward(i));
			bb.progress[i] %= b;
			var w = (bb.progress[i]/b) * 100;
			if (b < 0.15)
				w = 100;
			w = Math.max(w, 1);
			$("#bb-progress-" + (i+1)).css('width', w + '%');
			$("#bb-progress-" + (i+1)).html(Math.floor(w) + '%');
			$("#bb-time-" + (i+1)).html(beautify((h.bb.getTime(i) - bb.progress[i]), 1) + " seconds");
		};
	};
};