var helpers = h = {};

helpers.capitalizeFirstLetter = function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
helpers.removeCursor = function() {
	$(".typed-cursor").remove();
};
helpers.earnRessources = function(type, src) {
	var str = h.capitalizeFirstLetter(type);
	var index = g.ressources.list.indexOf(str);
	window["game"]["ressources"]["owned"][index] += src;
	window["game"]["ressources"]["total"][index] += src;
};
helpers.maxCells = function() {
	return g.ressources.owned[3] * g.cellsPerWater;
};
helpers.cellsMeat = function() {
	return g.ressources.owned[4] * g.cellMeat;
};
helpers.buildPrice = function(i) {
	return Math.floor(g.b.list[0].price * Math.pow(g.b.list[i].inflation, g.b.owned[i]));
};
helpers.buildReward = function(i) {
	return Math.floor(g.b.list[0].reward * g.b.owned[i]);
};