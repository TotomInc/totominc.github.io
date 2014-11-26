ic = {};

ic.version = 0.01;
ic.money = 50;
ic.totalMoney = 0;
ic.icecube = 0;

var flavours = [
    new Flavour("Banana", 10, function() {console.log("0")}),
    new Flavour("Chocolate", 20,  function() {console.log("0")}),
    new Flavour("Grape", 40,  function() {console.log("0")}),
    new Flavour("Orange", 80,  function() {console.log("0")}),
    new Flavour("Strawberry", 160,  function() {console.log("0")}),
    new Flavour("Vanilla", 320,  function() {console.log("0")})
];
ic.flavoursOwned = [];
var addons = [
    new Addon("Peanuts", 20, function() {console.log("0")}),
    new Addon("Sprinkles", 25, function() {console.log("0")}),
    new Addon("Cherries", 30, function() {console.log("0")}),
    new Addon("Jelly Bean", 60, function() {console.log("0")}),
    new Addon("Gummy Sodas", 75, function() {console.log("0")}),
    new Addon("Peanut Butter", 90, function() {console.log("0")})
];
ic.addonsOwned = [];
var builds = [
    new Building("Cart Stand", 50, 1, 1.08),
    new Building("RV Stand", 1000, 5, 1.09)
];
ic.own = [];
var upgrades = [
    new Upgrade("ICC1 Freezer", 300,  function() {console.log("0")}),
    new Upgrade("ICC1 Freezer v2", 5000,  function() {console.log("0")}),
    new Upgrade("Iron Cookware", 1500,  function() {console.log("0")}),
    new Upgrade("Steel Cookware", 7500,  function() {console.log("0")})
];
ic.upOwned = [];

// Saving system
function saveData() {
    localStorage.setItem('ic', JSON.stringify(ic));
};
function loadData() {
    var permIc = localStorage.getItem('ic');
    ic = JSON.parse(permIc);
};
function resetData() {
    localStorage.removeItem('ic');
    location.reload();
};

// Methods
function Flavour(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};
function Addon(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};
function Building(name, price, reward, inflation) {
    this.name = name;
    this.price = price;
    this.reward = reward;
    this.inflation = inflation;
};
function Upgrade(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};

// Onload + loop
window.onload = function() {
    $("#s-money").html("Money : " + fix(ic.money, 2) + "$");
    $("#s-icecube").html("Ice Cubes : " + fix(ic.icecube, 2));

    for (var i = 0; i < flavours.length; i++) {
        var f = flavours[i];
        ic.flavoursOwned.push(false);
        $("#i" + i).attr('src', "css/flavours/f" + i + ".png");
        $("#f-n" + (i+1)).html(f.name + " :: ");
        $("#f-c" + (i+1)).html(fix(f.price, 2) + "$");
    };

    for (var i = 0; i < addons.length; i++) {
        var a = addons[i];
        ic.addonsOwned.push(false);
        $("#a-n" + (i+1)).html(a.name + " :: ");
        $("#a-c" + (i+1)).html(fix(a.price, 2) + "$");
    };

    for (var i = 0; i < builds.length; i++) {
        var b = builds[i];
        ic.own.push(0);
        $("#b-n" + (i+1)).html(b.name + " :: ");
        $("#b-c" + (i+1)).html(b.price + "$ (");
        $("#b-o" + (i+1)).html(ic.own[i] + " owned)");
    };

    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        ic.upOwned.push(false);
        $("#u-n" + (i+1)).html(u.name + " :: ");
        $("#u-c" + (i+1)).html(fix(u.price, 2) + "$");
    };
};