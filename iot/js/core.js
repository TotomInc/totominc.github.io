var maxpx = $(document).height(); var marginpx = 120;
$(".container-fluid, .col-md-4, .col-md-8").css('max-height', (maxpx - marginpx) + 'px');
$(".col-md-4, .col-md-8").css('overflow-y', 'auto');

var money; var prestige; var royaltiesOwned;
var init;
var royalties = [
    new Build("Gas Royalties",  5,          2,          1.08),
    new Build("Oil Royalties",  70,         15,         1.08),
    new Build("Gas Well",       450,        130,        1.11),
    new Build("Oil Well",       21000,      1100,       1.09),
    new Build("Oil Sands",      160000,     10000,      1.10),
    new Build("Shale Play",     2200000,    90000,      1.08),
    new Build("Omani Field",    19400000,   850000,     1.08),
    new Build("Saudi Field",    620000000,  7000000,    1.07)
];

function initVars() {
    money = [5, 5];	    // money - total money
    prestige = [0, 0]; 	// exp - exp on reset

    royaltiesOwned = [];
    for (var i = 0; i < royalties.length; i++)
        royaltiesOwned.push(0);

    init = 1;           // 1 = preload - true = loaded
};
function initGame() {
    for (var i = 0; i < royalties.length; i++) {
        var r = royalties[i];
        $("#r-name" + (i+1)).html(r.name);
        $("#r-reward" + (i+1)).html(fix(getReward(i), 2) + "$");
        $("#r-cost1-b" + (i+1)).html("x1 : " + fix(displayPrice(i, 1), 2) + "$<br>");
        $("#r-cost2-b" + (i+1)).html("x10 : " + fix(displayPrice(i, 10), 2) + "$<br>");
        $("#r-cost3-b" + (i+1)).html("x25 : " + fix(displayPrice(i, 25), 2) + "$<br>");
        $("#r-cost4-b" + (i+1)).html("x100 : " + fix(displayPrice(i, 100), 2) + "$<br>");
        $("#r-cost1-b" + (i+1)).attr("onclick", "buyBuilding(" + i + ", 1);");
        $("#r-cost2-b" + (i+1)).attr("onclick", "buyBuilding(" + i + ", 10);");
        $("#r-cost3-b" + (i+1)).attr("onclick", "buyBuilding(" + i + ", 25);");
        $("#r-cost4-b" + (i+1)).attr("onclick", "buyBuilding(" + i + ", 100);");
    };

    $("#h-money").html(fix(money[0], 2) + "$");

    init = true;
};

// utilities
function getPrice(index) {
    return royalties[index].price * Math.pow(royalties[index].inflation, royaltiesOwned[index]);
};
function getReward(index) {
    return royalties[index].reward * royaltiesOwned[index];
};
function gainMoney(amount) {
    money[0] += amount;
    money[1] += amount;
};
function displayPrice(index, amount) {
    var a = amount; var b = royalties[index]; var c = royaltiesOwned[index];
    var tp = 0; var to = a+c;
    while (to > c) {
        a--; to = a+c;
        tp += b.price * Math.pow(b.inflation, to);
    };
    return tp;
};

// methods
function Build(name, price, reward, inflation) {
    this.name = name;
    this.price = price;
    this.reward = reward;
    this.inflation = inflation;
};
function buyBuilding(index, buyAmount) {
    var a = buyAmount;
    if (a > 0) {
        for (var i = 0; i < a; i++) {
            buyBuildingOnce(index);
        };
    } else {
        while (money[0] >= getPrice(index)) {
            buyBuildingOnce(index);
        };
    };
};
function buyBuildingOnce(index) {
    if (money[0] < getPrice(index)) {
        return;
    } else {
        money[0] -= getPrice(index);
        royaltiesOwned[index]++;
    };
};

window.onload = function() {
    initVars();
    initGame();
};