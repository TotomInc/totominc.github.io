function getXpNeeded() {
	if (player.stats.level > 1) {
		player.stats.xpNeeded = player.stats.level * Math.sqrt(100 * 200);
	};
};