var money;
var totalMoney;
var tokens;
var tokensOn;
var tokensRate;

var t1 = [
    new Building("Build 1", 4,      1,      1.08),
    new Building("Build 2", 70,     60,     1.16)
];
var t1owned = [];

// Essentials functions
function initVars() {
    money = 1000; totalMoney = money;
    tokens = 0; tokensOn = 0; tokensRate = 1;

    for (var i = 0; i < t1.length; i++) { t1owned.push(0); };
};
function initGame() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-totalMoney").html("Total money : " + fix(totalMoney, 2) + "$");
    $("#s-tokens").html("Tokens : " + fix(tokens, 0));
    $("#s-tokensRate").html("Tokens Rate : " + fix(tokensRate, 1) + "%");

    for (var i = 0; i < t1.length; i++) {
        var t = t1[i];
        $("#t1-n" + (i+1)).html(t.name + " : ");
        $("#t1-r" + (i+1)).html(fix(getInc(i), 2) + "$ ");
        $("#t1-o" + (i+1)).html("(" + t1owned[i] + " owned)");

        $("#t1-b" + (i+1) + "c1").html("x1 : " + fix(getPrice(i), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c1").attr('onclick', 'buyBuilding(' + i + ', 1)');
        $("#t1-b" + (i+1) + "c2").html("x10 : " + fix(displayPrice(i, 10), 2) + "$");
        $("#t1-b" + (i+1) + "c2").attr('onclick', 'buyBuilding(' + i + ', 10)');
    };
};

// Helpers
function getInc(source) {
    return t1[source].reward;
};
function getPrice(index) {
    var t = t1[index];
    return t.price * Math.pow(t.inflation, t1owned[index]);
};
function displayPrice(index, amount) {
    var a = amount; var t = t1[index];
    var totalPrice = 0; var totalOwn = a + t1owned[index];
    while (totalOwn > t1owned[index]) {
        a--; totalOwn = a + t1owned[index];
        totalPrice += t.price * Math.pow(t.inflation, totalOwn);
    };
    console.log("final price : " + totalPrice);
    return totalPrice;
};
function updateBuilds() {
    for (var i = 0; i < t1.length; i++) {
        var t = t1[i];
        $("#t1-n" + (i+1)).html(t.name + " : ");
        $("#t1-r" + (i+1)).html(fix(getInc(i), 2) + "$ ");
        $("#t1-o" + (i+1)).html("(" + t1owned[i] + " owned)");
        $("#t1-b" + (i+1) + "c1").html("x1 : " + fix(getPrice(i), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c2").html("x10 : " + fix(displayPrice(i, 10), 2) + "$");
    };
    $("#s-money").html("Money : " + fix(money, 2) + "$");
};

// Methods
function Building(name, price, reward, inflation) {
    this.name = name;
    this.price = price;
    this.reward = reward;
    this.inflation = inflation;
};
function buyBuilding(index, buyAmount) {
    var amount = buyAmount;
    if (amount > 0) { for (var i = 0; i < amount; i++) { buyBuildingOnce(index); }; }
    else { while (money >= getPrice(index)) { buyBuildingOnce(index); }; };
    updateBuilds();
};
function buyBuildingOnce(index) {
    if (money < getPrice(index)) { return; }
    else { money -= getPrice(index); t1owned[index]++; };
};

// Onload + loops
window.onload = function() {
    initVars();
    initGame();
};