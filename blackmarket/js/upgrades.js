var money = 0;
var shoot = [12, 1, 12, 1500, 5000];

var upgradesOwned = [[false, false, false, false, false], [false, false, false, false], [false, false, false], [false, false, false, false], [false, false, false],
[false, false, false], [false, false, false]];
var upgrades = [[
	new Upgrade("Shoot reward x3",		12,		"shoot[1]",		"*3"),
	new Upgrade("Shoot reward x3",		60,		"shoot[1]",		"*3"),
	new Upgrade("Shoot reward x2",		420,	"shoot[1]",		"*2"),
	new Upgrade("Shoot reward x2",		2940,	"shoot[1]",		"*2"),
	new Upgrade("Shoot reward x2",		20580,	"shoot[1]",		"*2")
], [
	new Upgrade("Shoot time /1.50",		90,		"shoot[3]",		"/1.5"),
	new Upgrade("Shoot time /1.50",		630,	"shoot[3]",		"/1.5"),
	new Upgrade("Shoot time /1.30",		4410,	"shoot[3]",		"/1.3"),
	new Upgrade("Shoot time /1.15",		30870,	"shoot[3]",		"/1.15")
], [
	new Upgrade("Ammo stock x3",		90,		"shoot[2]",		"*3"),
	new Upgrade("Ammo stock x3",		1350,	"shoot[2]",		"*3"),
	new Upgrade("Ammo stock x2",		20250,	"shoot[2]",		"*2"),
], [
	new Upgrade("Reload time /1.50",	270,	"shoot[4]",		"/1.5"),
	new Upgrade("Reload time /1.50",	1890,	"shoot[4]",		"/1.5"),
	new Upgrade("Reload time /1.30",	13230,	"shoot[4]",		"/1.3"),
	new Upgrade("Reload time /1.15",	92624,	"shoot[4]",		"/1.15")
], [
	new Upgrade("Weed price x2",		760,	"dPrice[0]",	"*2"),
	new Upgrade("Weed price x2",		2280,	"dPrice[0]",	"*2"),
	new Upgrade("Weed price x3",		13680,	"dPrice[0]",	"*3")
], [
	new Upgrade("Meth' price x2",		4600,	"dPrice[1]",	"*2"),
	new Upgrade("Meth' price x2",		13800,	"dPrice[1]",	"*2"),
	new Upgrade("Meth' price x3",		82800,	"dPrice[1]",	"*3"),
], [
	new Upgrade("Cocaine price x2",		30240,	"dPrice[2]",	"*2"),
	new Upgrade("Cocaine price x2",		90720,	"dPrice[2]",	"*2"),
	new Upgrade("Cocaine price x3",		544320,	"dPrice[2]",	"*3")
]];

function Upgrade(text, price, changeName, changeString) {
	this.text = text;
	this.price = price;
	this.changeName = changeName;
	this.changeString = changeString;
};
Upgrade.prototype.upgrade = function() {
	var index = this.changeName.indexOf("["); 
	if (index < 0) {
		var value = window[this.changeName];
		window[this.changeName] = eval(value + this.changeString);
	} else {
		var str = this.changeName.substring(0,index);
		var i = parseInt(this.changeName.substring(index+1,this.changeName.length-1));
		var value = window[str][i];
		window[str][i] = eval(value + this.changeString);
	};
};
function buyUpgrade(index, upIndex) {
	if (money < upgrades[index][upIndex].price || upgradesOwned[index][upIndex])
		return;
	money -= upgrades[index][upIndex].price;
	upgradesOwned[index][upIndex] = true;
	upgrades[index][upIndex].upgrade();
};