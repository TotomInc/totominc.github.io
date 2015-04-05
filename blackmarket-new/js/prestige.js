var prestigeRanks = [
    new PrestigeRank("Bronze",                  0,  25,         2.00),
    new PrestigeRank("Bronze Elite",            1,  100,        4.00),
    new PrestigeRank("Bronze Master",           2,  400,        6.00),
    new PrestigeRank("Bronze Guardian",         3,  1000,       8.00),
    new PrestigeRank("Silver",                  4,  2500,       20.00),
    new PrestigeRank("Silver Elite",            5,  10000,      30.00),
    new PrestigeRank("Silver Master",           6,  50000,      40.00),
    new PrestigeRank("Silver Guardian",         7,  100000,     50.00),
    new PrestigeRank("Platinum",                8,  500000,     100.00),
    new PrestigeRank("Platinum Elite",          9,  1000000,    150.00),
    new PrestigeRank("Platinum Master",         10, 2000000,    200.00),
    new PrestigeRank("Platinum Guardian",       11, 5000000,    250.00),
    new PrestigeRank("Legendary Dealer",        12, 10000000,   400.00),
    new PrestigeRank("Legendary Eagle Dealer",  13, 50000000,   500.00)
];

function PrestigeRank(name, index, needed, multiplier) {
    this.name = name;
    this.index = index;
    this.needed = needed;
    this.multiplier = multiplier;
};
PrestigeRank.rankup = function() {
	for (var i = 0; i < prestigeRanks.length; i++) {
		var p = prestigeRanks[i];
		if (prestige[0] >= p.needed) {
			prestige[3] = p.name;
			prestige[2] = p.multiplier;
		};
	};
};
PrestigeRank.fillTable = function() {
	for (var i = 0; i < prestigeRanks.length; i++) {
		var p = prestigeRanks[i];
		$("#prestige-table").append('<tr id="tr-' + i + '"></tr>');
		$("#tr-" + i).append('<td id="td-rank-' + i + '"></td>');
		$("#tr-" + i).append('<td id="td-exp-' + i + '"></td>');
		$("#tr-" + i).append('<td id="td-multiplier-' + i + '"></td>');
		$("#td-rank-" + i).html(p.name);
		$("#td-exp-" + i).html(fix(p.needed) + " exp.");
		$("#td-multiplier-" + i).html("x" + fix(p.multiplier));
		if (isOdd(i) == 1) {
			$("#tr-" + i).attr("class", "success");
		};
	};
};