var game = g = {};

g.options = {};
g.options.fps = 60;
g.options.interval = (1000/g.fps);
g.options.init = false;
g.options.before = new Date().getTime();
g.options.now = new Date().getTime();
g.options.version = 'super-mega-early-prototype';

g.ressources = {};
g.ressources.list = ["Hydrogen", "Oxygen", "Helium", "Water", "Cells", "Meat", "Sun", "Atmosphere Generator"];
g.ressources.perClick = [];
g.ressources.owned = [];
g.ressources.total = [];

// CORE FUNCTIONS
game.init = function() {
	for (var i = 0; i < g.ressources.list.length; i++) {
		g.ressources.owned.push(0);
		g.ressources.total.push(0);
		g.ressources.perClick.push(1);
	};

	g.u.init();
	$('[data-toggle="tooltip"]').tooltip();
	$('.header-small').html(g.options.version);
	g.tutorial.intro();

	g.options.init = true;
};
game.display = function() {
	$("#ressources-display").html("Hydrogen : " + fix(g.ressources.owned[0], 0) + "<br>Oxygen : " + fix(g.ressources.owned[1], 0) + "<br>Helium : " +
	fix(g.ressources.owned[2], 0) + "<br>Water : " + fix(g.ressources.owned[3], 0) + " mL<br>Cells : " + fix(g.ressources.owned[4], 0) + "<br>Meat : " +
	fix(g.ressources.owned[5], 0));
};
game.buttons = function() {
	$("#btn-1-1").html("Create hydrogen (+" + fix(g.ressources.perClick[0], 0) + ")");
	$("#btn-1-2").html("Create oxygen (+" + fix(g.ressources.perClick[1], 0) + ")");
	$("#btn-1-3").html("Create helium (+" + fix(g.ressources.perClick[2], 0) + ")");
	$("#btn-2-1").html("Generate water (+" + fix(g.ressources.perClick[3], 0) + " mL)");
	$("#btn-3-1").html("Generate cell (+" + fix(g.ressources.perClick[4], 0) + ")");
};
game.loop = function() {
	if (g.options.init == true) {
		g.options.now = new Date().getTime();
		var elapsedTime = (g.options.now - g.options.before);
		if (elapsedTime > 17) {
			// here goes our builds gain functions :
			// example : game.gain(Math.floor(elapsedTime / 17));
		} else {
			// here also goes our builds gain functions :
			// example : game.gain(Math.floor(1));
		};
		g.options.before = new Date().getTime();
		g.display();
	};
};

// GAME FUNCTIONS
game.earn = function(type) {
	var a = g.ressources.owned;
	if (type == "hydrogen" || type == "oxygen" || type == "helium") {
		var str = h.capitalizeFirstLetter(type);
		var index = g.ressources.list.indexOf(str);
		h.earnRessources(type, g.ressources.perClick[index]);
	};
	if (type == "water" && a[0] >= 20 && a[1] >= 10) {
		a[0] -= 20;
		a[1] -= 10;
		a[3]++;
	};
	if (type == "sun" && a[0] >= 75 && a[2] >= 15 && a[1] >= 10 && a[6] == 0) {
		a[6] = 1;
		a[0] -= 75;
		a[2] -= 15;
		a[1] -= 10;
		$("#btn-3-2").fadeOut('slow', function() {
			$("#btn-3-2, .tooltip").remove();
		});
	};
	if (type == "atmo-gen" && a[0] >= 150 && a[1] >= 100 && a[2] >= 50 && a[7] == 0) {
		a[7] = 1;
		a[0] -= 150;
		a[1] -= 100;
		a[2] -= 50;
		$("#btn-3-3, .tooltip").fadeOut('slow', function() {
			$("#btn-3-3, .tooltip").remove();
		});
	};
	g.t.check();
};

// INTERVALS + ONLOAD
window.onload = function() {
	g.init();
};
g.coreLoop = window.setInterval(function() {
	g.loop();
}, g.interval);