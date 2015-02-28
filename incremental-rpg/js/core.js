var player = {
	stats: { hp: 100, maxHp: 100, xp: 0, xpNeeded: 100, level: 1, gold: 0, diamond: 0 },
	helmet: { itemName: "Leather Helmet", armor: 10 },
	armour: { itemName: "Leather Armour", armor: 50 },
	gloves: { itemName: "Leather Gauntlets", armor: 5 },
	boots: { itemName: "Leather Boots", armor: 15 },
	amulet: { itemName: "none", armor: 0 },
	sword: { itemName: "Copper Sword", damage: 5 }
};
var adventures = [
	new Adventure("Plains", 1, 3, 5)
];
var liveAdventure;

var key = "IncRPG_";
var allVars = ['player', 'version'];
var fps = 60; var interval = (1000 / fps); var version = "0.001";
var p = player; var ps = player.stats;

// adventures
function Adventure(name, reqLevel, minMonsters, maxMonsters) {
	this.name = name;
	this.reqLevel = reqLevel;
	this.minMonsters = minMonsters;
	this.maxMonsters = maxMonsters;
};
Adventure.start = function(index) {
	var a = adventures[index];
	if (ps.level >= a.reqLevel && typeof liveAdventure !== "string") {
		var mToSpawn = Math.floor(Math.random() * (a.maxMonsters - a.minMonsters + 1)) + a.minMonsters;
		liveAdventure = a.name;
	};
};

// update functions
function Update() { console.log("This is needed to make the other update function to work."); };
Update.playerStats = function() {
	$("#s-hp, #nav-hp").html("HP : " + ps.hp + "/" + ps.maxHp);
	$("#s-xp, #nav-xp").html("XP : " + ps.xp + "/" + ps.xpNeeded);
	$("#s-gold, #nav-gold").html("Gold : " + beautify(ps.gold, 0));
	$("#s-diamond, #nav-diamond").html("Diamond : " + beautify(ps.diamond, 0));

	$("#s-helmet").html("Helmet : <i>" + p.helmet.itemName + "</i><br>+" + p.helmet.armor + " armor");
	$("#s-armour").html("Armour : <i>" + p.armour.itemName + "</i><br>+" + p.armour.armor + " armor");
	$("#s-gloves").html("Gloves : <i>" + p.gloves.itemName + "</i><br>+" + p.gloves.armor + " armor");
	$("#s-boots").html("Boots : <i>" + p.boots.itemName + "</i><br>+" + p.boots.armor + " armor");
	$("#s-amulet").html("Amulet : <i>" + p.amulet.itemName + "</i><br>+" + p.amulet.armor + " armor");
	$("#s-sword").html("Sword : <i>" + p.sword.itemName + "</i><br>+" + p.sword.damage + " damage");
};

// loading + loop
window.onload = function() {
	loadData();
};
var mainInterval = window.setInterval(function() {
	Update.playerStats();
}, interval);