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
	new u.bb.create("Little umbrellas",			"Lemonade stand profit x3", 20000,	'multiplier[0]',	'*3'),
	new u.bb.create("Sugar doped coffees",		"Coffee-shop profit x3",	50000,	'multiplier[1]',	'*3'),
	new u.bb.create("Deluxe palaces",			"Palace profit x3",			100000,	'multiplier[2]',	'*3'),
	new u.bb.create("New hotels",				"Seaside resort profit x3",	350000,	'multiplier[3]',	'*3'),

	new u.bb.create("Press O' Lemon 1000",		"Lemonade stand profit x8",	1000000,	'multiplier[0]',	'*8'),
	new u.bb.create("Magic coffee 1337",		"Coffee-shop profit x4",	15000000,	'multiplier[1]',	'*4'),
	new u.bb.create("Staff",					"Palace profit x3",			250000000,	'multiplier[2]',	'*3'),
	new u.bb.create("Bigger hotels",			"Seaside resort profit x2",	1000000000,	'multiplier[3]',	'*2'),

	new u.bb.create("Magic O' Ice-Cubes 1000",	"Lemonade stand profit x6",	15000000000,	'multiplier[0]',	'*6'),
	new u.bb.create("Stirrers in coffees",		"Coffee profit x5",			50000000000,	'multiplier[1]',	'*5'),
	new u.bb.create("Maids",					"Palace profit x4",			100000000000,	'multiplier[2]',	'*4'),
	new u.bb.create("Water slides",				"Seaside resort profit x3",	200000000000,	'multiplier[3]',	'*3'),

	new u.bb.create("Press O' Lemon 2000",		"Lemonade stand profit x32",400000000000,	'multiplier[0]',	'*32'),
	new u.bb.create("Cane sugar doped coffee",	"Coffee-shop profit x16",	800000000000,	'multiplier[1]',	'*16'),
	new u.bb.create("Comfortable mattress",		"Palace profit x4",			1600000000000,	'multiplier[2]',	'*4'),
	new u.bb.create("Boutiques",				"Seaside resort profit x2",	3200000000000,	'multiplier[3]',	'*2')
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
// check upgrades after loading save
u.bb.check = function() {
	for (var i = 0; i < u.bb.list.length; i++) {
		if (u.bb.owned[i])
			$("#upgrade-business-" + (i+1)).addClass('bought');
	};
};