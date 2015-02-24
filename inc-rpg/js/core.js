var player = {
	stats: { hp: 100, maxHp: 100, xp: 0, xpNeeded: 100, level: 1, gold: 0, diamond: 0 },
	helmet: { itemName: "Leather Helmet", armor: 10 },
	armour: { itemName: "Leather Armour", armor: 50 },
	gloves: { itemName: "Leather Gauntlets", armor: 5 },
	boots: { itemName: "Leather Boots", armor: 15 },
	amulet: { itemName: "none", armor: 0 },
	sword: { itemName: "Copper Sword", damage: 5 }
};

var key = "IncRPG_";
var allVars = ['player'];
var fps = 60; var interval = (1000 / fps);
var ps = player.stats;

// methods
function Monster(name, hp, maxHp, attack, goldreward, xpreward) {
	this.name = name;
	this.hp = hp;
	this.maxHp = maxHp;
	this.attack = attack;
	this.goldreward = goldreward;
	this.xpreward = xpreward;
};
Monster.invoke = function(monstersToSpawn) {
	spawnFinished = false;
	toSpawn = monstersToSpawn;
	for (var i = 0; i < monsters.length; i++) {
		var r = Math.floor(Math.random() * 9);
		if (i < toSpawn) { // only one monster
			liveMonsters.push(monsters[r]);
			liveMonstersIndex = []; // reset live monsters index array
			for (var e = 0; e < liveMonsters.length; e++) {
				liveMonstersIndex.push(e);
			};
		};
	};
	spawnFinished = true;
};
function Adventure(name, reqLevel, minMonsters, maxMonsters) {
	this.name = name;
	this.reqLevel = reqLevel;
	this.minMonsters = minMonsters;
	this.maxMonsters = maxMonsters;
};
Adventure.start = function(index) {
	var a = adventures[index];
	if (ps.level >= a.reqLevel) {
		var mToSpawn = Math.floor(Math.random() * (a.maxMonsters - a.minMonsters + 1)) + a.minMonsters;
		liveAdventure = a.name;
		Monster.invoke(mToSpawn);
		Update.monsters();
	};
};

// update functions
function Update() { console.log("This is needed to make the other update function to work."); };
Update.playerStats = function() {
	$("#s-hp, #nav-hp").html("HP : " + ps.hp + "/" + ps.maxHp);
	$("#s-xp, #nav-xp").html("XP : " + ps.xp + "/" + ps.xpNeeded);
	$("#s-gold, #nav-gold").html("Gold : " + beautify(ps.gold, 0));
	$("#s-diamond, #nav-diamond").html("Diamond : " + beautify(ps.diamond, 0));

	$("#s-helmet").html("Helmet : <i>" + player.helmet.itemName + "</i><br>+" + player.helmet.armor + " armor");
	$("#s-armour").html("Armour : <i>" + player.armour.itemName + "</i><br>+" + player.armour.armor + " armor");
	$("#s-gloves").html("Gloves : <i>" + player.gloves.itemName + "</i><br>+" + player.gloves.armor + " armor");
	$("#s-boots").html("Boots : <i>" + player.boots.itemName + "</i><br>+" + player.boots.armor + " armor");
	$("#s-amulet").html("Amulet : <i>" + player.amulet.itemName + "</i><br>+" + player.amulet.armor + " armor");
	$("#s-sword").html("Sword : <i>" + player.sword.itemName + "</i><br>+" + player.sword.damage + " damage");
};
Update.monsters = function() {
	if (spawnFinished == true) {
		for (var e = 0; e < liveMonstersIndex.length; e++) {
			var lmi = liveMonstersIndex[e];
			var lMI = liveMonstersIndex;
			var lm = liveMonsters[e];
			// creating div and rows (col-md-6, col-md-4, col-md-2)
			$("#monsters-well").append('<div id="monster-' + lmi + '" class="monster-div"></div>');
			$("#monster-" + lmi).append('<div id="monster-row' + lmi + '" class="row"></div>');
			$("#monster-row" + lmi).append('<div id="monster-col' + lmi + '" class="col-md-6"></div>');
			$("#monster-row" + lmi).append('<div id="monster-medcol' + lmi + '" class="col-md-4"></div>');
			$("#monster-row" + lmi).append('<div id="monster-smcol' + lmi + '" class="col-md-2"></div>');
			// attack button (col-md-2)
			$("#monster-smcol" + lmi).append('<a class="btn btn-default btn-sm">Attack!</a>');
			// health-bar with text (col-md-6)
			$("#monster-col" + lmi).append('<div id="monster-healthbar' + lmi + '" class="progress"></div>');
			$("#monster-healthbar" + lmi).append('<div id="monster-hb' + lmi + '" class="progress-bar progress-bar-danger" style="width: 100%"></div>')
			$("#monster-hb" + lmi).append('<span id="monster-hpdisplay' + lmi + '" class="monster-bar-hp">' + lm.hp + "/" + lm.maxHp + ' HP</span>');
			// monster info + img (col-md-4)
			$("#monster-medcol" + lmi).append('<img class="stats" src="img/E_Bones01.png"> ');
			$("#monster-medcol" + lmi).append('<span id="monster-info' + lmi + '"></span>');
			$("#monster-info" + lmi).html(lm.name + ", attack : " + lm.attack);
			// remove no-monsters adventure text
			if (lMI.length == 0) {
				$("#monsters-none").css("display", "block");
			} else {
				$("#monsters-none").css("display", "none");
			}
		};
	};
};

// loading + loop
window.onload = function() {
	loadData();
};
var mainInterval = window.setInterval(function() {
	Update.playerStats();
}, interval);