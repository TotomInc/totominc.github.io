var core = c = {};

c.test = 1;

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
c.wait = 1;

core.init = function() {	
	bb.init();
	bp.init();
	u.bb.init();

	$("#nav-version").html("Money-Life <small>(v" + c.version + ")</small>");

	bb.update();

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