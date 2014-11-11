$("[data-toggle=tooltip]").tooltip(); // Bootstrap tooltip init
$("[data-toggle=popover]").popover(); // Bootstrap popover init

var money = 10000;
var progress = [];
var owned = [];

var stock = [100, 100, 100, 100]; // meth - weed - heroine - crack
var stockPrice = [2, 5, 20, 100]; // price/g
var maxStockPrice = [5, 10, 50, 250]; // max stock price
var minStockPrice = [1, 2, 10, 50]; // min stock price

var dealersOwned = []; // needed for achievements & upgrades (true/false)
var dealersQte = [0, 0, 0, 0]; // total quantity per drug [meth, weed, heroine, crack]

var buildings = [
    new Build("Weed plant", 15, 0.30, 1.08, 0),
    new Build("Abandoned van", 350, 0.30, 1.08, 1)
];
var dealers = [
    new Dealer("Meth Dealer #1", 100,   1, 0, "meth"),
    new Dealer("Meth Dealer #2", 200,   3, 0, "meth"),
    new Dealer("Weed Dealer #1", 800,   1, 1, "weed"),
    new Dealer("Weed Dealer #2", 2500,  3, 1, "weed")
];
var fps = 60;
var interval = (1000/fps);
var init = false;

// Methods
function Build(name, cost, reward, inflation, type) {
    this.name = name; // build name
    this.cost = cost; // build price
    this.reward = reward; // build reward
    this.inflation = inflation; // build inflation price
    this.type = type; // build drug type for stock[] (meth - weed - heroine - crack)
};
function buyBuild(index) {
    var p = getPrice(index);
    if (money >= p) { money -= p; owned[index-1]++; };
    var np = getPrice(index);
    $("#m-c" + index).html(" : cost " + fix(np, 2) + "$ - ");
    $("#m-o" + index).html(owned[index-1] + " owned");
};

function Dealer(name, cost, quantity, type, type2) {
    this.name = name; // dealer name
    this.cost = cost; // dealer price
    this.quantity = quantity; // for dealersQte[]
    this.type = type; // for stock[] (meth - weed - heroine - crack)
    this.type2 = type2; // display name of drug
};
function buyDealer(index) {
    d = dealers[index-1]
    if (money >= d.cost) {
        dealersOwned[index-1] = true;
        dealersQte[d.type] += d.quantity;
        $("#d-" + index).css('display', 'none');
    };
};

// Change g. price
function marketPrice() {
    for (var i = 0; i < stockPrice.length; i++) {
        stockPrice[i] = Math.floor((Math.random() * maxStockPrice[i]) + minStockPrice[i]);
    };
};

// Utilities
function getPrice(index) {
    return buildings[index-1].cost * Math.pow(buildings[index-1].inflation, owned[index-1]);
};
function checkReward(index) {
    for (var i = 0; i < stock.length; i++) {
        if (owned[i] >= 0 && buildings[i].type == i) {
            stock[i] += buildings[i].reward * owned[i];
        };
    };
};
function sellingDrug() {
    for (var i = 0; i < stock.length; i++) {
        if (stock[i] >= dealersQte[i]) {
            stock[i] -= dealersQte[i];
            money += dealersQte[i] * stockPrice[i];
        };
    };
};

// Loops
window.setInterval(function() { // display update interval
    if (init == true) {
        $("#s-m").html("Money : " + fix(money, 2) + "$");
        $("#s-1").html("Meth : " + fix(stock[0], 2) + "g (" + fix(stockPrice[0], 2) + "$/g) || (" + fix((buildings[0].reward * owned[0] - dealersQte[0]), 2) + "g/sec)");
        $("#s-2").html("Weed : " + fix(stock[1], 2) + "g (" + fix(stockPrice[1], 2) + "$/g)");
        $("#s-3").html("Heroine : " + fix(stock[2], 2) + "g (" + fix(stockPrice[2], 2) + "$/g)");
        $("#s-4").html("Crack : " + fix(stock[3], 2) + "g (" + fix(stockPrice[3], 2) + "$/g)");
    };
}, interval);
window.setInterval(function() { // function interval
    checkReward(); sellingDrug();
}, 1000);
window.setInterval(function() { // market price interval (60s)
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