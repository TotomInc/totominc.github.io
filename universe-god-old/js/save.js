var save = {};
save.key = "UniverseGod_Save";
save.tosave = { game: game, builds: builds, upgrades: upgrades };

save.saveData = function() {
	console.info("Game saved. (Auto-save every " + (g.options.saveIntervalTime / 1000) + " seconds)");
	localStorage.setItem(save.key, JSON.stringify(save.tosave));
};
save.removeData = function() {
	g.saveInterval = undefined;
	localStorage.removeItem(save.key);
	location.reload();
};
save.loadData = function() {
	if (localStorage.getItem(save.key) === null)
		console.warn("No save found!");
	else {
		var savegame = s = JSON.parse(localStorage.getItem(save.key));
		var sg = s.game;

		if (sg.options.version !== g.options.version)
			console.warn('Warning : loading save from an older version.')

		g.options.before = sg.options.before;
		g.ressources.owned = sg.ressources.owned;
		g.ressources.total = sg.ressources.total;
		g.ressources.perClick = sg.ressources.perClick;
		g.cellsPerWater = sg.cellsPerWater;
		g.cellMeat = sg.cellMeat;
		g.cellCost = sg.cellCost;
		g.b.owned = sg.builds.owned;
		g.b.multiplier = sg.builds.multiplier;
		g.u.owned = sg.upgrades.owned;
		g.t.intro1.check = sg.t.intro1.check;
		g.t.intro2.check = sg.t.intro2.check;
		g.t.intro3.check = sg.t.intro3.check;
		g.t.intro4.check = sg.t.intro2.check;
		g.t.intro5.check = sg.t.intro5.check;
		g.username = sg.username;
	};
};
save.checkSave = function() {
	if (typeof g.b.multiplier !== "object") {
		g.b.multiplier = [];
		for (var i = 0; i < g.b.list.length; i++) {
			g.b.multiplier.push(1);
		};
	};
	if (g.ressources.owned[4] > h.maxCells()) {
		g.ressources.owned[4] = h.maxCells();
		alert('Bug exploit used, number of cells reduced.');
	};
};