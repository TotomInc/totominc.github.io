var weedBuildsOwned;
var weedBuilds = [
    new Build("Build 1",	500,            0.1,    1.60, 0),
    new Build("Build 2",	50000,          0.5,    1.50, 0),
    new Build("Build 3",	1000000,        1.5,   	1.40, 0),
    new Build("Build 4",	250000000,		4.0,    1.30, 0)
];

function Build(name, price, reward, inflation, jsType) {
	this.name = name;
	this.price = price;
	this.reward = reward;
	this.inflation = inflation;
	this.jsType = jsType;
};
Build.init = function() {
	weedBuildsOwned = [];
	for (var i = 0; i < weedBuilds.length; i++) {
		var w = weedBuilds[i];
		weedBuildsOwned.push(0);
		$("#builds-weed").append('<li id="builds-weed-' + (i+1) + '" class="list-group-item cur-p"><b>' + w.name + '</b> cost : ' + fix(getBuildPrice(i, 0)) + '$<br>Produce ' + fix(getDrugProduction(i, 0)) + "g/sec of <b>weed</b>");
		$("#builds-weed-" + (i+1)).attr("onclick", 'Build.buy(' + i + ', 0);');
		$("#builds-weed-" + (i+1)).append('<span id="builds-weed-owned-' + (i+1) + '" class="badge">' + weedBuildsOwned[i] + ' owned</span>');
	};
};
Build.check = function() {
	for (var i = 0; i < weedBuilds.length; i++) {
		var w = weedBuilds[i];
		$("#builds-weed-" + (i+1)).html('<b>' + w.name + '</b> cost : ' + fix(getBuildPrice(i, 0)) + '$<br>Produce ' + fix(getDrugProduction(i, 0)) + "g/sec of <b>weed</b>");
		$("#builds-weed-" + (i+1)).append('<span id="builds-weed-owned-' + (i+1) + '" class="badge">' + weedBuildsOwned[i] + ' owned</span>');
	};
};
Build.buy = function(index, jsType) {
	if (jsType == 0 && money[0] >= getBuildPrice(index, 0)) {
		money[0] -= getBuildPrice(index, 0);
		weedBuildsOwned[index]++;
	};
	Build.check();
};
Build.earn = function(times) {
	drugPerSec[0] = (getDrugIncome(0, 0) + getDrugIncome(1, 0) + getDrugIncome(2, 0) + getDrugIncome(3, 0)) - (getDealerSelling(0, 0) + getDealerSelling(1, 0) + getDealerSelling(2, 0) + getDealerSelling(3, 0));
	for (var i = 0; i < weedBuilds.length; i++) {
		var w = weedBuilds[i];
		drugStock[0] += (getDrugIncome(i, 0) * times) / fps;
	};
};