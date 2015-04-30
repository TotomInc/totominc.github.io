var helpers = {
	playerXpNeeded: function() {
		if (player.level > 1) 
			return Math.floor(100 * Math.pow(1.3, player.level));
		else
			return 100;
	}
}