var money; var shoot; var prestige; var currentGun;
var dStock; var dName; var dPrice;
var dInit = [
    new Drug("Weed", 1),
    new Drug("Meth", 3),
    new Drug("Cocaine", 6)
];
var upgradesOwned;
var upgrades = [
    new Upgrade("Shoot reward x3", 12, function() { shoot[1] *= 3 }), // *7
    new Upgrade("Shoot reward x3", 60, function() { shoot[1] *= 3 }),
    new Upgrade("Shoot reward x2.5", 420, function() { shoot[1] *= 2.5 }),
    new Upgrade("Shoot reward x2.5", 2940, function() { shoot[1] *= 2.5 }),

    new Upgrade("Shoot time /1.5", 90, function() { shoot[3] /= 1.5 }), // *7
    new Upgrade("Shoot time /1.5", 630, function() { shoot[3] /= 1.5 }),
    new Upgrade("Shoot time /1.25", 4410, function() { shoot[3] /= 1.25 }),

    new Upgrade("Ammo stock x3", 90, function() { shoot[2] *= 3 }), // *15
    new Upgrade("Ammo stock x3", 1350, function() { shoot[2] *= 3 }),

    new Upgrade("Reload time /1.5", 270, function() { shoot[4] /= 1.5 }), // *7
    new Upgrade("Reload time /1.5", 1890, function() { shoot[4] /= 1.5 }),
    new Upgrade("Reload time /1.25", 13230, function() { shoot[4] /= 1.25 }),

    new Upgrade("Weed price x1.5", 600, function() {dSoldPS[0] *= 1.5 }), // *3
    new Upgrade("Weed price x1.5", 1800, function() {dSoldPS[0] *= 1.5 }),
    new Upgrade("Weed price x3", 5400, function() {dSoldPS[0] *= 3 }),
    new Upgrade("Meth price x1.5", 1400, function() {dSoldPS[1] *= 1.5 }),
    new Upgrade("Meth price x1.5", 4200, function() {dSoldPS[1] *= 1.5 }),
    new Upgrade("Meth price x3", 12600, function() {dSoldPS[1] *= 3 })
];
var init; var fps = 60; var interval = (1000 / fps); var key = "BM-INC_";
var allVars = ["money", "shoot", "prestige", "currentGun", "dStock", "dName", "dPrice", "dSoldPS", "currentGun", "upgradesOwned"];

// game display
function initVars() {
    money = [0, 0];
    shoot = [12, 1, 12, 1500, 5000];
    prestige = [];
    currentGun = "Glock-18";

    dStock = []; dName = []; dPrice = []; dSoldPS = [];
    for (var i = 0; i < dInit.length; i++) {
        dStock.push(0);
        dName.push(dInit[i].name);
        dPrice.push(dInit[i].price);
    };

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++) {
        upgradesOwned.push(false);
    };

    init = true;
};
function initGame() {
    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-" + (i+1)).attr("onclick", "buyUpgrade(" + (i+1) + ");");
        $("#u-n" + (i+1)).html(u.name + " : ");
        $("#u-c" + (i+1)).html(fix(u.price, 2) + "$");
        if (upgradesOwned[i]) {
            $("#u-b" + (i+1)).html("Bought");
            $("#u-" + (i+1)).attr("onclick", "");
        };
    };

    $("#f-1, #f-2").css("width", 0 + "%");
    $("#p-1").attr("onclick", "shootAction();");
    $("#p-2").attr("onclick", "reloadAction();");
};
function displayGame() {
    if (init == true) {
        for (var i = 0; i < dInit.length; i++) { // drug stock display
            var d = dInit[i];
            $("#h-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g");
            $("#s-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g<br>");
            $("#s-dp" + (i+1)).html("<small>" + d.name + " price : " + fix(dPrice[i], 2) + "$/g</small><br>");
        };

        for (var i = 0; i < upgrades.length; i++) { // if upgrade is available
            var u = upgrades[i];
            if (money[0] < u.price || upgradesOwned[i] == true) {
                $("#u-" + (i+1)).attr("class", "list-group-item disabled");
            } else {
                $("#u-" + (i+1)).attr("class", "list-group-item");
            };
        };

        if (shoot[0] < 1) { // hint on reload if needed
            $("#f-1").attr("class", "progress-bar progress-bar-danger progress-bar-striped active");
            $("#f-1").css("width", "100%");
        };
        // basic stats display
        $("#h-money").html("Money : " + fix(money[0], 2) + "$");
        $("#s-money").html("Money : " + fix(money[0], 2) + "$<br>");
        $("#s-totalmoney").html("Total money : " + fix(money[1], 2) + "$<br>");
        $("#h-ammo, #s-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2]);

        $("#a-n1").html("Shoot : +" + fix(shoot[1], 2) + "$");
        $("#a-d1").html(fix(shoot[3]/1000, 1) + " sec/shoot");
        $("#a-n2").html("Reload : +" + fix(shoot[2], 0) + " ammo");
        $("#a-d2").html(fix(shoot[4]/1000, 1) + " sec");
        // rank up the gun display
        gunRankUp();
        $("#s-cg").html("Current gun : " + currentGun + "<br>");
        $("#s-ob").html("Overall bonus : x1.00");
    };
};

// helpers functions
function gainMoney(source) {
    money[0] += source;
    money[1] += source;
};
function getPrice(index) {
    return builds[index].price * Math.pow(builds[index].inflation, buildsOwned[index]);
};
function gunRankUp() {
    if (shoot[2] == 36) {
        currentGun = "CZ75-Auto";
    };
    if (shoot[2] == 108) {
        currentGun = "Dual Berettas";
    };
    if (money[1] >= 10000) {
        currentGun = "UMP-45";
    };
    if (money[1] >= 50000) {
        currentGun = "P90";
    };
};

// basic functions
function shootAction() {
    if (shoot[0] > 0) {
        $("#p-1, #p-2").attr("onclick", "");
        $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#999");
        window.setTimeout(function() {
            shoot[0] -= 1;
            gainMoney(shoot[1]);
            shootEvent();
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
            $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#333");
        }, shoot[3]);
        $("#f-1").animate({width: "100%"}, shoot[3], "linear");
        $("#f-1").animate({width: "0%"}, 0, "linear");
    };
};
function shootEvent() {
    var r = Math.floor((Math.random() * 100) + 1);
    if (r < 5) {
        gainMoney(shoot[1]);
        $("#a-eventLog").html("Headshot! Income x2 for this shot!");
        $("#a-eventLog").fadeOut(3000, function() {
            $("#a-eventLog").html("");
            $("#a-eventLog").attr("style", "");
        });
    };
    if (r < 7 && r >= 5) {
        gainMoney(shoot[1] * 7);
        $("#a-eventLog").html("Rival gang boss killed! Income x7 for this shot!");
        $("#a-eventLog").fadeOut(3000, function() {
            $("#a-eventLog").html("");
            $("#a-eventLog").attr("style", "");
        });
    };
};
function reloadAction() {
    if (shoot[0] < shoot[2]) {
        $("#p-1, #p-2").attr("onclick", "");
        $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#999");
        window.setTimeout(function() {
            shoot[0] = shoot[2];
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
            $("#f-1").attr("class", "progress-bar progress-bar-success active");
            $("#f-1").css("width", "0%");
            $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#333");
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
function buyUpgrade(index) {
    if (money[0] >= upgrades[index-1].price) {
        money[0] -= upgrades[index-1].price;
        upgradesOwned[index-1] = true;
        upgrades[index-1].run();
        $("#u-b" + index).html("Bought");
        $("#u-" + index).attr("class", "list-group-item disabled")
        $("#u-" + index).attr("onclick", "");
    };
};

// loading + interval
window.onload = function() {
    initVars();
    loadData();
    initGame();
};
window.setInterval(function() {
    displayGame();
}, interval);