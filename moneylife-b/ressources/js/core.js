var core = c = {};

c.money = 4;
c.totalMoney = 4;
c.parts = 0;
c.energy = 0;
c.food = 0;
c.iron = 0;

c.before = new Date().getTime();
c.now = new Date().getTime();
c.init = false;
c.version = 0.001;
c.fps = 60;
c.interval = (1000/c.fps);

core.init = function() {	
	bb.init();
	bp.init();

	$("#nav-version").html("Money-Life <small>(v" + c.version + ")</small>");

	bb.update();

	c.init = true;
};

core.display = function() {
	$("#nav-money").html("$" + fix(c.money, 2));
};

core.loop = function() {
	if (c.init == true) {
		c.now = new Date().getTime();
		var a = (c.now - c.before);
		if (a > 17) {
			bb.gain(Math.floor(a / 17));
		} else {
			bb.gain(1);
		};
		c.before = new Date().getTime();

		core.display();
	};
};

window.onload = function() {
	core.init();
};
c.displayLoop = window.setInterval(function() {
	core.loop();
}, c.interval);