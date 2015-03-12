var player = {
	stats: { hp: 100, maxHp: 100, hpPerSec: 2, xp: 0, xpNeeded: 100, level: 1, gold: 0, diamond: 0, totalArmor: 0 },
	helmet: { itemName: "none", armor: 0, img: "img/C_Hat03.png" },
	armour: { itemName: "none", armor: 0, img: "img/A_Clothing02.png" },
	gloves: { itemName: "none", armor: 0, img: "img/Ac_Gloves02.png" },
	boots: { itemName: "none", armor: 0, img: "img/A_Shoes01.png" },
	amulet: { itemName: "none", armor: 0, img: "" },
	sword: { itemName: "none (hand)", damage: 5, img: "img/W_Sword001.png" },
	item: { coal: 0, crystal: 0, jade: 0, ruby: 0, saphire: 0 }
};
var p = player; var ps = player.stats; var pi = player.item;

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
Player.init = function() {
	Log("Calling Player.init()");
	pi.coal = 0;
	pi.crystal = 0;
	pi.jade = 0;
	pi.ruby = 0;
	pi.saphire = 0;
	$("#s-version").html("Current game version : v" + version + release);
};