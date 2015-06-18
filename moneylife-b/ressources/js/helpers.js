var helpers = h = {};
h.bb = {};
h.bp = {};
h.u = {};
h.u.bb = {};
h.u.bp = {};

h.gain = function(source) {
	c.money += source;
	c.totalMoney += source;
};
h.buySwitch = function() {
	if (c.buy == 1)
		c.buy = 10;
	else
		if (c.buy == 10)
			c.buy = 100;
		else
			if (c.buy == 100)
				c.buy = 1000;
			else
				if (c.buy == 1000)
					c.buy = 1

	bb.update();
	bp.update();
};
// business builds helpers
h.bb.getMoneyReward = function(i) {
	return (bb.list[i].moneyReward * bb.owned[i]) * bb.multiplier[i];
};
h.bb.getMps = function(i) {
	return (h.bb.getMoneyReward(i) / h.bb.getTime(i));
};
h.bb.getPrice = function(i) {
	return (bb.list[i].price * Math.pow(bb.list[i].inflation, bb.owned[i]));
};
h.bb.getTime = function(i) {
	return (bb.list[i].time * bb.timeMultiplier[i]);
};
h.bb.displayPrice = function(a, z) {
	var b = bb.list[z];
	var amount = a;
	var tp = 0;
	var to = amount + bb.owned[z];
	while (to > bb.owned[z]) {
		amount--;
		to = amount + bb.owned[z];
		tp += (bb.list[z].price * Math.pow(bb.list[z].inflation, to));
	};
	return tp;
};
// builds production helpers
h.bp.getMoneyReward = function(i) {
	return (bp.list[i].moneyReward * bp.owned[i]) * bp.profitMultiplier[i];
};
h.bp.getMps = function(i) {
	return (h.bp.getMoneyReward(i) / h.bp.getTime(i));
};
h.bp.getPrice = function(i) {
	return (bp.list[i].price * Math.pow(bp.list[i].inflation, bp.owned[i]));
};
h.bp.getRessourceReward = function(i) {
	return (bp.list[i].ressourceReward * bp.owned[i]) * bp.ressourceMultiplier[i];
};
h.bp.getTime = function(i) {
	return (bp.list[i].time * bp.timeMultiplier[i]);
};
h.bp.displayPrice = function(a, z) {
	var b = bp.list[z];
	var amount = a;
	var tp = 0;
	var to = amount + bp.owned[z];
	while (to > bp.owned[z]) {
		amount--;
		to = amount + bp.owned[z];
		tp += (bp.list[z].price * Math.pow(bp.list[z].inflation, to));
	};
	return tp;
};