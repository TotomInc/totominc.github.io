var success = sc = {};
var successfunctions = scf = {};

var not = "<i class='fa fa-times'></i> ";
var obtained = "<i class='fa fa-check'></i> ";

// function to create success
scf.create = function(name, desc, req) {
	this.name = name;
	this.desc = desc;
	this.req = req;
};
// init success variables owned and display success
scf.init = function() {
	for (var i = 0; i < sc.gold.length; i++) {
		$("#success-gold").append('<div id="success-gold-' + (i+1) + '" class="alert alert-info"><p id="success-gold-p' + (i+1) + '" class="text-center">' + not + sc.gold[i].name + " : " + sc.gold[i].desc + "</p></div>");
		sc.goldOwned.push(false);
	};
	for (var i = 0; i < sc.level.length; i++) {
		$("#success-level").append('<div id="success-level-' + (i+1) + '" class="alert alert-info"><p id="success-level-p' + (i+1) + '" class="text-center">' + not + sc.level[i].name + " : " + sc.level[i].desc + "</p></div>");
		sc.levelOwned.push(false);
	};
	for (var i = 0; i < sc.prestige.length; i++) {
		$("#success-prestige").append('<div id="success-prestige-' + (i+1) + '" class="alert alert-info"><p id="success-prestige-p' + (i+1) + '" class="text-center">' + not + sc.prestige[i].name + " : " + sc.prestige[i].desc + "</p></div>");
		sc.prestigeOwned.push(false);
	};
};
// function called on the coreloop to check success gained or not
scf.check = function() {
	for (var i = 0; i < sc.gold.length; i++) {
		if (p.maxGold >= sc.gold[i].req) {
			sc.goldOwned[i] = true;
			$("#success-gold-" + (i + 1)).attr('class', 'alert alert-success');
			$("#success-gold-p" + (i + 1)).html(obtained + sc.gold[i].name + " : " + sc.gold[i].desc);
		};
	};
	for (var i = 0; i < sc.level.length; i++) {
		if (p.maxLevel >= sc.level[i].req) {
			sc.levelOwned[i] = true;
			$("#success-level-" + (i + 1)).attr('class', 'alert alert-success');
			$("#success-level-p" + (i + 1)).html(obtained + sc.level[i].name + " : " + sc.level[i].desc);
		};
	};
	for (var i = 0; i < sc.prestige.length; i++) {
		if (p.prestigeTimes >= sc.prestige[i].req) {
			sc.prestigeOwned[i] = true;
			$("#success-prestige-" + (i + 1)).attr('class', 'alert alert-success');
			$("#success-prestige-p" + (i + 1)).html(obtained + sc.prestige[i].name + " : " + sc.prestige[i].desc);
		};
	};
};
// called to hide a certain type of success
scf.hide = function() {
	var a = document.getElementById('success-show-gold');
	var b = document.getElementById('success-show-level');
	var c = document.getElementById('success-show-prestige');

	if (a.checked == true)
		$("#success-gold").css('display', 'block');
	else
		$("#success-gold").css('display', 'none');

	if (b.checked == true)
		$("#success-level").css('display', 'block');
	else
		$("#success-level").css('display', 'none');

	if (c.checked == true)
		$("#success-prestige").css('display', 'block');
	else
		$("#success-prestige").css('display', 'none');
};

sc.goldOwned = [];
sc.gold = [
	new scf.create("Treasurer I",		"Earn 100,000 gold",	100000),
	new scf.create("Treasurer II",		"Earn 1,000,000 gold",	1000000),
	new scf.create("Treasurer III",		"Earn 1b gold",			1e9),
	new scf.create("Treasurer IV",		"Earn 1t gold",			1e12),
	new scf.create("Treasurer V",		"Earn 1q gold",			1e15),
	new scf.create("Treasurer VI",		"Earn 1Q gold",			1e18),
	new scf.create("Treasurer VII",		"Earn 1s gold",			1e21),
	new scf.create("Treasurer VIV",		"Earn 1S gold",			1e24),
	new scf.create("Treasurer X",		"Earn 1o gold",			1e27)
];
sc.levelOwned = [];
sc.level = [
	new scf.create("Levelupper I",		"Reach level 25",		25),
	new scf.create("Levelupper II",		"Reach level 50",		50),
	new scf.create("Levelupper III",	"Reach level 100",		100),
	new scf.create("Levelupper IV",		"Reach level 200",		200),
	new scf.create("Levelupper V",		"Reach level 300",		300),
	new scf.create("Levelupper VI",		"Reach level 400",		400),
	new scf.create("Levelupper VII",	"Reach level 500",		500),
	new scf.create("Levelupper VIV",	"Reach level 600",		600)
];
sc.prestigeOwned = [];
sc.prestige = [
	new scf.create("Prestigious I",		"Prestige 1 time",		2),
	new scf.create("Prestigious II",	"Prestige 2 times",		3),
	new scf.create("Prestigious III",	"Prestige 4 times",		5),
	new scf.create("Prestigious IV",	"Prestige 6 times",		7)
];