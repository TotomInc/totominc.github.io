var upgrades = u = {};
u.bb = {};

u.bb.create = function(name, desc, price, changeName, changeValue) {
	this.name = name;
	this.desc = desc;
	this.price = price;
	this.changeName = changeName;
	this.changeValue = changeValue;
};

u.bb.owned = [];
u.bb.list = [
	new u.bb.create("Little umbrellas",			"Lemonade stand profit x3", 2e4,	'multiplier[0]',		'*3'),
	new u.bb.create("Sugar doped coffees",		"Coffee-shop profit x3",	5e4,	'multiplier[1]',		'*3'),
	new u.bb.create("Deluxe palaces",			"Palace profit x3",			1e5,	'multiplier[2]',		'*3'),
	new u.bb.create("New hotels",				"Seaside resort profit x3",	5e5,	'multiplier[3]',		'*3'),
	new u.bb.create("Press O' Lemon 1000",		"Lemonade stand time /2",	1e6,	'timeMultiplier[0]',	'/2'),
	new u.bb.create("Magic coffee 1337",		"Coffee-shop time /2",		25e6,	'timeMultiplier[1]',	'/2'),
	new u.bb.create("Staff",					"Palace time /2",			5e8,	'timeMultiplier[2]',	'/2'),
	new u.bb.create("Bigger hotels",			"Seaside resort time /2",	15e8,	'timeMultiplier[3]',	'/2'),
	new u.bb.create("Magic O' Ice-Cubes 1000",	"Lemonade stand profit x2",	1e10,	'multiplier[0]',		'*2'),
	new u.bb.create("Stirrers in coffees",		"Coffee profit x4",			75e9,	'multiplier[1]',		'*4'),
	new u.bb.create("Maids",					"Palace profit x6",			5e11,	'multiplier[2]',		'*6'),
	new u.bb.create("Water slides",				"Seaside resort profit x8",	1e12,	'multiplier[3]',		'*8')
];

// init upgrades
u.bb.init = function() {
	for (var i = 0; i < u.bb.list.length; i++) {
		var a = u.bb.list[i];
		u.bb.owned.push(false);
		$("#upgrades-business").append('<div id="upgrade-business-' + (i+1) + '" class="upgrade text-center">' + a.name + "<br><i>" + a.desc + "</i><br>Cost " + fix(a.price, 2) + "$</div>");
		$("#upgrade-business-" + (i+1)).attr('onclick', 'u.bb.buy(' + i + ');');
	};
};
// buying upgrades
u.bb.buy = function(i) {
	var a = u.bb.list[i];
	if (c.money >= a.price && u.bb.owned[i] !== true) {
		c.money -= a.price;
		u.bb.owned[i] = true;
		var index = a.changeName.indexOf('[');
		var str = a.changeName.substring(0, index);
		var b = parseInt(a.changeName.substring(index + 1, a.changeName.length - 1));
		var value = window["bb"][str][b];
		window["bb"][str][b] = eval(value + a.changeValue);
		$("#upgrade-business-" + (i+1)).addClass('bought');
	};
	bb.update();
};