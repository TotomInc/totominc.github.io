var workers = 0;
var maxWorkers = 4;

var partsOwned = [];
var currentParts = [];
var currentPartsIndex = [];

var parts = [
	new Part("Magazine",	"A magazine to hold your ammo.",		5,	0,	0),
	new Part("Trigger",		"A trigger to shoot your bullets.",		7,	0,	1),
	new Part("Barrel",		"The main part of your weapon.",		9,	0,	2),
	new Part("Grip",		"How to hold a weapon without grip?",	11,	0,	3)
];

var gunsOwned = [];
var guns = [
	new Gun("M4A4",		"One of the best full-auto rifles.",						1200,	1,	0),
	new Gun("AK-47",	"Another one of the best full-auto rifles.",				1500,	1,	1),
	new Gun("MP7",		"A light SMG weapon, but powerful.",						600,	1,	2),
	new Gun("MP9",		"It's the TMP predecessor. Less powerful than the MP7.",	420,	1,	3)
];

function Part(name, desc, time, price, index) {
	this.name = name;
	this.desc = desc;
	this.time = time;
	this.price = price;
	this.index = index;
};
Part.init = function() {
	for (var i = 0; i < parts.length; i++) {
		partsOwned.push(0);

		$("#parts-table").append('<tr id="parts-tr-' + (i+1) + '"></tr>');
		$("#parts-tr-" + (i+1)).append('<td id="parts-name-' + (i+1) + '">' + parts[i].name + '</td>');
		$("#parts-tr-" + (i+1)).append('<td id="parts-time-' + (i+1) + '">' + parts[i].time + ' seconds</td>');
		$("#parts-tr-" + (i+1)).append('<td id="parts-owned-' + (i+1) + '">' + partsOwned[i] + '</td>');

		$("#parts-crafting-table").append('<tr id="parts-crafting-tr-' + (i+1) + '"></tr>');
		$("#parts-crafting-tr-" + (i+1)).append('<td id="parts-crafting-name-' + (i+1) + '">' + parts[i].name + '</td>');
		$("#parts-crafting-tr-" + (i+1)).append('<td id="parts-crafting-time-' + (i+1) + '">' + parts[i].time + ' seconds</td>');
		$("#parts-crafting-tr-" + (i+1)).append('<td id="parts-crafting-craft-' + (i+1) + '"><a id="parts-crafting-craft-btn-' + (i+1) + '" onclick="Part.craft(' + i + ');" class="btn btn-success btn-xs center-block">Craft</a></td>');
	};
};
Part.craft = function(index) {
	currentParts.push(parts[index].time);
	currentPartsIndex.push(parts[index].index);
	$("#parts-crafting-craft-btn-" + (index+1)).attr("disabled", "disabled");
};
Part.update = function(times) {
	for (var i = 0; i < currentParts.length; i++) {
		if (currentParts[i] > 0) {
			currentParts[i] -= times / fps;
		} else {
			if (currentParts[i] <= 0) {
				partsOwned[currentPartsIndex[i]]++;
				currentParts.splice(i, 1);
				currentPartsIndex.splice(i, 1);
				$("#parts-crafting-craft-btn-" + (i+1)).removeAttr("disabled");
			};
		};
	};
};

function Gun(name, desc, time, sell, index) {
	this.name = name;
	this.desc = desc;
	this.time = time;
	this.sell = sell;
	this.index = index;
};
Gun.init = function() {
	for (var i = 0; i < guns.length; i++) {
		gunsOwned.push(0);

		$("#factory-table").append('<tr id="factory-tr-' + (i+1) + '"></tr>');
		$("#factory-tr-" + (i+1)).append('<td id="factory-name-' + (i+1) + '">' + guns[i].name + '</td>');
		$("#factory-tr-" + (i+1)).append('<td id="factory-time-' + (i+1) + '">' + guns[i].time + ' seconds</td>');
		$("#factory-tr-" + (i+1)).append('<td id="factory-sell-' + (i+1) + '">' + fix(guns[i].sell, "money") + '$</td>');
	};
};