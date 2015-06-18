var achievements = a = {};
a.bb = {};

a.bb.create = function(name, desc, desc2, reqName, reqValue, changeName, changeValue) {
	this.name = name;
	this.desc = desc;
	this.desc2 = desc2;
	this.reqName = reqName;
	this.reqValue = reqValue;
	this.changeName = changeName;
	this.changeValue = changeValue;
};

a.bb.owned = [];
a.bb.list = [
	new a.bb.create("Lemon squeezer I",		"Own 10 lemonade stands",	"Lemonade stand speed x2", 'owned[0]', 10,		'timeMultiplier[0]', '/2'),
	new a.bb.create("Lemon squeezer II",	"Own 25 lemonade stands",	"Lemonade stand speed x2", 'owned[0]', 25,		'timeMultiplier[0]', '/2'),
	new a.bb.create("Lemon squeezer III",	"Own 50 lemonade stands",	"Lemonade stand speed x2", 'owned[0]', 50,		'timeMultiplier[0]', '/2'),
	new a.bb.create("Lemon squeezer IV",	"Own 100 lemonade stands",	"Lemonade stand speed x2", 'owned[0]', 100,		'timeMultiplier[0]', '/2'),
	new a.bb.create("Lemon squeezer V",		"Own 200 lemonade stands",	"Lemonade stand speed x2", 'owned[0]', 200,		'timeMultiplier[0]', '/2'),
	new a.bb.create("Lemon lord I",			"Own 300 lemonade stands",	"Lemonade stand speed x2", 'owned[0]', 300,		'timeMultiplier[0]', '/2'),

	new a.bb.create("Coffee apprentice I",	"Own 10 coffee-shops",	"Coffee-shop speed x2",			'owned[1]',	10,		'timeMultiplier[1]', '/2'),
	new a.bb.create("Coffee apprentice II",	"Own 25 coffee-shops",	"Coffee-shop speed x2",			'owned[1]',	25,		'timeMultiplier[1]', '/2'),
	new a.bb.create("Coffee apprentice III","Own 50 coffee-shops",	"Coffee-shop speed x2",			'owned[1]',	50,		'timeMultiplier[1]', '/2'),
	new a.bb.create("Coffee apprentice IV",	"Own 100 coffee-shops",	"Coffee-shop speed x2",			'owned[1]',	100,	'timeMultiplier[1]', '/2'),
	new a.bb.create("Coffee apprentice V",	"Own 200 coffee-shops",	"Coffee-shop speed x2",			'owned[1]',	200,	'timeMultiplier[1]', '/2'),
	new a.bb.create("Coffee lord I",		"Own 300 coffee-shops",	"Coffee-shop speed x2",			'owned[1]',	300,	'timeMultiplier[1]', '/2'),

	new a.bb.create("Palace owner I",		"Own 10 palaces",		"Palace speed x2",				'owned[2]',	10,		'timeMultiplier[2]', '/2'),
	new a.bb.create("Palace owner II",		"Own 25 palaces",		"Palace speed x2",				'owned[2]',	25,		'timeMultiplier[2]', '/2'),
	new a.bb.create("Palace owner III",		"Own 50 palaces",		"Palace speed x2",				'owned[2]',	50,		'timeMultiplier[2]', '/2'),
	new a.bb.create("Palace owner IV",		"Own 100 palaces",		"Palace speed x2",				'owned[2]',	100,	'timeMultiplier[2]', '/2'),
	new a.bb.create("Palace owner V",		"Own 200 palaces",		"Palace speed x2",				'owned[2]',	200,	'timeMultiplier[2]', '/2'),
	new a.bb.create("Palace owner VI",		"Own 300 palaces",		"Palace speed x2",				'owned[2]',	300,	'timeMultiplier[2]', '/2'),

	new a.bb.create("Paradise owner I",		"Own 10 seaside resorts",	"Seaside resort speed x2",	'owned[3]',	10,		'timeMultiplier[3]', '/2'),
	new a.bb.create("Paradise owner II",	"Own 25 seaside resorts",	"Seaside resort speed x2",	'owned[3]',	25,		'timeMultiplier[3]', '/2'),
	new a.bb.create("Paradise owner III",	"Own 50 seaside resorts",	"Seaside resort speed x2",	'owned[3]',	50,		'timeMultiplier[3]', '/2'),
	new a.bb.create("Paradise owner IV",	"Own 100 seaside resorts",	"Seaside resort speed x2",	'owned[3]',	100,	'timeMultiplier[3]', '/2'),
	new a.bb.create("Paradise owner V",		"Own 200 seaside resorts",	"Seaside resort speed x2",	'owned[3]',	200,	'timeMultiplier[3]', '/2'),
	new a.bb.create("Paradise owner VI",	"Own 300 seaside resorts",	"Seaside resort speed x2",	'owned[3]',	300,	'timeMultiplier[3]', '/2'),
];

// main achievement loop
a.loop = function() {
	a.bb.achieve();
};
// init achievements
a.bb.init = function() {
	for (var i = 0; i < a.bb.list.length; i++) {
		var b = a.bb.list[i];
		a.bb.owned.push(false);
		var index = b.reqName.indexOf('[');
		var z = parseInt(b.reqName.substring(index+1, b.reqName.length-1));
		$("#achievements-business").append('<div id="achievements-business-' + (i+1) + '" class="achievement text-center">' + b.name + "<br>" + b.desc + "<br><i>" + b.desc2 + "</i></div>");
	};
};
// check if achievement is complete
a.bb.isComplete = function(i) {
	var l = a.bb.list[i];
	var index = l.reqName.indexOf('[');
	var str = l.reqName.substring(0, index);
	var z = parseInt(l.reqName.substring(index+1, l.reqName.length-1));
	var value = window["bb"][str][z];
	return value >= l.reqValue;
};
// apply achievement effect if complete
a.bb.achieve = function() {
	for (var i = 0; i < a.bb.list.length; i++) {
		var l = a.bb.list[i];
		if (a.bb.isComplete(i) && a.bb.owned[i] !== true) { // todo
			var index = l.changeName.indexOf('[');
			var str = l.changeName.substring(0, index);
			var z = parseInt(l.changeName.substring(index+1, l.changeName.length-1));
			var value = window["bb"][str][z];
			window["bb"][str][z] = eval(value + l.changeValue);
			a.bb.owned[i] = true;
			$("#achievements-business-" + (i+1)).addClass('bought');
			bb.update();
		};
	};
};
// check acheivements after loading save
a.bb.check = function() {
	for (var i = 0; i < a.bb.list.length; i++) {
		if (a.bb.owned[i])
			$("#achievements-business-" + (i+1)).addClass('bought');
	};
};