var success = {
	times: "<i class='fa fa-times'></i> ",
	checkk: "<i class='fa fa-check'></i> ",
	points: 0,
	gold: [
		new create("Treasurer I",	"Earn 100,000 gold",		5,	100000),
		new create("Treasurer II",	"Earn 1,000,000 gold",		5,	1000000),
		new create("Treasurer III",	"Earn 1b gold",				5,	1e9),
		new create("Treasurer IV",	"Earn 1t gold",				10,	1e12),
		new create("Treasurer V",	"Earn 1q gold",				10,	1e15),
		new create("Treasurer VI",	"Earn 1Q gold",				10,	1e18),
		new create("Treasurer VII",	"Earn 1s gold",				15,	1e21),
		new create("Treasurer VIV",	"Earn 1S gold",				15,	1e24),
		new create("Treasurer X",	"Earn 1o gold",				15,	1e27)
	],
	goldOwned: [],
	level: [
		new create("Levelupper I",		"Reach level 25",		5,	25),
		new create("Levelupper II",		"Reach level 50",		5,	50),
		new create("Levelupper III",	"Reach level 100",		10,	100),
		new create("Levelupper IV",		"Reach level 200",		10,	200),
		new create("Levelupper V",		"Reach level 300",		15,	300),
		new create("Levelupper VI",		"Reach level 400",		20,	400),
		new create("Levelupper VII",	"Reach level 500",		25,	500),
		new create("Levelupper VIV",	"Reach level 600",		30,	600)
	],
	levelOwned: [],
	prestige: [
		new create("Prestigious I",		"Prestige 1 time",		10,	2),
		new create("Prestigious II",	"Prestige 2 times",		20,	3),
		new create("Prestigious III",	"Prestige 4 times",		30,	5),
		new create("Prestigious IV",	"Prestige 6 times",		40,	7)
	],
	prestigeOwned: [],

	check: function() {
		for (var i = 0; i < this.gold.length; i++) {
			if (player.gold >= this.gold[i].req) {
				this.goldOwned[i] = true;
				$("#success-gold-" + (i+1)).attr('class', 'alert alert-success');
				$("#success-gold-p" + (i+1)).html(this.checkk + this.gold[i].name + " : " + this.gold[i].desc + "<br>+" + this.gold[i].points +" points");
			};
		};
		for (var i = 0; i < this.level.length; i++) {
			if (player.maxLevel >= this.level[i].req) {
				this.levelOwned[i] = true;
				$("#success-level-" + (i+1)).attr('class', 'alert alert-success');
				$("#success-level-p" + (i+1)).html(this.checkk + this.level[i].name + " : " + this.level[i].desc + "<br>+" + this.level[i].points +" points");
			};
		};
		for (var i = 0; i < this.prestige.length; i++) {
			if (player.prestigeTimes >= this.prestige[i].req) {
				this.prestigeOwned[i] = true;
				$("#success-prestige-" + (i+1)).attr('class', 'alert alert-success');
				$("#success-prestige-p" + (i+1)).html(this.checkk + this.prestige[i].name + " : " + this.prestige[i].desc + "<br>+" + this.prestige[i].points +" points")
			};
		};
	},
	hide: function() {
		var showGold = document.getElementById('success-show-gold');
		var showLevel = document.getElementById('success-show-level');
		var showPrestige = document.getElementById('success-show-prestige');

		if (showGold.checked == true)
			$("#success-gold").css('display', 'block');
		else
			$("#success-gold").css('display', 'none');

		if (showLevel.checked == true)
			$("#success-level").css('display', 'block');
		else
			$("#success-level").css('display', 'none');

		if (showPrestige.checked == true)
			$("#success-prestige").css('display', 'block');
		else
			$("#success-prestige").css('display', 'none');
	},
	init: function() {
		for (var i = 0; i < this.gold.length; i++) {
			$("#success-gold").append('<div id="success-gold-' + (i+1) + '" class="alert alert-info"><p id="success-gold-p' + (i+1) + '" class="text-center">' + this.times + this.gold[i].name + " : " + this.gold[i].desc + "<br>+" + this.gold[i].points + " points</p></div>");
			this.goldOwned.push(false);
		};
		for (var i = 0; i < this.level.length; i++) {
			$("#success-level").append('<div id="success-level-' + (i+1) + '" class="alert alert-info"><p id="success-level-p' + (i+1) + '" class="text-center">' + this.times + this.level[i].name + " : " + this.level[i].desc + "<br>+" + this.level[i].points + " points</p></div>");
			this.levelOwned.push(false);
		};
		for (var i = 0; i < this.prestige.length; i++) {
			$("#success-prestige").append('<div id="success-prestige-' + (i+1) + '" class="alert alert-info"><p id="success-prestige-p' + (i+1) + '" class="text-center">' + this.times + this.prestige[i].name + " : " + this.prestige[i].desc + "<br>+" + this.prestige[i].points + " points</p></div>");
			this.prestigeOwned.push(false);
		};
	}
}
// function to create success
function create(name, desc, points, req) {
	this.name = name;
	this.desc = desc;
	this.points = points;
	this.req = req;
};