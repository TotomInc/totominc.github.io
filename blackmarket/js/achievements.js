var totalMoneyAchOwned;
var totalMoneyAch = [
	new Achievement("Millionaire", 					"Earn $1.000 million of total money",		1e6),
	new Achievement("Billionaire",					"Earn $1.000 billion of total money",		1e9),
	new Achievement("Trillionaire",					"Earn $1.000 trillion of total money",		1e12),
	new Achievement("Quadrillionaire",				"Earn $1.000 quadrillion of total money",	1e15),
	new Achievement("Quintillionaire",				"Earn $1.000 quintillion of total money",	1e18),
	new Achievement("Sextillionaire",				"Earn $1.000 sextillion of total money",	1e21),
	new Achievement("Septillionaire",				"Earn $1.000 septillion of total money",	1e24),
	new Achievement("Octillionaire",				"Earn $1.000 octillion of total money",		1e27),
	new Achievement("Nonillionaire (rly?)",			"Earn $1.000 nonillion of total money",		1e30),
	new Achievement("Decillionnaire (L33t hax0r)",	"Earn $1.000 decillion of total money",		1e33)
];
var experienceAchOwned;
var experienceAch = [
	new Achievement("Experienced I",	"Earn 25 experience",					25),
	new Achievement("Experienced II",	"Earn 100 experience",					100),
	new Achievement("Experienced III",	"Earn 1,000 experience",				1000),
	new Achievement("Experienced IV",	"Earn 25,000 experience",				25000),
	new Achievement("Experienced V",	"Earn 100,000 experience",				100000),
	new Achievement("Experienced VI",	"Earn 1.000 million experience",		1e6),
	new Achievement("Experienced VII",	"Earn 100.000 million experience",		1e8),
	new Achievement("Experienced VIII",	"Earn 1.000 billion experience",		1e9),
	new Achievement("Experienced IX",	"Earn 250.000 billion experience",		25e10),
	new Achievement("Experienced X",	"Earn 1.000 trillion experience",		1e12),
	new Achievement("Prestigious I",	"Earn 100.000 trillion experience",		1e14),
	new Achievement("Prestigious II",	"Earn 500.000 trillion experience",		5e14),
	new Achievement("Prestigious III",	"Earn 1.000 quadrillion experience",	1e15),
	new Achievement("Prestigious IV",	"Earn 5.000 quadrillion experience",	5e15),
	new Achievement("Prestigious V",	"Earn 50.000 quadrillion experience",	5e16)
];
var shootAchOwned;
var shootAch = [
	new Achievement("Shooter I",			"Shoot 1 time",					1),
	new Achievement("Shooter II",			"Shoot 25 times",				25),
	new Achievement("Shooter III",			"Shoot 100 times",				100),
	new Achievement("Shooter IV",			"Shoot 500 times",				500),
	new Achievement("Shooter V",			"Shoot 1,000 times",			1000),
	new Achievement("Shooter VI",			"Shoot 2,500 times",			2500),
	new Achievement("Shooter VII",			"Shoot 5,000 times",			5000),
	new Achievement("Shooter VIII",			"Shoot 10,000 times",			10000),
	new Achievement("Shooter IX",			"Shoot 50,000 times",			50000),
	new Achievement("Shooter X",			"Shoot 100,000 times",			100000),
	new Achievement("Shooter Elite I",		"Shoot 250,000 times",			250000),
	new Achievement("Shooter Elite II",		"Shoot 750,000 times",			750000),
	new Achievement("Shooter Elite III",	"Shoot 1.500 million times",	1500000),
	new Achievement("Shooter Elite IV",		"Shoot 5.000 million times",	5000000),
	new Achievement("Shooter Elite V",		"Shoot 10.000 million times",	10000000),
	new Achievement("Shooter Elite VI",		"Shoot 50.000 million times",	50000000),
	new Achievement("Shooter Elite VII",	"Shoot 250.000 million times",	250000000),
	new Achievement("Shooter Elite VIII",	"Shoot 1.000 billion times",	1000000000),
	new Achievement("Shooter Elite IX",		"Shoot 1.337 billion times",	1337000000),
	new Achievement("Shooter Elite X",		"Shoot 5.000 billion times",	5000000000)
];
var reloadAchOwned;
var reloadAch = [
	new Achievement("Reloader I",			"Reload 1 time",				1),
	new Achievement("Reloader II",			"Reload 10 times",				10),
	new Achievement("Reloader III",			"Reload 25 times",				25),
	new Achievement("Reloader IV",			"Reload 50 times",				50),
	new Achievement("Reloader V",			"Reload 100 times",				100),
	new Achievement("Reloader VI",			"Reload 250 times",				250),
	new Achievement("Reloader VII",			"Reload 500 times",				500),
	new Achievement("Reloader VIII",		"Reload 1,000 times",			1000),
	new Achievement("Reloader IX",			"Reload 2,500 times",			2500),
	new Achievement("Reloader X",			"Reload 10,000 times",			10000),
	new Achievement("Master Reloader I",	"Reload 25,000 times",			25000),
	new Achievement("Master Reloader II",	"Reload 50,000 times",			50000),
	new Achievement("Master Reloader III",	"Reload 100,000 times",			100000),
	new Achievement("Master Reloader IV",	"Reload 200,000 times",			200000),
	new Achievement("Master Reloader V",	"Reload 500,000 times",			500000),
	new Achievement("Master Reloader VI",	"Reload 750,000 times",			750000),
	new Achievement("Master Reloader VII",	"Reload 2.500 million times",	2500000),
	new Achievement("Master Reloader VIII",	"Reload 7.500 million times",	7500000),
	new Achievement("Master Reloader IX",	"Reload 15.000 million times",	15000000),
	new Achievement("Master Reloader X",	"Reload 25.000 million times",	25000000)
];

function Achievement(name, text, reqNum) {
    this.name = name;
    this.text = text;
    this.reqNum = reqNum;
};
Achievement.init = function() {
	totalMoneyAchOwned = [];
	for (var i = 0; i < totalMoneyAch.length; i++) {
		var t = totalMoneyAch[i];
		totalMoneyAchOwned.push(false);
		$("#ach-totalmoney").append('<li id="ach-totalmoney-' + (i+1) + '" class="list-group-item"><b>' + t.name + '</b> : ' + t.text);
	};
	experienceAchOwned = [];
	for (var i = 0; i < experienceAch.length; i++) {
		var e = experienceAch[i];
		experienceAchOwned.push(false);
		$("#ach-experience").append('<li id="ach-experience-' + (i+1) + '" class="list-group-item"><b>' + e.name + '</b> : ' + e.text);
	};
	shootAchOwned = [];
	for (var i = 0; i < shootAch.length; i++) {
		var s = shootAch[i];
		shootAchOwned.push(false);
		$("#ach-shoot").append('<li id="ach-shoot-' + (i+1) + '" class="list-group-item"><b>' + s.name + '</b> : ' + s.text);
	};
	reloadAchOwned = [];
	for (var i = 0; i < reloadAch.length; i++) {
		var r = reloadAch[i];
		reloadAchOwned.push(false);
		$("#ach-reload").append('<li id="ach-reload-' + (i+1) + '" class="list-group-item"><b>' + r.name + '</b> : ' + r.text);
	};
};
Achievement.check = function() {
	for (var i = 0; i < totalMoneyAch.length; i++) {
		var t = totalMoneyAch[i];
		if (money[1] >= t.reqNum) {
			totalMoneyAchOwned[i] = true;
			$("#ach-totalmoney-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
		};
	};
	for (var i = 0; i < experienceAch.length; i++) {
		var e = experienceAch[i];
		if (prestige[0] >= e.reqNum) {
			experienceAchOwned[i] = true;
			$("#ach-experience-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
		};
	};
	for (var i = 0; i < shootAch.length; i++) {
		var s = shootAch[i];
		if (shoot[5] >= s.reqNum) {
			shootAchOwned[i] = true;
			$("#ach-shoot-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
		};
	};
	for (var i = 0; i < reloadAch.length; i++) {
		var r =  reloadAch[i];
		if (shoot[6] >= r.reqNum) {
			reloadAchOwned[i] = true;
			$("#ach-reload-" + (i+1)).attr("class", "list-group-item up-list-group-owned");
		};
	};
};
Achievement.hide = function() {
	if (showAchOwnedCheckBox.checked == false) {
		for (var i = 0; i < totalMoneyAch.length; i++) {
			var t = totalMoneyAch[i];
			if (totalMoneyAchOwned[i] == true) {
				$("#ach-totalmoney-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < experienceAch.length; i++) {
			var e = experienceAch[i];
			if (experienceAchOwned[i] == true) {
				$("#ach-experience-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < shootAch.length; i++) {
			var s = shootAch[i];
			if (shootAchOwned[i] == true) {
				$("#ach-shoot-" + (i+1)).css("display", "none");
			};
		};
		for (var i = 0; i < reloadAch.length; i++) {
			var r =  reloadAch[i];
			if (reloadAchOwned[i] == true) {
				$("#ach-reload-" + (i+1)).css("display", "none");
			};
		};
	} else {
		for (var i = 0; i < totalMoneyAch.length; i++) {
			var t = totalMoneyAch[i];
			if (totalMoneyAchOwned[i] == true) {
				$("#ach-totalmoney-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < experienceAch.length; i++) {
			var e = experienceAch[i];
			if (experienceAchOwned[i] == true) {
				$("#ach-experience-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < shootAch.length; i++) {
			var s = shootAch[i];
			if (shootAchOwned[i] == true) {
				$("#ach-shoot-" + (i+1)).css("display", "block");
			};
		};
		for (var i = 0; i < reloadAch.length; i++) {
			var r =  reloadAch[i];
			if (reloadAchOwned[i] == true) {
				$("#ach-reload-" + (i+1)).css("display", "block");
			};
		};
	};
};