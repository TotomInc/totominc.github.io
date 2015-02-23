var key = "IncRPG_";
var allVars = ['player'];
var fps = 60; var interval = (1000 / fps);

var player = {
	stats: { hp: 100, maxHp: 100, xp: 0, xpNeeded: 100, level: 1, gold: 0, diamond: 0 },
	helmet: { itemName: null, armor: 10 },
	armour: { itemName: null, armor: 50 },
	gloves: { itemName: null, armor: 5 },
	boots: { itemName: null, armor: 15 },
	amulet: { itemName: null, armor: 0 }
}

function playerStats() {
	$("#s-hp, #nav-hp").html("HP : " + player.stats.hp + "/" + player.stats.maxHp);
	$("#s-xp, #nav-xp").html("XP : " + player.stats.xp + "/" + player.stats.xpNeeded);
	$("#s-gold, #nav-gold").html("Gold : " + beautify(player.stats.gold, 0));
	$("#s-diamond, #nav-diamond").html("Diamond : " + beautify(player.stats.diamond, 0));

	$("#s-helmet").html("Helmet : " + player.helmet.itemName + ", +" + player.helmet.armor + " armor");
	$("#s-armour").html("Armour : " + player.armour.itemName + ", +" + player.armour.armor + " armor");
	$("#s-gloves").html("Gloves : " + player.gloves.itemName + ", +" + player.gloves.armor + " armor");
	$("#s-boots").html("Boots : " + player.boots.itemName + ", +" + player.boots.armor + " armor");
	$("#s-amulet").html("Amulet : " + player.amulet.itemName + ", +" + player.amulet.armor + " armor");
};

window.onload = function() {
	loadData();
	playerStats();
};