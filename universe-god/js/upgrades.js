g.upgrades = g.u = {};

game.upgrades.create = function(name, desc, price, priceName, reqName, changeName, changeValue) {
	this.name = name;
	this.desc = desc;
	this.price = price;
	this.priceName = priceName;
	this.reqName = reqName;
	this.changeName = changeName;
	this.changeValue = changeValue;
};
game.upgrades.buy = function(i) {
	var a = eval("g.ressources." + g.u.list[i].reqName);
	var index = g.ressources.list.indexOf(g.u.list[i].priceName);
	if (a >= g.u.list[i].price) {
		var preStr = g.u.list[0].changeName.substring(0, g.u.list[0].changeName.indexOf('['));
		var strIndex = g.u.list[0].changeName.substring(g.u.list[0].changeName.indexOf('[')+1, g.u.list[0].changeName.length-1);
		var fullStr = "g.ressources." + preStr + '[' + strIndex + ']';
		window["g"]["ressources"][preStr][strIndex] = eval(fullStr + g.u.list[i].changeValue);
		g.ressources.owned[index] -= g.u.list[i].price;
		g.u.owned[i] = true;
		g.buttons();
		$("#upgrades-btn-" + i).attr('onclick', '');
		$("#upgrades-btn-" + i).removeClass('btn-primary');
		$("#upgrades-btn-" + i).addClass('btn-success');
		$("#upgrades-btn-" + i).html('Owned');

	};
};
game.upgrades.init = function() {
	for (var i = 0; i < g.u.list.length; i++) {
		g.u.owned.push(false);
		$("#upgrades-panelbody").append('<div class="row bottom-spacer">'
			+ '<div class="col-md-8"><p class="no-margin">' + g.u.list[i].name + " : " + g.u.list[i].desc + "<br>Cost " + fix(g.u.list[i].price, 0) + " " + g.u.list[i].priceName.toLowerCase() + '</p>' + '</div>'
			+ '<div class="col-md-4"><a id="upgrades-btn-' + i + '" type="button" class="btn btn-primary btn-block" onclick="g.u.buy(' + i + ')">Buy upgrade</a></div>'
			+ '</div>');
	};
};
game.upgrades.hide = function() { // todo
};

g.u.owned = [];
g.u.list = [
	new g.u.create("Hydrogen I",	"Hydrogen/click x3",	10,		'Hydrogen',		'owned[0]',		'perClick[0]',		'*3'),
	new g.u.create("Hydrogen II",	"Hydrogen/click x3",	75,		'Hydrogen',		'owned[0]',		'perClick[0]',		'*3'),
	new g.u.create("Hydrogen III",	"Hydrogen/click x3",	1000,	'Hydrogen',		'owned[0]',		'perClick[0]',		'*3'),
	new g.u.create("Oxygen I",		"Oxygen/click x3",		25,		'Oxygen',		'owned[1]',		'perClick[1]',		'*3'),
	new g.u.create("Oxygen II",		"Oxygen/click x3",		75,		'Oxygen',		'owned[1]',		'perClick[1]',		'*3'),
	new g.u.create("Oxygen III",	"Oxygen/click x3",		1000,	'Oxygen',		'owned[1]',		'perClick[1]',		'*3')
];