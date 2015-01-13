var money; var shoot; var prestige;
var dStock; var dName; var dPrice; var dSoldPS;
var dInit = [
    new Drug("Weed", 1),
    new Drug("Meth", 3),
    new Drug("Cocaine", 6)
];
var upgradesOwned;
var upgrades = [
    new Upgrade("Shoot reward x3", 12, function() { ammo[1] *= 3 }), // *7
    new Upgrade("Shoot reward x3", 60, function() { ammo[1] *= 3 }),
    new Upgrade("Shoot reward x2.5", 420, function() { ammo[1] *= 2.5 }),
    new Upgrade("Shoot reward x2.5", 2940, function() { ammo[1] *= 2.5 }),

    new Upgrade("Shoot time /1.5", 90, function() { ammo[2] /= 1.5 }), // *7
    new Upgrade("Shoot time /1.5", 630, function() { ammo[2] /= 1.5 }),
    new Upgrade("Shoot time /1.25", 4410, function() { ammo[2] /= 1.25 }),

    new Upgrade("Ammo stock x3", 90, function() { ammo[4] *= 3 }), // *15
    new Upgrade("Ammo stock x3", 1350, function() { ammo[4] *= 3 }),

    new Upgrade("Reload time /1.5", 270, function() { ammo[3] /= 1.5 }), // *7
    new Upgrade("Reload time /1.5", 1890, function() { ammo[3] /= 1.5 }),
    new Upgrade("Reload time /1.25", 13230, function() { ammo[3] /= 1.25 }),

    new Upgrade("Weed price x1.5", 600, function() {weed[1] *= 1.5 }), // *3
    new Upgrade("Weed price x1.5", 1800, function() {weed[1] *= 1.5 }),
    new Upgrade("Weed price x3", 5400, function() {weed[1] *= 3 }),
    new Upgrade("Meth price x1.5", 1400, function() {meth[1] *= 1.5 }),
    new Upgrade("Meth price x1.5", 4200, function() {meth[1] *= 1.5 }),
    new Upgrade("Meth price x3", 12600, function() {meth[1] *= 3 })
];
var init; var fps = 60; var interval = (1000 / fps); var key = "BM-INC_";
var allVars = ["money", "shoot", "prestige", "dStock", "dName", "dPrice", "dSoldPS", "upgradesOwned"];

// game display
function initVars() {
    money = [0, 0];
    shoot = [12, 1, 12, 1500, 5000];
    prestige = [];

    dStock = []; dName = []; dPrice = []; dSoldPS = [];
    for (var i = 0; i < dInit.length; i++) {
        dStock.push(0);
        dSoldPS.push(.5);
        dName.push(dInit[i].name);
        dPrice.push(dInit[i].price);
    };

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++) {
        upgradesOwned.push(false);
    };
};
function initGame() {
    for (var i = 0; i < dInit.length; i++) {
        var d = dInit[i];
        $("#h-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g");
    };

    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-n" + (i+1)).html(u.name + " : ");
        $("#u-c" + (i+1)).html(fix(u.price, 2) + "$");
        if (upgradesOwned[i]) {
            $("#u-" + (i+1)).css("display", "none");
        };
    };

    $("#h-money").html("Money : " + fix(money[0], 2) + "$");
    $("#s-money").html("Money : " + fix(money[0], 2) + "$<br>");
    $("#s-totalmoney").html("Total money : " + fix(money[1], 2) + "$<br>");
    $("#h-ammo, #s-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2]);

    $("#a-n1").html("Shoot : +" + fix(shoot[1], 2) + "$");
    $("#a-d1").html(fix(shoot[3]/1000, 1) + " sec/shoot");
    $("#a-n2").html("Reload : +" + fix(shoot[2], 0) + " ammo");
    $("#a-d2").html(fix(shoot[4]/1000, 1) + " sec");

    $("#f-1, #f-2").css("width", 0 + "%");
    $("#p-1").attr("onclick", "shootAction();");
    $("#p-2").attr("onclick", "reloadAction();");
};
function displayGame() {
    for (var i = 0; i < dInit.length; i++) {
        var d = dInit[i];
        $("#h-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g");
        $("#s-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g<br>");
    };

    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        if (money[0] < u.price) {
            $("#u-" + (i+1)).attr("class", "list-group-item disabled");
        } else {
            $("#u-" + (i+1)).attr("class", "list-group-item");
        };
    };

    $("#h-money").html("Money : " + fix(money[0], 2) + "$");
    $("#s-money").html("Money : " + fix(money[0], 2) + "$<br>");
    $("#s-totalmoney").html("Total money : " + fix(money[1], 2) + "$<br>");
    $("#h-ammo, #s-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2]);
};

// helpers functions
function gainMoney(source) {
    money[0] += source;
    money[1] += source;
};
function progressCheck() {
    if (shoot[3] <= 100) {
        $("#f-1").attr("class", "progress-bar progress-bar-success progress-bar-striped active");
    } else {
        $("#f-1").attr("class", "progress-bar progress-bar-success active");
    };
};

// basic functions
function shootAction() {
    if (shoot[0] > 0) {
        shoot[0] -= 1;
        $("#p-1, #p-2").attr("onclick", "");
        window.setTimeout(function() {
            gainMoney(shoot[1]);
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
        }, shoot[3]);
        $("#f-1").animate({width: "100%"}, shoot[3], "linear");
        $("#f-1").animate({width: "0%"}, 0, "linear");
    };
};
function reloadAction() {
    if (shoot[0] < shoot[2]) {
        $("#p-1, #p-2").attr("onclick", "");
        window.setTimeout(function() {
            shoot[0] = shoot[2];
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
        }, shoot[4]);
        $("#f-2").animate({width: "100%"}, shoot[4], "linear");
        $("#f-2").animate({width: "0%"}, 0, "linear");
    };
};

// methods
function Drug(name, price) {
    this.name = name;
    this.price = price;
};
function Upgrade(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};

// loading + interval
window.onload = function() {
    initVars();
    loadData();
    initGame();
};
window.setInterval(function() {
    displayGame();
    progressCheck();
}, interval);