var player = {
	stats: { hp: 100, maxHp: 100, hpPerSec: 2, xp: 0, xpNeeded: 100, level: 1, gold: 0, diamond: 0, medals: 0, totalArmor: 0 },
	helmet: { itemName: "Newbie Helmet", armor: 15, img: "img/C_Hat03.png", enchantment: "none" },
	armour: { itemName: "Newbie Armour", armor: 40, img: "img/A_Clothing02.png", enchantment: "none" },
	gloves: { itemName: "Newbie Gloves", armor: 10, img: "img/Ac_Gloves02.png", enchantment: "none" },
	boots: { itemName: "Newbie Boots", armor: 30, img: "img/A_Shoes01.png", enchantment: "none" },
	amulet: { itemName: "none", armor: 0, img: "", enchantment: "none" },
	sword: { itemName: "Newbie Sword", damage: 5, img: "img/W_Sword001.png", enchantment: "none" },
	item: { coal: 0, crystal: 0, jade: 0, ruby: 0, saphire: 0 },
	enchants: { helmet: 0, armour: 0, gloves: 0, boots: 0, amulet: 0, sword: 0 }
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