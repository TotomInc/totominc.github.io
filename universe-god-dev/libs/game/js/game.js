var universegod = game = g = {};

g.core = g.c = {};
g.c.resources = g.c.r = {
	hydrogen: { owned: 0, total: 0, perclick: 1 },
	oxygen: { owned: 0, total: 0, perclick: 1 },
	helium: { owned: 0, total: 0, perclick: 1 },
	water: { owned: 0, total: 0, perclick: 1, hydrogencost: 20, oxygencost: 10 },
	cells: { owned: 0, total: 0, perclick: 1, heliumcost: 10 },
	sun: { owned: false },
	earth: { owned: false }
};

g.helper = g.h = {};

g.options = g.o = {};
g.options.devmode = true;
g.options.init = false;
g.options.fps = 60;
g.options.interval = (1000 / g.options.fps);
g.options.before = new Date().getTime();
g.options.now = new Date().getTime();
g.options.version = 0.010;

g.tutorial = g.t = {};
g.tutorial.strings = [
	"Welcome to Universe-God.<br>Your objective is to rebuild the entire universe from scratch.<br>Let's start now, generate few atoms (10 atoms) of hydrogen/oxygen/helium.",
	"Good job.<br>You can afford to generate the Sun, which cost 10 of each atoms.<br>Let's generate the Sun!",
	"It's time to generate the Earth.<br>The Earth cost 150 atoms of hydrogen and 100 atoms of oxygen.<br>Buy some builds and upgrades ot help you earn this amount of resources faster!",
	"Your Earth is created, next step is to generate some water.<br>1 mL of water cost : 20 hydrogen, 10 oxygen.<br>Generate 3 mL of water.",
	"Nice, now you get some water, you must learn about cells.<br>1 mL of water increase the capacity of maximum cells by 10.<br>1 cell earn 0.1 meat/sec."
];
g.tutorial.finished = [false, false, false, false, false];
g.tutorial.elements = [
	".resources-well, .resources-line, #btn-hydrogen, #btn-oxygen, #btn-helium",
	"#btn-sun",
	"#btn-earth, #nav-builds, #nav-upgrades",
	"#btn-water",
	"#btn-cell, #btn-buy, #nav-dropdown"
];
g.tutorial.spacer = ["<br>-----"];

g.t.removeCursor = function() {
	$(".typed-cursor").remove();
};
g.t.check = function() {
	if (g.t.finished[0] == false) {
		$(".well-log").append('<p class="no-margin"><span id="intro-text-0"></span></p>');
		$("#intro-text-0").typed({
			strings: [g.t.strings[0] + g.t.spacer],
			typeSpeed:  -25,
			callback: function() {
				$(g.t.elements[0]).fadeIn('slow');
				g.t.removeCursor();
			}
		});
	} else {
		for (var i = 0; i < g.t.finished.length; i++) {
			if (g.t.finished[i] == true && g.t.finished[(i+1)] == false) {
				var temp = (i+1);
				$(".well-log").append('<p class="no-margin"><span id="intro-text-' + (i+1) + '"></span></p>');
				$("#intro-text-" + (i+1)).typed({
					strings: [g.t.strings[(i+1)] + g.t.spacer],
					typeSpeed:  -25,
					callback: function() {
						$(g.t.elements[temp]).fadeIn('slow');
						g.t.removeCursor();
					}
				});
			};
		};
	};
};
g.t.conditions = function() {
	if (g.t.finished[0] == false) {
		if (g.c.r.hydrogen.total >= 10 && g.c.r.oxygen.total >= 10 && g.c.r.helium.total >= 10) {
			g.t.finished[0] = true;
			g.t.check();
		};
	};
	if (g.t.finished[0] == true && g.t.finished[1] == false) {
		if (g.c.r.sun.owned == true) {
			g.t.finished[1] = true;
			g.t.check();
		};
	};
	if (g.t.finished[1] == true && g.t.finished[2] == false) {
		if (g.c.r.earth.owned == true) {
			g.t.finished[2] = true;
			g.t.check();
		};
	};
	if (g.t.finished[2] == true && g.t.finished[3] == false) {
		if (g.c.r.water.total >= 3) {
			g.t.finished[3] = true;
			g.t.check();
		};
	};
};

g.c.devmode = function() {
	if (g.options.devmode == true) {
		var a = g.t.elements;
		$(a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4]).fadeIn('slow');
		g.t.finished = [];
		for (var i = 0; i < g.t.strings.length; i++)
			g.t.finished.push(true);
		$(".well-log").html("<h3 class='text-center no-margin'>Dev mode enabled</h3>");
	};
};
g.c.init = function() {
	var a = g.t.elements;
	$(a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4]).css('display', 'none');

	g.c.devmode();
	g.t.check();

	g.options.init = true;
};

window.onload = g.c.init();

g.c.conditionLoop = window.setInterval(function() {
	g.t.conditions();
}, 500);