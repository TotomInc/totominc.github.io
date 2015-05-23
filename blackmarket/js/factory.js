/**
 *	IDEAS :
 *	we have workers. we have to buy them. there will be a max amount of workers.
 *	there will be 4 differents parts that we can craft :
 *	barrel, magazine, trigger, sling
 *	
 *	there will be 4 differents guns :
 *	M4A4, AK-47, MP7, MP9
 *	each gun will be faster or slower to craft.
 *
 *	once we get the parts, there will be the assembly time.
 **/

var parts = [
	new Part("Magazine",	"A magazine to hold your ammo.",		600,	0),
	new Part("Trigger",		"A trigger to shoot your bullets.",		300,	0),
	new Part("Barrel",		"The main part of your weapon.",		900,	0),
	new Part("Grip",		"How to hold a weapon without grip?",	720,	0)
];
var partsOwned = [];

var guns = [
	new Gun("M4A4",		"One of the best full-auto rifles.",						1200,	1),
	new Gun("AK-47",	"Another one of the best full-auto rifles.",				1500,	1),
	new Gun("MP7",		"A light SMG weapon, but powerful.",						600,	1),
	new Gun("MP9",		"It's the TMP predecessor. Less powerful than the MP7.",	420,	1)
];
var gunsOwned = [];

var workers = 0;
var maxWorkers = 20;

function Part(name, desc, time, price) {
	this.name = name;
	this.desc = desc;
	this.time = time;
	this.price = price;
};
Part.init = function() {
	for (var i = 0; i < parts.length; i++)
		partsOwned.push(0);
};

function Gun(name, desc, time, sell) {
	this.name = name;
	this.desc = desc;
	this.time = time;
	this.sell = sell;
};
Gun.init = function() {
	for (var i = 0; i < guns.length; i++) {
		gunsOwned.push(0);
	};
};