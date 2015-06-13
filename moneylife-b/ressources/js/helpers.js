var helpers = h = {};
h.bb = {};
h.bp = {};

h.gain = function(source) {
	c.money += source;
	c.totalMoney += source;
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