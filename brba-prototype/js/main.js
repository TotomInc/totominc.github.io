$("[data-toggle=tooltip]").tooltip(); // Bootstrap tooltip init
$("[data-toggle=popover]").popover(); // Bootstrap popover init

var money = 100;
var owned = [];
var dealersOwned = [];
var progress = [];

var stock = [0, 0, 0, 0]; // meth - weed - heroine - crack
var stockPrice = [2, 5, 20, 100]; // price/g
var maxStockPrice = [5, 10, 50, 250]; // max stock price
var minStockPrice = [1, 2, 10, 50]; // min stock price

var buildings = [
    new Build("Weed plant", 15, 0.30, 1.08, 0),
    new Build("Abandoned van", 350, 0.30, 1.08, 1)
];
var dealers = [
    new Dealer("Heisenberg", 100, 1, 0, "weed")
];
var fps = 60;
var interval = (1000/fps);
var init = false;

// Methods
function Build(name, cost, reward, inflation, type) {
    this.name = name;
    this.cost = cost;
    this.reward = reward;
    this.inflation = inflation;
    this.type = type;
};
function buyBuild(index) {
    var p = getPrice(index);
    if (money >= p) {
        money -= p;
        owned[index-1]++;
    };
    var np = getPrice(index);
    $("#m-c" + index).html(" : cost " + fix(np, 2) + "$ - ");
    $("#m-o" + index).html(owned[index-1] + " owned");
};

function Dealer(name, cost, quantity, type, type2) {
    this.name = name;
    this.cost = cost;
    this.quantity = quantity;
    this.type = type;
    this.type2 = type2;
};
function buyDealer(index) {
    var p = dealers[index-1].cost;
    if (money >= p) {
        money -= p;
    };
};

// Change g. price
function marketPrice() {
    for (var i = 0; i < stockPrice.length; i++) {
        var s = stockPrice[i];
        stockPrice[i] = Math.floor((Math.random() * maxStockPrice[i]) + minStockPrice[i]);
    };
};

// Utilities
function getPrice(index) {
    return buildings[index-1].cost * Math.pow(buildings[index-1].inflation, owned[index-1]);
};
function checkReward(index) { // todo : find a better method to get reward
    if (owned[index] >= 0 && buildings[index].type == 0) {
        stock[0] += buildings[index].reward * owned[index];
    };
    if (owned[index] >= 0 && buildings[index].type == 1) {
        stock[1] += buildings[index].reward * owned[index];
    };
    if (owned[index] >= 0 && buildings[index].type == 2) {
        stock[2] += buildings[index].reward * owned[index];
    };
    if (owned[index] >= 0 && buildings[index].type == 3) {
        stock[3] += buildings[index].reward * owned[index];
    };
};

// Loops
window.setInterval(function() {
    if (init == true) {
        for (var i = 0; i < progress.length; i++) {
            if (progress[i] >= 1) { progress[i] = 0; checkReward(i); } else { progress[i] += 0.017};
        };

        $("#s-m").html("Money : " + fix(money, 2) + "$");
        $("#s-1").html("Meth : " + fix(stock[0], 2) + "g (" + fix(stockPrice[0], 2) + "$/g)");
        $("#s-2").html("Weed : " + fix(stock[1], 2) + "g (" + fix(stockPrice[1], 2) + "$/g)");
        $("#s-3").html("Heroine : " + fix(stock[2], 2) + "g (" + fix(stockPrice[2], 2) + "$/g)");
        $("#s-4").html("Crack : " + fix(stock[3], 2) + "g (" + fix(stockPrice[3], 2) + "$/g)");
    };
}, interval);
window.setInterval(function() {
    marketPrice();
}, 60000);
window.onload = function() {
    $("#s-m").html("Money : " + fix(money, 2) + "$");
    $("#s-1").html("Meth : " + fix(stock[0], 2) + "g");
    $("#s-2").html("Weed : " + fix(stock[1], 2) + "g");
    $("#s-3").html("Heroine : " + fix(stock[2], 2) + "g");
    $("#s-4").html("Crack : " + fix(stock[3], 2) + "g");

    for (var i = 0; i < buildings.length; i++) {
        var b = buildings[i];
        owned.push(0);
        progress.push(0);
        $("#m-n" + (i+1)).html(b.name);
        $("#m-c" + (i+1)).html(" : cost " + fix(b.cost, 2) + "$ - ");
        $("#m-o" + (i+1)).html(owned[i] + " owned");
    };

    for (var i = 0; i < dealers.length; i++) {
        var d = dealers[i];
        dealersOwned.push(false);
        $("#d-n" + (i+1)).html(d.name);
        $("#d-c" + (i+1)).html(" : cost " + fix(d.cost, 2) + "$ - ");
        $("#d-q" + (i+1)).html("sell " + fix(d.quantity, 2) + "g of " + d.type2);
    };

    init = true;
};