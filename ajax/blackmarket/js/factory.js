var partsOwned = [];
var partsTrigged = [];
var currentTimeParts = [];
var partsTimeMultiplier = [];
var parts = [
	new Part("Magazine",	0,	25),
	new Part("Trigger",		0,	10),
	new Part("Barrel",		0,	15),
	new Part("Grip",		0,	30)
];

var gunsOwned = [];
var gunsTrigged = [];
var currentTimeGuns = [];
var gunsTimeMultiplier = [];
var guns = [
	new Gun("AK-47",		1,	120,	0.007),
	new Gun("M4A4",			1,	90,		0.012),
	new Gun("USP-S",		1,	45,		0.09),
	new Gun("Glock-18",		1,	60,		0.07)
];

var autocraft = false;

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
				if (enableAutoCraft.checked == true) {
					$("#factory-parts-btn-" + (i+1)).attr('disabled', 'disabled');
				} else {
					$("#factory-parts-btn-" + (i+1)).removeAttr('disabled');
				};
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
Part.autocraft = function() {
	if (enableAutoCraft.checked == true) {
		enableAutoCraftCheck = true;
		for (var i = 0; i < parts.length; i++) {
			$("#factory-parts-btn-" + (i+1)).attr('onclick', '');
			if (currentTimeParts[i] == false && partsTrigged[i] !== true) {
				partsTrigged[i] = true;
				currentTimeParts[i] = parts[i].time;
				setTimeout(Part.autocraft, (parts[i].time * 1000 + 250));
			};
		};
	} else {
		enableAutoCraftCheck = false;
		for (var i = 0; i < parts.length; i++) {
			$("#factory-parts-btn-" + (i+1)).attr('onclick', 'Part.craft(' + i + ');');
		};
	}
};

function Gun(name, reward, time, multiplier) {
	this.name = name;
	this.reward = reward;
	this.time = time;
	this.multiplier = multiplier;
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
		partsOwned[0]--;
		partsOwned[1]--;
		partsOwned[2]--;
		partsOwned[3]--;
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
				Part.check();
				Gun.check();
				if (enableAutoCraft2.checked == true) {
					$("#factory-guns-btn-" + (i+1)).attr('disabled', 'disabled');
				} else {
					$("#factory-guns-btn-" + (i+1)).removeAttr('disabled');
				};
				$("#factory-guns-table-time-" + (i+1)).html(Math.round(guns[i].time) + " sec");
			};
		};
	};
};
Gun.check = function() {
	for (var i = 0; i < guns.length; i++) {
		$("#factory-guns-table-owned-" + (i+1)).html(gunsOwned[i]);
		$("#factory-guns-table-time-" + (i+1)).html(guns[i].time + " sec");
		$("#market-guns-table-owned-" + (i+1)).html(gunsOwned[i]);
	};
};
Gun.sell = function(index) {
	if (gunsOwned[index] > 0) {
		gunsOwned[index]--;
		gainMoney(getGunReward(index));
		Gun.check();
		Market.check();
	};
};
Gun.autocraft = function() {
	if (enableAutoCraft2.checked == true) {
		enableAutoCraftCheck2 = true;
		for (var i = 0; i < guns.length; i++) {
			$("#factory-guns-btn-" + (i+1)).attr('onclick', '');
			if (currentTimeGuns[i] == false && gunsTrigged[i] !== true && partsOwned[0] > 0 && partsOwned[1] > 0 && partsOwned[2] > 0 && partsOwned[3] > 0) {
				gunsTrigged[i] = true;
				currentTimeGuns[i] = guns[i].time;
				partsOwned[0]--;
				partsOwned[1]--;
				partsOwned[2]--;
				partsOwned[3]--;
				setTimeout(Gun.autocraft, (guns[i].time * 1000 + 250));
			};
		};
	} else {
		enableAutoCraftCheck2 = false;
		for (var i = 0; i < guns.length; i++) {
			$("#factory-guns-btn-" + (i+1)).attr('onclick', 'Gun.craft(' + i + ');');
		};
	};
};

function Market() { Log("This is needed"); };
Market.init = function() {
	for (var i = 0; i < guns.length; i++) {
		$("#market-guns-table").append('<tr id="market-guns-table-tr-' + (i+1) + '"></tr>');
		$("#market-guns-table-tr-" + (i+1)).append('<td id="market-guns-table-name-' + (i+1) + '">' + guns[i].name + '</td>');
		$("#market-guns-table-tr-" + (i+1)).append('<td id="market-guns-table-reward-' + (i+1) + '">' + fix(getGunReward(i), 'money') + '$</td>');
		$("#market-guns-table-tr-" + (i+1)).append('<td id="market-guns-table-owned-' + (i+1) + '">' + gunsOwned[i] + '</td>');
		$("#market-guns-table-tr-" + (i+1)).append('<td id="market-guns-table-sell-' + (i+1) + '">' + '<a class="btn btn-success btn-sm center-block" onclick="Gun.sell(' + i + ');">Sell</a>' + '</td>');
	};
};
Market.check = function() {
	for (var i = 0; i < guns.length; i++) {
		$("#market-guns-table-reward-" + (i+1)).html(fix(getGunReward(i), 'money') + '$');
		$("#factory-guns-table-owned-" + (i+1)).html(gunsOwned[i]);
		$("#market-guns-table-owned-" + (i+1)).html(gunsOwned[i]);
	};
};