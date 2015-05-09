var options = {
	fps: 60,
	interval: (1000/60),
	now: undefined,
	before: undefined,
	init: false,
	theme: "Default",
	version: "v0.033",

	init: function() {
		save.loadData();

		this.before = new Date().getTime();
		$("#t-" + this.theme).attr("selected", "");
		$("#stylesheet").attr("href", themes[themeSelected.selectedIndex].path);
		$("#nav-version").html("(" + this.version + ")");

		getScore(); // retrieve score for leaderboard

		this.init = true;
	},
	update: function() {
		if (this.init == true) {
			this.now = new Date().getTime();
			var elapsedTime = this.now - this.before;
			if (elapsedTime > 17)
				quest.idle(Math.floor(elapsedTime/this.interval));
			else
				quest.idle(1);
			this.before = new Date().getTime();

			player.display();
			quest.display();
		};
	}
}

window.onload = function() {
	options.init();
};
window.setInterval(function() {
	options.update();
}, options.interval)