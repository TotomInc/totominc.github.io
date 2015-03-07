var player = {
	stats: { hp: 100, maxHp: 100, hpPerSec: 2, xp: 0, xpNeeded: 100, level: 1, gold: 0, diamond: 0, totalArmor: 0 },
	helmet: { itemName: "Leather Helmet", armor: 10 },
	armour: { itemName: "Leather Armour", armor: 50 },
	gloves: { itemName: "Leather Gauntlets", armor: 5 },
	boots: { itemName: "Leather Boots", armor: 15 },
	amulet: { itemName: "none", armor: 0 },
	sword: { itemName: "Copper Sword", damage: 5 },
	item: { coal: 0, crystal: 0, jade: 0, ruby: 0, saphire: 0 }
};
var p = player; var ps = player.stats; var pi = player.item;

var adventures = [ // name, reqLevel, minMonsters, maxMonsters, maxHp, minHp, maxDmg, minDmg, maxGold, minGold, maxXp, minXp
	new Adventure("Plains", 				1, 	2, 	4, 	40, 	25,		5, 	3, 	20, 	10, 	20, 	10),
	new Adventure("The Cave", 				3, 	3, 	6, 	75, 	50, 	7, 	5, 	40, 	20, 	40,		20),
	new Adventure("Undiscovered Caves", 	7, 	5, 	7, 	125, 	100,	25,	15,	80,		40,		80, 	40),
	new Adventure("Dragon Cave",			13,	7,	10,	200,	150,	40,	30,	500,	350, 	500,	350),
	new Adventure("Haunted Village",		20,	7,	10,	300,	200,	55,	40,	2500,	2000,	2500,	2000),
	new Adventure("Mansion",				25,	5,	8,	750,	600,	65,	55,	7500,	6500,	7500,	6500)
];
var liveAdventure; var liveMonsters = []; var spawnFinished;

var miningBuilds = [
	new Mining("Coal Miner",	200,	'coal',		1),
	new Mining("Crystal Miner",	2500,	'crystal',	1),
	new Mining("Jade Miner",	10000,	'jade',		1),
	new Mining("Ruby Miner",	50000,	'ruby',		1),
	new Mining("Saphire Miner",	250000,	'saphire',	1)
];
var miningBuildsOwned = [0, 0, 0, 0, 0];

var fps = 60; var interval = (1000 / fps); var version = 0.002; var release = "r-1"; var init = false;

// player
function Player() { Log("This is needed to make the other Player.() functions to work."); };
Player.regainHp = function() {
	if (ps.hp < ps.maxHp && init == true) {
		var regain = getPlayerHpRegain();
		var tempHp = ps.hp + regain;
		var tempRegain = regain;
		if (tempHp > ps.maxHp) {
			tempRegain = ps.maxHp - ps.hp;
			ps.hp += tempRegain;
		} else {
			ps.hp += regain;
		};
	};
};

// adventures
function Adventure(name, reqLevel, minMonsters, maxMonsters, maxHp, minHp, maxDmg, minDmg, maxGold, minGold, maxXp, minXp) {
	this.name = name;
	this.reqLevel = reqLevel;
	this.minMonsters = minMonsters;
	this.maxMonsters = maxMonsters;
	this.maxHp = maxHp;
	this.minHp = minHp;
	this.maxDmg = maxDmg;
	this.minDmg = minDmg;
	this.maxGold = maxGold;
	this.minGold = minGold;
	this.maxXp = maxXp;
	this.minXp = minXp;
};
Adventure.start = function(index) {
	var a = adventures[index];
	if (ps.level >= a.reqLevel && typeof liveAdventure !== "string") {
		var toSpawn = Math.floor(Math.random() * (a.maxMonsters - a.minMonsters + 1)) + a.minMonsters;
		var maxHp = a.maxHp;
		var minHp = a.minHp;
		var maxDmg = a.maxDmg;
		var minDmg = a.minDmg;
		var maxGold = a.maxGold;
		var minGold = a.minGold;
		var maxXp = a.maxXp;
		var minXp = a.minXp;
		liveAdventure = a.name;
		Monster.invoke(toSpawn, maxHp, minHp, maxDmg, minDmg, maxGold, minGold, maxXp, minXp);
	};
};
Adventure.end = function() {
	var temp = liveMonsters.length;
	var temp2 = 0;
	for (var i = 0; i < liveMonsters.length; i++) {
		if (liveMonsters[i].hp <= 0) {
			temp2++;
		};
		if (temp2 == temp) {
			liveAdventure = undefined;
			$("#monster-" + liveMonsters[i].index).remove();
			liveMonsters = [];
		};
	};
};

// monsters
function Monster(name, displayName, hp, damage, gold, xp) {
	this.name = name;
	this.hp = hp;
	this.damage = damage;
	this.gold = gold;
	this.xp = xp;
};
Monster.invoke = function(toSpawn, maxHp, minHp, maxDmg, minDmg, maxGold, minGold, maxXp, minXp) {
	var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // up to 10 (1-indexed)
	spawnFinished = false;
	for (var i = 0; i < temp.length; i++) {
		if (i < toSpawn) {
			var rName = Math.floor(Math.random() * monstersNames.length);
			liveMonsters.push(new Monster);
			liveMonsters[i].index = i;
			liveMonsters[i].name = monstersNames[rName];
			liveMonsters[i].hp = getMonsterHp(maxHp, minHp);
			liveMonsters[i].maxHp = liveMonsters[i].hp;
			liveMonsters[i].damage = getMonsterDamage(maxDmg, minDmg);
			liveMonsters[i].gold = getMonsterGold(maxGold, minGold);
			liveMonsters[i].xp = getMonsterXp(maxXp, minXp);
		};
	};
	spawnFinished = true;
	Monster.createDivs();
};
Monster.createDivs = function() {
	if (spawnFinished == true) {
		for (var i = 0; i < liveMonsters.length; i++) {
			var lm = liveMonsters[i];
			var lmi = liveMonsters[i].index;
			$("#monsters-well").append('<div id="monster-' + lmi + '" class="monster-div"></div>');
			$("#monster-" + lmi).append('<div id="monster-row' + lmi + '" class="row"></div>');
			$("#monster-row" + lmi).append('<div id="monster-col' + lmi + '" class="col-md-5"></div>');
			$("#monster-row" + lmi).append('<div id="monster-medcol' + lmi + '" class="col-md-5"></div>');
			$("#monster-row" + lmi).append('<div id="monster-smcol' + lmi + '" class="col-md-2"></div>');
			// attack button (col-md-2)
			$("#monster-smcol" + lmi).append('<a class="btn btn-default btn-sm" onclick="Monster.attack(' + lmi + ');"">Attack!</a>');
			// health-bar with text (col-md-6)
			$("#monster-col" + lmi).append('<div id="monster-healthbar' + lmi + '" class="progress"></div>');
			$("#monster-healthbar" + lmi).append('<div id="monster-hb' + lmi + '" class="progress-bar progress-bar-danger" style="width: 100%"></div>')
			$("#monster-hb" + lmi).append('<span id="monster-hpdisplay' + lmi + '" class="monster-bar-hp">' + lm.hp + "/" + lm.maxHp + ' HP</span>');
			// monster info + img (col-md-4)
			$("#monster-medcol" + lmi).append('<img class="stats" src="img/E_Bones01.png"> ');
			$("#monster-medcol" + lmi).append('<span id="monster-info' + lmi + '"></span>');
			$("#monster-info" + lmi).html(lm.name + ", attack : " + lm.damage);
		};
	};
};
Monster.attack = function(index) {
	var playerDmg = getPlayerDamage();
	var monsterDmg = liveMonsters[index].damage;
	if (ps.hp > monsterDmg) {
		ps.hp -= monsterDmg;
		liveMonsters[index].hp -= playerDmg;
		if (liveMonsters[index].hp <= 0) {
			ps.gold += liveMonsters[index].gold;
			ps.xp += liveMonsters[index].xp;
			$("#monster-" + index).remove();
			Adventure.end(); // check if adventure is finished
		};
	};
};

// mining
function Mining(name, price, itemType, perSec) {
	this.name = name;
	this.price = price;
	this.itemType = itemType;
	this.perSec = perSec;
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
Mining.buy = function(index) { // TODO
	if (ps.gold >= getMiningBuildPrice(index)) {
		ps.gold -= getMiningBuildPrice(index);
		miningBuildsOwned[index]++;
		ps.xp += getMiningBuildPrice(index) / 50;
	};
};

// update
function Update() { Log("This is needed to make the other Update.() function to work."); };
Update.playerStats = function() {
	if (init == true) {
		$("#s-hp, #nav-hp").html("HP : " + beautify(ps.hp, 0) + "/" + beautify(ps.maxHp, 0) + ' <small class="small">+' + beautify(ps.hpPerSec, 0) + 'HP/s</small>');
		$("#s-xp, #nav-xp").html("XP : " + beautify(ps.xp, 0) + "/" + beautify(ps.xpNeeded, 0));
		$("#s-gold, #nav-gold").html("Gold : " + beautify(ps.gold, 0));
		$("#s-diamond, #nav-diamond").html("Diamond : " + beautify(ps.diamond, 0));
		$("#s-level").html("Level : " + beautify(ps.level, 0));
		$("#s-coal").html("Coal : " + beautify(pi.coal, 0));
		$("#s-crystal").html("Crystal : " + beautify(pi.crystal, 0));
		$("#s-jade").html("Jade : " + beautify(pi.jade, 0));
		$("#s-ruby").html("Ruby : " + beautify(pi.ruby, 0));
		$("#s-saphire").html("Saphire : " + beautify(pi.saphire, 0));

		$("#s-helmet").html("Helmet : <i>" + p.helmet.itemName + "</i><br>+" + p.helmet.armor + " armor");
		$("#s-armour").html("Armour : <i>" + p.armour.itemName + "</i><br>+" + p.armour.armor + " armor");
		$("#s-gloves").html("Gloves : <i>" + p.gloves.itemName + "</i><br>+" + p.gloves.armor + " armor");
		$("#s-boots").html("Boots : <i>" + p.boots.itemName + "</i><br>+" + p.boots.armor + " armor");
		$("#s-amulet").html("Amulet : <i>" + p.amulet.itemName + "</i><br>+" + p.amulet.armor + " armor");
		$("#s-sword").html("Sword : <i>" + p.sword.itemName + "</i><br>+" + p.sword.damage + " damage");
		$("#s-totalarmor").html("Total armor : " + getPlayerArmor() + "% reduction of monster damage");
	};
};
Update.monsters = function() {
	if (typeof liveAdventure == "string" && init == true) {
		for (var i = 0; i < liveMonsters.length; i++) {
			var lm = liveMonsters[i];
			var lmi = liveMonsters[i].index;
			var widthHp = 100;
			// updating progress-bar + text
			widthHp = (lm.hp / lm.maxHp) * 100;
			$("#monster-hb" + lmi).css("width", widthHp + "%");
			$("#monster-hpdisplay" + lmi).html(lm.hp + "/" + lm.maxHp + " HP");
		};
		$("#monsters-msg").css("display", "none");
	} else {
		$("#monsters-msg").css("display", "block");
	};
};
Update.mining = function() {
	for (var i = 0; i < miningBuilds.length; i++) {
		var m = miningBuilds[i];
		var o = miningBuildsOwned[i];
		$("#m-i" + (i+1)).html(m.name + " : " + beautify(getMiningBuildPrice(i), 2) + " gold - " + o + " owned");
		$("#m-b" + (i+1)).attr("onclick", 'Mining.buy(' + i + ');');
	};
};
Update.gameInit = function() {
	$("#s-version").html("Current game version : v" + version + release);
	for (var i = 0; i < adventures.length; i++) {
		var a = adventures[i];
		$("#a-n" + (i+1)).html(a.name + " - required level : " + a.reqLevel);
		$("#a-m" + (i+1)).html(a.minMonsters + " to " + a.maxMonsters + " monsters");
	};
	init = true;
};

function Log(text) {
	console.log("Inc-RPG v" + version + release + " : " + text);
};

// loading + loop
window.onload = function() {
	Update.gameInit();
	loadData();
};
var mainInterval = window.setInterval(function() {
	Update.playerStats();
	Update.monsters();
	Update.mining();
}, interval);
var regainHpInterval = window.setInterval(function() {
	Player.regainHp();
}, 1000);
var saveInterval = window.setInterval(function() {
	saveData();
}, 15000);
var buildsInterval = window.setInterval(function() {
	Mining.reward();
}, 10);
var helpersInterval = window.setInterval(function() {
	getXpNeeded();
	getLevelUp();
	getPlayerHp();
}, 100);