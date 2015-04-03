var weedDealersOwned;
var weedDealers = [
    new Dealer("Dealer 1",		500,                0.05,   1.30,	0),
    new Dealer("Dealer 2",		50000,              0.4,    1.25,	0),
    new Dealer("Dealer 3",		1000000,            1,      1.20,	0),
    new Dealer("Dealer 4",		250000000,          3,      1.15,	0),
];

function Dealer(name, price, sell, inflation, jsType) {
	this.name = name;
	this.price = price;
	this.sell = sell;
	this.inflation = inflation;
	this.jsType = jsType;
};
Dealer.init = function() {
	weedDealersOwned = [];
	for (var i = 0; i < weedDealers.length; i++) {
		var w = weedDealers[i];
		weedDealersOwned.push(0);
		$("#dealers-weed").append('<li id="dealers-weed-' + (i+1) + '" class="list-group-item cur-p"><b>' + w.name + '</b> cost : ' + fix(getDealerPrice(i, 0)) + '$<br>Sell ' + fix(getDealerSell(i, 0)) + 'g/sec of <b>weed</b>');
		$("#dealers-weed-" + (i+1)).attr("onclick", 'Dealer.buy(' + i + ', 0);');
		$("#dealers-weed-" + (i+1)).append('<span id="dealers-weed-owned-' + (i+1) + '" class="badge">' + weedDealersOwned[i] + ' owned</span>');
	};
};
Dealer.check = function() {
	for (var i = 0; i < weedDealers.length; i++) {
		var w = weedDealers[i];
		$("#dealers-weed-" + (i+1)).html('<b>' + w.name + '</b> cost : ' + fix(getDealerPrice(i, 0)) + '$<br>Sell ' + fix(getDealerSell(i, 0)) + 'g/sec of <b>weed</b>');
		$("#dealers-weed-" + (i+1)).append('<span id="dealers-weed-owned-' + (i+1) + '" class="badge">' + weedDealersOwned[i] + ' owned</span>');
	};
};
Dealer.buy = function(index, jsType) {
	if (jsType == 0 && money[0] >= getDealerPrice(index, 0)) {
		money[0] -= getDealerPrice(index, 0);
		weedDealersOwned[index]++;
	};
	Dealer.check();
};
Dealer.sell = function() {
	moneyPerSec[0] = (getDealerSelling(0, 0) + getDealerSelling(1, 0) + getDealerSelling(2, 0) + getDealerSelling(3, 0)) * drugPrice[0];
	for (var i = 0; i < weedDealers.length; i++) {
		var w = weedDealers[i];
		if (drugStock[0] >= 1) {
			drugStock[0] -= getDealerSelling(i, 0) / fps;
			gainMoney((getDealerSelling(i, 0) * drugPrice[0]) / fps);
		};
	};
};