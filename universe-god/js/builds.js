g.builds = g.b = {};
g.b.owned = [];
g.b.multiplier = [];

game.builds.create = function(name, desc, price, priceName, reward, rewardName, inflation) {
	this.name = name;
	this.desc = desc;
	this.price = price;
	this.priceName = priceName;
	this.reward = reward;
	this.rewardName = rewardName;
	this.inflation = inflation;
};
game.builds.init = function() {
	for (var i = 0; i < g.b.list.length; i++) {
		g.b.owned.push(0);
		g.b.multiplier.push(1);
		$("#builds-panelbody").append('<div id="builds-row-' + i + '" class="row bottom-spacer">'
			+ '<div class="col-md-8"><p id="builds-infos-' + i + '" class="no-margin">' + g.b.list[i].name + " : " + g.b.list[i].reward + " " + g.b.list[i].rewardName.toLowerCase() + "/sec<br>"
			+ g.b.owned[i] + " owned : " + h.buildReward(i) + " " + g.b.list[i].rewardName.toLowerCase() + "/sec"
			+ "<br>Cost " + fix(h.buildPrice(i), 0) + " " + g.b.list[i].priceName.toLowerCase() + '</p></div>'
			+ '<div class="col-md-4"><a id="builds-btn-' + i + '" type="button" class="btn btn-primary btn-block" onclick="g.b.buy(' + i + ')">Buy build</a></div>'
			+ '</div>');
	};
};
game.builds.buy = function(i) {
	var index = g.ressources.list.indexOf(g.b.list[i].priceName);
	var price = h.buildPrice(i);
	if (g.ressources.owned[index] >= price) {
		g.ressources.owned[index] -= price;
		g.b.owned[i]++;
		g.b.update();
	};
};
game.builds.earn = function(times) { // todo
	for (var i = 0; i < g.b.list.length; i++) {
		var index = g.ressources.list.indexOf(g.b.list[i].rewardName);
		for (var e = 0; e < g.ressources.owned.length; e++) {
			if (index == e) {
				g.ressources.owned[e] += (h.buildReward(i) * times) / g.options.fps;
			};
		};
	};
};
game.builds.checkSave = function() {
	if (g.b.owned.length !== g.b.list.length) {
		var a = (g.b.list.length - g.b.owned.length);
		for (var i = 0; i < a; i++)
			g.b.owned.push(0);
	};
};
game.builds.update = function() {
	for (var i = 0; i < g.b.list.length; i++) {
		$("#builds-infos-" + i).html(g.b.list[i].name + " : " + fix(g.b.list[i].reward, 2) + " " + g.b.list[i].rewardName.toLowerCase() + "/sec<br>" + fix(g.b.owned[i], 0) + " owned : " + fix(h.buildReward(i), 2) + " " + g.b.list[i].rewardName.toLowerCase() + "/sec" + "<br>Cost " + fix(h.buildPrice(i), 0) + " " + g.b.list[i].priceName.toLowerCase())
	};
};

g.b.list = [
	new g.b.create("Hydrogen build",	"Create some hydrogen", 	25, 	'Hydrogen', 	1,		'Hydrogen',		1.15),
	new g.b.create("Oxygen build",		"Create some oxygen",		25,		'Oxygen',		1,		'Oxygen',		1.15),
	new g.b.create("Helium build",		"Create some helium",		25,		'Helium',		1,		'Helium',		1.15),
	new g.b.create("Water generator",	"Generate some water",		1500,	'Hydrogen',		0.5,	'Water',		1.15)
];