var game = g = {};

g.options = {};
g.options.fps = 60;
g.options.saveIntervalTime = 10000;
g.options.interval = (1000/g.options.fps);
g.options.init = false;
g.options.before = new Date().getTime();
g.options.now = new Date().getTime();
g.options.version = 0.002;

g.ressources = {};
g.ressources.list = ["Hydrogen", "Oxygen", "Helium", "Water", "Cells", "Meat", "Sun", "Atmosphere Generator"];
g.ressources.perClick = [];
g.ressources.owned = [];
g.ressources.total = [];

g.cellsPerWater = 10;
g.cellMeat = 0.1;
g.cellCost = 5;

g.username = undefined;

// CORE FUNCTIONS
game.init = function() {
	g.ressources.init();
	g.u.init();
	g.b.init();

	save.loadData();

	g.tutorial.saveCheck();
	g.u.check();
	g.u.hide();
	g.b.update();
	g.buttons();
	g.leaderboard.check();

	if (g.t.intro5.check !== true)
		g.tutorial.intro();

	$('[data-toggle="tooltip"]').tooltip();
	$('.header-small').html(g.options.version);

	g.options.init = true;
};
game.display = function() {
	$("#ressources-display").html("Hydrogen : " + fix(g.ressources.owned[0], 0) + "<br>Oxygen : " + fix(g.ressources.owned[1], 0) + "<br>Helium : " +
	fix(g.ressources.owned[2], 0) + "<br>Water : " + fix(g.ressources.owned[3], 0) + " mL<br>Cells : " + fix(g.ressources.owned[4], 0) + "/" + h.maxCells() +
	"<br>Meat : " + fix(g.ressources.owned[5], 2));
};
game.buttons = function() {
	$("#btn-1-1").html("Create hydrogen (+" + fix(g.ressources.perClick[0], 0) + ")");
	$("#btn-1-2").html("Create oxygen (+" + fix(g.ressources.perClick[1], 0) + ")");
	$("#btn-1-3").html("Create helium (+" + fix(g.ressources.perClick[2], 0) + ")");
	$("#btn-2-1").html("Generate water (+" + fix(g.ressources.perClick[3], 0) + " mL)");
	$("#btn-3-1").html("Generate cell (+" + fix(g.ressources.perClick[4], 0) + ")");

	if (g.ressources.owned[6] == 1)
		$("#btn-3-2").css('display', 'none');
	if (g.ressources.owned[7] == 1)
		$("#btn-3-3").css('display', 'none');
};
game.loop = function() {
	if (g.options.init == true) {
		g.options.now = new Date().getTime();
		var elapsedTime = (g.options.now - g.options.before);
		if (elapsedTime > g.options.interval) {
			g.b.earn(Math.floor(elapsedTime / g.options.interval));
			g.cellsEarn(Math.floor(elapsedTime / g.options.interval))
		} else {
			g.b.earn(1);
			g.cellsEarn(1);
		};
		g.options.before = new Date().getTime();
		g.display();
	};
};
game.ressources.init = function() {
	for (var i = 0; i < g.ressources.list.length; i++) {
		g.ressources.owned.push(0);
		g.ressources.total.push(0);
		g.ressources.perClick.push(1);
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
	if (type == 'cell' && g.ressources.owned[4] < h.maxCells() && g.ressources.owned[2] >= g.cellCost) {
		g.ressources.owned[4]++;
		g.ressources.owned[2] -= g.cellCost;
	};
	if (g.t.fast.check == true)
		return;
	else
		g.t.check();
};
game.cellsEarn = function(times) {
	g.ressources.owned[5] += (h.cellsMeat() * times) / g.options.fps;
};

// INTERVALS + ONLOAD
window.onload = function() {
	g.init();
};
g.coreLoop = window.setInterval(function() {
	g.loop();
}, g.options.interval);
g.saveInterval = window.setInterval(function() {
	save.saveData();
}, g.options.saveIntervalTime)