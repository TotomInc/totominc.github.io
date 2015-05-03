var helpers = {
	playerXpNeeded: function() {
		if (player.level > 1) 
			return Math.floor(100 * Math.pow(1.25, player.level));
		else
			return 100;
	},
	questXpNeeded: function() {
		if (player.level > 1) 
			return Math.floor(100 * Math.pow(1.3, player.level));
		else
			return 100;
	},
	questGold: function() {
		var random = Math.random() + 1;
		if (player.level > 1)
			return Math.floor(75 * Math.pow(1.15, player.level) * random) * player.multiplier;
		else
			return 75 * random;
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
	prestigeCost: function() {
		return (player.prestigeTimes) * 100;
	},
	prestigeMultiplier: function() {
		if (player.prestigeTimes == 2)
			return 2;
		else
			return (player.multiplier + player.multiplier);
	}
}