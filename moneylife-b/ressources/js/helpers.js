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
};

h.bb.getMoneyReward = function(i) {
	return (bb.list[i].moneyReward * bb.owned[i]) * bb.multiplier[i];
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