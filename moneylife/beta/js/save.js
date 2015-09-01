var save = {};

save.tosave = { bb: bb, bp: bp, c: c, u: u, a: a }

save.saveData = function() {
	localStorage.setItem('MoneyLife', JSON.stringify(save.tosave));
};
save.removeData = function() {
	c.saveLoop = undefined;
	localStorage.removeItem('MoneyLife');
	location.reload();
};
save.loadData = function() {
	if (localStorage.getItem('MoneyLife') === null)
		console.log("No save found!");
	else {
		var savegame = s = JSON.parse(localStorage.getItem('MoneyLife'));
		var sbb = s.bb; // bb
		var sbp = s.bp; // bp
		var sc = s.c; // core
		var subb = s.u.bb; // bb up
		var sabb = s.a.bb; // bb achieve
		// if save is older
		if (sc.version !== c.version)
			console.warn("Warning : loading save from older version");
		// loading core variables
		c.money = sc.money;
		c.totalMoney = sc.totalMoney;
		c.parts = sc.parts;
		c.energy = sc.energy;
		c.food = sc.food;
		c.iron = sc.iron;
		c.before = sc.before;
		// loading bb variables
		bb.owned = sbb.owned;
		bb.progress = sbb.progress;
		bb.multiplier = sbb.multiplier;
		bb.timeMultiplier = sbb.timeMultiplier;
		// loading bp variables
		bp.owned = sbp.owned;
		bp.progress = sbp.progress;
		bp.profitMultiplier = sbp.profitMultiplier;
		bp.ressourceMultiplier = sbp.ressourceMultiplier;
		bp.timeMultiplier = sbp.timeMultiplier;
		// loading up variables
		u.bb.owned = subb.owned;
		u.bb.check();
		// loading achieve variables
		a.bb.owned = sabb.owned;
		a.bb.check();
		// update game
		bb.update();
		bp.update();
	};
};