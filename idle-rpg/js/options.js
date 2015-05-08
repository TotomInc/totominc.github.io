var options = {
	fps: 60,
	interval: (1000/60),
	now: undefined,
	before: undefined,
	theme: "Default",

	init: function() {
		this.before = new Date().getTime();
		$("#t-" + this.theme).attr("selected", "");
		$("#stylesheet").attr("href", themes[themeSelected.selectedIndex].path);
	},
	update: function() {
		this.now = new Date().getTime();
		var elapsedTime = this.now - this.before;
		if (elapsedTime > 17)
			quest.idle(Math.floor(elapsedTime/this.interval));
		else
			quest.idle(1);
		this.before = new Date().getTime();

		player.display();
		quest.display();
	}
}

window.onload = function() {
	save.loadData();
	options.init();
	getScore();
};
window.setInterval(function() {
	options.update();
}, options.interval)