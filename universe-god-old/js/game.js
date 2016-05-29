var game = g = {};

g.options = {};
g.options.devMode = false;
g.options.fps = 60;
g.options.saveIntervalTime = 10000;
g.options.interval = (1000/g.options.fps);
g.options.init = false;
g.options.before = new Date().getTime();
g.options.now = new Date().getTime();
g.options.version = 0.003;

g.ressources = {};
g.ressources.list = ["Hydrogen", "Oxygen", "Helium", "Water", "Cells", "Meat", "Sun", "Atmosphere Generator", ""];
g.ressources.perClick = [];
g.ressources.owned = [];
g.ressources.total = [];

g.cellsPerWater = 10;
g.cellMeat = 0.1;
g.cellCost = 5;

g.buyMultiplier = 1;

g.username = undefined;

// CORE FUNCTIONS
game.init = function() {
	g.ressources.init();
	g.upgrades.init();
	g.builds.init();

	save.loadData();
	save.checkSave();

	g.devMode();
	g.builds.checkSave();
	g.upgrades.checkSave();
	g.tutorial.saveCheck();
	g.upgrades.check();
	g.upgrades.hide();
	g.builds.update();
	g.buttons();
	g.leaderboard.check();
	g.leaderboard.initScore();

	if (g.t.intro5.check !== true)
		g.tutorial.intro();

	$('[data-toggle="tooltip"]').tooltip();
	$('.header-small').html(g.options.version);

	g.options.init = true;
};
game.display = function() {
	$("#ressources-display").html("Hydrogen : " + fix(g.ressources.owned[0], 0) + "<br>Oxygen : " + fix(g.ressources.owned[1], 0) + "<br>Helium : " +
	fix(g.ressources.owned[2], 0) + "<br>Water : " + fix(g.ressources.owned[3], 0) + " mL<br>Meat : " + fix(g.ressources.owned[5], 2) +
	"<br>Cells : " + fix(g.ressources.owned[4], 0) + "/" + fix(h.maxCells(), 0));
};
game.buttons = function() {
	$("#btn-1-1").html("Create hydrogen (+" + fix(g.ressources.perClick[0], 0) + ")");
	$("#btn-1-2").html("Create oxygen (+" + fix(g.ressources.perClick[1], 0) + ")");
	$("#btn-1-3").html("Create helium (+" + fix(g.ressources.perClick[2], 0) + ")");
	$("#btn-2-1").html("Generate water (+" + fix(g.ressources.perClick[3] * g.buyMultiplier, 0) + " mL)");
	$("#btn-2-1").attr('data-original-title', 'Cost ' + fix((20 * g.buyMultiplier), 0) + ' hydrogen, ' + fix((10 * g.buyMultiplier), 0) + ' oxygen');
	$("#btn-3-1").html("Generate cell (+" + fix(g.ressources.perClick[4] * g.buyMultiplier, 0) + ")");
	$("#btn-3-1").attr('data-original-title', 'Cost ' + fix((g.cellCost * g.buyMultiplier), 0) + ' helium')

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
	if (type == "water" && a[0] >= 20 * g.buyMultiplier && a[1] >= 10 * g.buyMultiplier) {
		if (g.buyMultiplier > 1) {
			for (var i = 0; i < g.buyMultiplier; i++) {
				if (a[0] >= 20 && a[1] >= 10) {
					a[3]++;
					a[0] -= 20;
					a[1] -= 10;
				};
			};
		} else {
			a[0] -= 20;
			a[1] -= 10;
			a[3]++;
		};
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
	if (type == 'cell' && a[4] + g.buyMultiplier <= h.maxCells() && a[2] >= g.cellCost * g.buyMultiplier) {
		if (g.buyMultiplier > 1) {
			for (var i = 0; i < g.buyMultiplier; i++) {
				if (a[2] >= g.cellCost) {
					a[4]++;
					a[2] -= g.cellCost;
				};
			};
		} else {
			a[4]++;
			a[2] -= g.cellCost;
		};
	};
	if (g.t.fast.check == true) {
		return;
	} else {
		g.t.check();
	};
};
game.cellsEarn = function(times) {
	g.ressources.owned[5] += (h.cellsMeat() * times) / g.options.fps;
};
game.changeBuy = function() {
	if (g.buyMultiplier == 1)
		g.buyMultiplier = 10;
	else
		if (g.buyMultiplier == 10)
			g.buyMultiplier = 100;
		else
			if (g.buyMultiplier == 100)
				g.buyMultiplier = 1000;
			else
				if (g.buyMultiplier == 1000)
					g.buyMultiplier = 1;
	$("#btn-buy-multiplier").html("Buy x" + fix(g.buyMultiplier, 0));
	game.buttons();
};
game.devMode = function() {
	if (g.options.devMode == true) {
		console.warn("Dev mode enabled!");
		g.t.fast.check = true;
	};
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
}, g.options.saveIntervalTime);