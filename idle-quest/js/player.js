var player = {
	xp: 0,
	xpNeeded: 100,
	level: 1,
	gold: 0,

	display: function() {
		$("#nav-gold").html("Gold : " + fix(this.gold, "3d"));
		$("#nav-level").html("Level : " + fix(this.level, "0d"));
	}
}

window.setInterval(function() {
	player.display();
}, 20)