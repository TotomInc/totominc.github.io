var player = {
	stats: { hp: 100, maxHp: 100, hpPerSec: 1, xp: 0, xpNeeded: 100, level: 1, gold: 0, diamond: 0, totalArmor: 0 },
	helmet: { itemName: "Leather Helmet", armor: 10 },
	armour: { itemName: "Leather Armour", armor: 50 },
	gloves: { itemName: "Leather Gauntlets", armor: 5 },
	boots: { itemName: "Leather Boots", armor: 15 },
	amulet: { itemName: "none", armor: 0 },
	sword: { itemName: "Copper Sword", damage: 5 }
};
var adventures = [ // name, reqLevel, minMonsters, maxMonsters, maxHp, minHp, maxDmg, minDmg, maxGold, minGold, maxXp, minXp
	new Adventure("Plains", 				1, 	2, 	4, 	40, 	25,		5, 	3, 	20, 10, 20, 10),
	new Adventure("The Cave", 				3, 	3, 	6, 	75, 	50, 	7, 	5, 	40, 20, 40,	20),
	new Adventure("Undiscovered Caves", 	7, 	5, 	7, 	125, 	100,	12,	8, 	80,	40,	80, 40)
];
var monstersNames = ["Korok", "Urog", "Shadow Drakes", "Cavernhound", "Bonewraith", "Autumn Genie", "Skeletal Griffins", "Dustbrute",
"Thunderling", "Moldclaw", "Metalflayer", "Infernohand", "Terrorstrike", "Creeping Wolpertinger", "Dawncat", "Abysssnake", "Poisonling"];
var liveAdventure; var liveMonsters = [];

var fps = 60; var interval = (1000 / fps); var version = 0.001; var init = false;
var spawnFinished; var p = player; var ps = player.stats;

// player
function Player() { console.log("This is needed to make the other Player.() functions to work."); };
Player.regainHp = function() {
	if (ps.hp < ps.maxHp) {
		var regain = getPlayerHpRegain();
		var tempHp = ps.hp + regain;
		var tempRegain = regain;
		if (tempHp > ps.maxHp) {
			console.log("too much hp regain");
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

// shop
function Shop() { console.log("This is needed to make the other Shop.() function to work."); };

// update
function Update() { console.log("This is needed to make the other Update.() function to work."); };
Update.playerStats = function() {
	$("#s-hp, #nav-hp").html("HP : " + beautify(ps.hp, 0) + "/" + beautify(ps.maxHp, 0) + ' <small class="small">+' + beautify(ps.hpPerSec, 0) + 'HP/s</small>');
	$("#s-xp, #nav-xp").html("XP : " + beautify(ps.xp, 0) + "/" + beautify(ps.xpNeeded, 0));
	$("#s-gold, #nav-gold").html("Gold : " + beautify(ps.gold, 0));
	$("#s-diamond, #nav-diamond").html("Diamond : " + beautify(ps.diamond, 0));
	$("#s-level").html("Level : " + beautify(ps.level, 0));

	$("#s-helmet").html("Helmet : <i>" + p.helmet.itemName + "</i><br>+" + p.helmet.armor + " armor");
	$("#s-armour").html("Armour : <i>" + p.armour.itemName + "</i><br>+" + p.armour.armor + " armor");
	$("#s-gloves").html("Gloves : <i>" + p.gloves.itemName + "</i><br>+" + p.gloves.armor + " armor");
	$("#s-boots").html("Boots : <i>" + p.boots.itemName + "</i><br>+" + p.boots.armor + " armor");
	$("#s-amulet").html("Amulet : <i>" + p.amulet.itemName + "</i><br>+" + p.amulet.armor + " armor");
	$("#s-sword").html("Sword : <i>" + p.sword.itemName + "</i><br>+" + p.sword.damage + " damage");
};
Update.monsters = function() {
	if (typeof liveAdventure == "string") {
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

// loading + loop
window.onload = function() {
	init = true;
	loadData();
};
var mainInterval = window.setInterval(function() {
	Update.playerStats();
	Update.monsters();
}, interval);
var regainHpInterval = window.setInterval(function() {
	Player.regainHp();
}, 1000);
var saveInterval = window.setInterval(function() {
	saveData();
}, 1000);
