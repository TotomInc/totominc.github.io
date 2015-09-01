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
bb.owned = [1, 0, 0, 0];
bb.progress = [0, 0, 0, 0];
bb.multiplier = [1, 1, 1, 1];
bb.timeMultiplier = [1, 1, 1, 1];
bb.list = [
	new bb.create("Lemonade Stand", 4, 			1, 		1.07, 2),
	new bb.create("Coffee-Shop",	70,			60,		1.10, 6),
	new bb.create("Palace",			720,		540,	1.09, 12),
	new bb.create("Seaside Resort",	6400,		4320,	1.08, 24)
];
bp.init = false;
bp.owned = [0, 0, 0, 0];
bp.progress = [0, 0, 0, 0];
bp.profitMultiplier = [1, 1, 1, 1];
bp.ressourceMultiplier = [1, 1, 1, 1];
bp.timeMultiplier = [1, 1, 1, 1];
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
		$("#bp-buy-" + (i+1)).attr('onclick', 'bp.buy(' + i + ');');
		$("#bp-name-" + (i+1)).html(a.name);
		$("#bp-time-" + (i+1)).html(a.time + " seconds");
		$("#bp-infos-" + (i+1)).html("Owned : " + bb.owned[i] + "<br>+" + fix(h.bb.getMoneyReward(i), 2) + " " + a.ressource + "<br>+" + fix(a.moneyReward, 2) + "$<br>Cost " + fix(a.price, 2) + "$");
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
		$("#bb-infos-" + (i+1)).html("Owned : " + bb.owned[i] + "<br>+" + fix(h.bb.getMoneyReward(i), 2) + "$<br>+" + fix(h.bb.getMps(i), 2) + "$/s<br>Cost " + fix(b, 2) + "$");
	};
};
bp.update = function() {
	for (var i = 0; i < bp.list.length; i++) {
		var a = bp.list[i];
		var b = h.bp.displayPrice(c.buy, i);
		$("#bp-infos-" + (i+1)).html("Owned : " + bp.owned[i] + "<br>+" + fix(h.bp.getMoneyReward(i), 2) + "$<br>+" + fix(h.bp.getMps(i), 2) + "$/s<br>+" + fix(h.bp.getRessourceReward(i), 2) + " " + a.ressource + "<br>Cost " + fix(b, 2) + "$");
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
bp.buy = function(i) {
	var a = h.bp.getPrice(i);
	var b = c.buy;
	if (b > 1) {
		for (var e = 0; e < b; e++)
			bp.buyOnce(i);
	}
	else
		bp.buyOnce(i);
	bp.update();
};
bp.buyOnce = function(i) {
	if (c.money < h.bp.getPrice(i))
		return;
	else {
		c.money -= h.bp.getPrice(i);
		bp.owned[i]++;
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
			var w = (bb.progress[i] / b) * 100;
			if (b < 0.15)
				w = 100;
			w = Math.max(w, 1);
			$("#bb-progress-" + (i+1)).css('width', w + '%');
			$("#bb-progress-" + (i+1)).html(Math.floor(w) + '%');
			$("#bb-time-" + (i+1)).html(beautify((h.bb.getTime(i) - bb.progress[i]), 1) + ' seconds');
		};
	};
};
bp.gain = function(times) {
	for (var i = 0; i < bp.list.length; i++) { // todo : gain ressource not only money
		var a = bp.list[i];
		if (bp.owned[i] > 0) {
			var b = h.bp.getTime(i);
			bp.progress[i] += (times / c.fps);
			h.gain(Math.floor(bp.progress[i] / b) * h.bp.getMoneyReward(i));
			if (bp.progress[i] >= b)
				window["c"][a.ressource] += h.bp.getRessourceReward(i);
			bp.progress[i] %= b;
			var w = (bp.progress[i] / b) * 100;
			if (b < 0.15)
				w = 100;
			w = Math.max(w, 1);
			$("#bp-progress-" + (i+1)).css('width', w + '%');
			$("#bp-progress-" + (i+1)).html(Math.floor(w) + '%');
			$("#bp-time-" + (i+1)).html(beautify((h.bp.getTime(i) - bp.progress[i]), 1) + ' seconds'); 
		};
	};
};