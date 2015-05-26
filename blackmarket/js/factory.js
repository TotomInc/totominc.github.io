var partsOwned = [];
var partsTrigged = [];
var currentTimeParts = [];
var parts = [
	new Part("Magazine",	0,	5),
	new Part("Trigger",		0,	5),
	new Part("Barrel",		0,	5),
	new Part("Grip",		0,	5)
];

var gunsOwned = [];
var gunsTrigged = [];
var currentTimeGuns = [];
var guns = [
	new Gun("AK-47",		1,	10),
	new Gun("M4A4",			1,	10),
	new Gun("USP-S",		1,	10),
	new Gun("Glock-18",		1,	10)
];

function Part(name, cost, time) {
	this.name = name;
	this.cost = cost;
	this.time = time;
};
Part.init = function() {
	for (var i = 0; i < parts.length; i++) {
		partsOwned.push(0);
		partsTrigged.push(false);
		currentTimeParts.push(false);

		$("#factory-parts-table").append('<tr id="factory-parts-table-tr-' + (i+1) + '"></tr>');
		$("#factory-parts-table-tr-" + (i+1)).append('<td id="factory-parts-table-name-' + (i+1) + '">' + parts[i].name + '</td>');
		$("#factory-parts-table-tr-" + (i+1)).append('<td id="factory-parts-table-time-' + (i+1) + '">' + currentTimeParts[i] + '</td>');
		$("#factory-parts-table-tr-" + (i+1)).append('<td id="factory-parts-table-owned-' + (i+1) + '">' + partsOwned[i] + '</td>');
		$("#factory-parts-table-tr-" + (i+1)).append('<td id="factory-parts-table-craft-' + (i+1) + '">' + '<a id="factory-parts-btn-' + (i+1) + '" class="btn btn-success btn-sm center-block" onclick="Part.craft(' + i + ');">Craft</a>' + '</td>');
	};
};
Part.craft = function(index) {
	if (partsTrigged[index] !== true) {
		partsTrigged[index] = true;
		currentTimeParts[index] = parts[index].time;
	};
};
Part.update = function(times) {
	for (var i = 0; i < parts.length; i++) {
		if (partsTrigged[i] == true) {
			if (currentTimeParts[i] >= 0) {
				currentTimeParts[i] -= times/fps;
				$("#factory-parts-table-time-" + (i+1)).html(Math.round(currentTimeParts[i]) + " sec");
				$("#factory-parts-btn-" + (i+1)).attr('disabled', 'disabled');
			} else {
				currentTimeParts[i] = false;
				partsTrigged[i] = false;
				partsOwned[i]++;
				Part.check();
				Gun.check();
				$("#factory-parts-table-time-" + (i+1)).html(parts[i].time + " sec");
				$("#factory-parts-btn-" + (i+1)).removeAttr('disabled');
			};
		};
	};
};
Part.check = function() {
	for (var i = 0; i < parts.length; i++) {
		$("#factory-parts-table-owned-" + (i+1)).html(partsOwned[i]);
		$("#factory-parts-table-time-" + (i+1)).html(parts[i].time + " sec");
	};
};

function Gun(name, reward, time) {
	this.name = name;
	this.reward = reward;
	this.time = time;
};
Gun.init = function() {
	for (var i = 0; i < guns.length; i++) {
		gunsOwned.push(0);
		gunsTrigged.push(0);
		currentTimeGuns.push(false);

		$("#factory-guns-table").append('<tr id="factory-guns-table-tr-' + (i+1) + '"></tr>');
		$("#factory-guns-table-tr-" + (i+1)).append('<td id="factory-guns-table-name-' + (i+1) + '">' + guns[i].name + '</td>');
		$("#factory-guns-table-tr-" + (i+1)).append('<td id="factory-guns-table-time-' + (i+1) + '">' + currentTimeGuns[i] + '</td>');
		$("#factory-guns-table-tr-" + (i+1)).append('<td id="factory-guns-table-owned-' + (i+1) + '">' + gunsOwned[i] + '</td>');
		$("#factory-guns-table-tr-" + (i+1)).append('<td id="factory-guns-table-craft-' + (i+1) + '">' + '<a id="factory-guns-btn-' + (i+1) + '" class="btn btn-success btn-sm center-block" onclick="Gun.craft(' + i + ');">Craft</a>' + '</td>');
	};
};
Gun.craft = function(index) {
	if (gunsTrigged[index] !== true && partsOwned[0] > 0 && partsOwned[1] > 0 && partsOwned[2] > 0 && partsOwned[3] > 0) {
		gunsTrigged[index] = true;
		currentTimeGuns[index] = guns[index].time;
	};
};
Gun.update = function(times) {
	for (var i = 0; i < guns.length; i++) {
		if (gunsTrigged[i] == true) {
			if (currentTimeGuns[i] >= 0) {
				currentTimeGuns[i] -= times/fps;
				$("#factory-guns-table-time-" + (i+1)).html(Math.round(currentTimeGuns[i]) + " sec");
				$("#factory-guns-btn-" + (i+1)).attr('disabled', 'disabled');
			} else {
				currentTimeGuns[i] = false;
				gunsTrigged[i] = false;
				gunsOwned[i]++;
				partsOwned[0]--;
				partsOwned[1]--;
				partsOwned[2]--;
				partsOwned[3]--;
				gainMoney(guns[i].reward * prestige[2]);
				Part.check();
				Gun.check();
				$("#factory-guns-table-time-" + (i+1)).html(Math.round(guns[i].time) + " sec");
				$("#factory-guns-btn-" + (i+1)).removeAttr('disabled');
			};
		};
	};
};
Gun.check = function() {
	for (var i = 0; i < guns.length; i++) {
		$("#factory-guns-table-owned-" + (i+1)).html(gunsOwned[i]);
		$("#factory-guns-table-time-" + (i+1)).html(guns[i].time + " sec");
	};
};