var skills = {
	idleMultiplierCost: 1,
	idleMultiplierBought: 1,
	instantGoldCost: 10,
	instantGoldBought: 1,

	buyIdleMultiplier: function() {
		if (player.gems >= this.idleMultiplierCost) {
			player.gems -= this.idleMultiplierCost;
			this.idleMultiplierBought++;
			this.idleMultiplierCost = helpers.idleMultiplierCost();
			quest.idleMultiplier = helpers.idleMultiplier();
		};
	},
	buyInstantGold: function() {
		if (player.gems >= this.instantGoldCost) {
			player.gems -= this.instantGoldCost;
			this.instantGoldBought++;
			var random = Math.random() + 1;
			player.gold += Math.floor((85 * Math.pow(1.15, (player.level + 50))) * random) * player.multiplier;
		};
	}
}