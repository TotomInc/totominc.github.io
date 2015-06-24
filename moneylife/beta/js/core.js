var core = c = {};

c.money = 4;
c.totalMoney = 4;
c.parts = 0;
c.energy = 0;
c.food = 0;
c.iron = 0;

c.buy = 1;

c.before = new Date().getTime();
c.now = new Date().getTime();
c.init = false;
c.version = 0.001;
c.fps = 60;
c.interval = (1000/c.fps);
c.wait = 0;

core.init = function() {
	// builds init
	bb.init();
	bp.init();
	// achievements init
	u.bb.init();
	a.bb.init();
	// display builds
	bb.update();
	bp.update();
	// loading save
	save.loadData();
	// misc
	$("#nav-version").html("Money-Life <small>(v" + c.version + ")</small>");
	// interval with loading screen
	window.setInterval(function() {
		c.init = true;
		$(".loading-container").css('display', 'none');
		$(".game-container").css('display', 'block');
	}, c.wait);
};
core.display = function() {
	$("#nav-money").html("$" + fix(c.money, 2));

	for (var i = 0; i < bp.list.length; i++) {
		var a = bp.list[i];
		var b = window["c"][a.ressource];
		$("#bp-ressource-" + (i+1)).html(fix(b, 2) + " " + a.ressource);
	};

	$("#options-buy").html("Buy x" + c.buy);
};
core.loop = function() {
	if (c.init == true) {
		c.now = new Date().getTime();
		var a = (c.now - c.before);
		if (a > 17) {
			bb.gain(Math.floor(a / 17));
			bp.gain(Math.floor(a / 17));
		} else {
			bb.gain(1);
			bp.gain(1);
		};
		c.before = new Date().getTime();

		core.display();
		achievements.loop();
	};
};

window.onload = function() {
	core.init();
};
c.displayLoop = window.setInterval(function() {
	core.loop();
}, c.interval);
c.saveLoop = window.setInterval(function() {
	save.saveData();
}, 10000);