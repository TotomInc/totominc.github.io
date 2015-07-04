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