var helpers = {
	playerXpNeeded: function() {
		if (player.level > 1) 
			return Math.floor(100 * Math.pow(1.25, player.level));
		else
			return 100;
	},
	questXpNeeded: function() {
		if (player.level > 1) 
			return Math.floor(100 * Math.pow(1.27, player.level));
		else
			return 100;
	},
	questGold: function() {
		var random = Math.random() + 1;
		if (player.level > 1)
			return Math.floor((85 * Math.pow(1.15, player.level) * (player.amulet.luck / 100)) * random) * player.multiplier;
		else
			return (85 * random) * (player.amulet.luck / 100);
	},
	playerAttack: function() {
		return (player.sword.damage * player.multiplier);
	},
	playerAttackPercent: function() {
		return (player.sword.damage/player.sword.base) * 100;
	},
	playerSpeed: function() {
		return (player.boots.speed * player.multiplier);
	},
	playerSpeedPercent: function() {
		return (player.boots.speed/player.boots.base) * 100;
	},
	playerLuck: function() {
		return (player.amulet.luck/player.amulet.base);
	},
	playerLuckPercent: function() {
		return (player.amulet.luck/player.amulet.base) * 100;
	},
	prestigeCost: function() {
		return (player.prestigeTimes) * 100;
	},
	prestigeMultiplier: function() {
		if (player.prestigeTimes == 2)
			return 2;
		else
			return (player.multiplier + player.multiplier);
	},
	idleMultiplier: function() {
		if (player.prestigeTimes == 2)
			return 1.10;
		else
			return (1.10 + (player.prestigeTimes / 10) - 0.2)
	},
	swordName: function() {
		var str;
		var prefixRandom = Math.floor(Math.random() * swordPrefix.length);
		var rootRandom = Math.floor(Math.random() * swordRoot.length);
		str = swordPrefix[prefixRandom] + " " + swordRoot[rootRandom];
		return str;
	},
	bootsName: function() {
		var str;
		var prefixRandom = Math.floor(Math.random() * bootPrefix.length);
		var rootRandom = Math.floor(Math.random() * bootRoot.length);
		str = bootPrefix[prefixRandom] + " " + bootRoot[rootRandom];
		return str;
	},
	amuletName: function() {
		var str;
		var prefixRandom = Math.floor(Math.random() * amuletPrefix.length);
		var rootRandom = Math.floor(Math.random() * amuletRoot.length);
		str = amuletPrefix[prefixRandom] + " " + amuletRoot[rootRandom];
		return str;
	},
	questName: function() {
		if (quest.type == "attack") {
			var str;
			var prefixRandom = Math.floor(Math.random() * monsterPrefix.length);
			var rootRandom = Math.floor(Math.random() * monsterRoot.length);
			str = "Killing " + monsterPrefix[prefixRandom] + " " + monsterRoot[rootRandom];
			return str;
		} else {
			var str;
			var random = Math.floor(Math.random() * 100);
			if (random >= 50) {
				var travelingRandom = Math.floor(Math.random() * traveling.length);
				var prefixRandom = Math.floor(Math.random() * travelingPrefix.length);
				str = traveling[travelingRandom] + " to the " + travelingPrefix[prefixRandom];
				return str;
			} else {
				var prefixRandom = Math.floor(Math.random() * pnjPrefix.length);
				var rootRandom = Math.floor(Math.random() * pnjRoot.length);
				str = "Back to the " + pnjPrefix[prefixRandom] + " " + pnjRoot[rootRandom];
				return str;
			};
		}
	},
}