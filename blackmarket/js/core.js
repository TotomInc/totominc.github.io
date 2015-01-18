var money; var shoot; var prestige;
var rank; var rankMultiplier;
var ranks = [
    new Rank("Glock-18",        0,  100,        1.05),
    new Rank("CZ75-Auto",       1,  500,        1.10),
    new Rank("Dual Berettas",   2,  2500,       1.15),
    new Rank("UMP-45",          3,  10000,      1.20),
    new Rank("P90",             4,  25000,      1.25),
    new Rank("PP-Bizon",        5,  100000,     1.30),
    new Rank("Galil AR",        6,  250000,     1.35),
    new Rank("FAMAS",           7,  750000,     1.40),
    new Rank("AWP",             8,  1500000,    1.45),
    new Rank("AUG",             9,  5000000,    1.50),
    new Rank("AK-47",           10, 25000000,   1.55)
];
var dStock; var dName; var dPrice;
var dInit = [
    new Drug("Weed", 1, 0),
    new Drug("Meth", 3, 1),
    new Drug("Cocaine", 6, 2)
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
var buildsOwned;
var builds = [
    new Build("Weed Seed",      500,    1,  1.25, 0, "weed"),
    new Build("Weed Plant",     5000,   4,  1.25, 0, "weed"),
    new Build("Weed Tree",      20000,  16, 1.25, 0, "weed"),
    new Build("Rusty Van",      7500,   1,  1.25, 1, "meth"),
    new Build("RV-91X2",        25000,  4,  1.25, 1, "meth"),
    new Build("Lab-Assistant",  100000, 16, 1.25, 1, "meth")
];
var dealersOwned;
var dealers = [
    new Dealer("Street Dealer",     500,    0.5,    1.25, 0, "weed"),
    new Dealer("Common Dealer",     7500,   2,      1.25, 0, "weed"),
    new Dealer("Experienced Dealer",50000,  8,      1.25, 0, "weed")
];
var init; var fps = 60; var interval = (1000 / fps); var before; var key = "BM-INC_";
var allVars = ["money", "shoot", "prestige", "rank", "dStock", "dName", "dPrice", "rank", "rankMultiplier", "upgradesOwned", "buildsOwned",
"dealersOwned", "before"];

// game display
function initVars() {
    money = [0, 0];
    shoot = [12, 1, 12, 1500, 5000];
    prestige = [];
    rank = "Glock-18"; rankMultiplier = 1;
    before = new Date().getTime();

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

    buildsOwned = [];
    for (var i = 0; i < builds.length; i++) {
        buildsOwned.push(0);
    };

    dealersOwned = [];
    for (var i = 0; i < dealers.length; i++) {
        dealersOwned.push(0);
    };

    init = true;
};
function initGame() {
    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-" + (i+1)).attr("onclick", "buyUpgrade(" + (i+1) + ");");
        $("#u-n" + (i+1)).html(u.name + " : ");
        $("#u-c" + (i+1)).html(fix(u.price, 0) + "$");
        if (upgradesOwned[i]) {
            $("#u-b" + (i+1)).html("Bought");
            $("#u-" + (i+1)).attr("onclick", "");
        };
    };

    for (var i = 0; i < builds.length; i++) {
        var b = builds[i];
        $("#b-n" + (i+1)).html(b.name + " : ");
        $("#b-c" + (i+1)).html("cost " + fix(getBuildPrice(i), 0) + "$<br>");
        $("#b-r" + (i+1)).html(fix(b.reward, 2) + "g/sec of " + b.type2);
        $("#b-o" + (i+1)).html(buildsOwned[i] + " owned");
        $("#b-" + (i+1)).attr("onclick", "buyBuild(" + i + ");");
    };

    for (var i = 0; i < dealers.length; i++) {
        var d = dealers[i];
        $("#d-n" + (i+1)).html(d.name + " : ");
        $("#d-c" + (i+1)).html("cost " + fix(getDealerPrice(i), 0) + "$<br>");
        $("#d-r" + (i+1)).html("sell " + fix(d.sell, 2) + "g/sec of " + d.type2);
        $("#d-o" + (i+1)).html(dealersOwned[i] + " owned");
        $("#d-" + (i+1)).attr("onclick", "buyDealer(" + i + ");");
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
            $("#s-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g (0.00g/sec)<br>");
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
        $("#a-n1").html("Shoot : +" + fix(shoot[1] * rankMultiplier, 2) + "$");
        $("#a-d1").html(fix(shoot[3]/1000, 1) + " sec/shoot");
        $("#a-n2").html("Reload : +" + fix(shoot[2], 0) + " ammo");
        $("#a-d2").html(fix(shoot[4]/1000, 1) + " sec");
        // rank up the gun display
        gunRankUp();
        $("#s-cg").html("Current gun : " + rank + "<br>");
        $("#s-ob").html("Overall bonus : x" + rankMultiplier);
    };
};
function updateShop() {
    // update shop when buy something on the shop
    for (var i = 0; i < builds.length; i++) {
        var b = builds[i];
        $("#b-n" + (i+1)).html(b.name + " : ");
        $("#b-c" + (i+1)).html("cost " + fix(getBuildPrice(i), 0) + "$<br>");
        $("#b-r" + (i+1)).html(fix(b.reward, 2) + "g/sec of " + b.type2);
        $("#b-o" + (i+1)).html(buildsOwned[i] + " owned");
    };
    for (var i = 0; i < dealers.length; i++) {
        var d = dealers[i];
        $("#d-n" + (i+1)).html(d.name + " : ");
        $("#d-c" + (i+1)).html("cost " + fix(getDealerPrice(i), 0) + "$<br>");
        $("#d-r" + (i+1)).html("sell " + fix(d.sell, 2) + "g/sec of " + d.type2);
        $("#d-o" + (i+1)).html(dealersOwned[i] + " owned");
    };
};

// helpers functions
function gainMoney(source) {
    money[0] += source;
    money[1] += source;
};
function getBuildPrice(index) {
    return builds[index].price * Math.pow(builds[index].inflation, buildsOwned[index]);
};
function getDealerPrice(index) {
    return dealers[index].price * Math.pow(dealers[index].inflation, dealersOwned[index]);
};
function getDrugInc(index) {
    return (builds[index].reward * buildsOwned[index]) / 200; // mysterious bug... :( why 200 instead of 63?
};
function getDealerSell(index) {
    return ((dealers[index].sell * dealersOwned[index]) * dPrice[index]) / 63;
};
function gunRankUp() {
    for (var i = 0; i < ranks.length; i++) {
        var r = ranks[i];
        if (money[1] >= r.needed) {
            rank = r.name;
            rankMultiplier = r.multiplier;
        };
    };
};

// basic functions
function shootAction() {
    if (shoot[0] > 0) {
        $("#p-1, #p-2").attr("onclick", "");
        $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#999");
        window.setTimeout(function() {
            shoot[0] -= 1;
            gainMoney(shoot[1] * rankMultiplier);
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

// core update function
function coreUpdate() {
    if (init == true) {
        now = new Date().getTime();
        var elapsedTime = now - before;
        if (elapsedTime > 10) {
            buildReward(Math.floor(elapsedTime / 10));
            dealerReward(Math.floor(elapsedTime / 10));
        } else {
            buildReward(1);
            dealerReward(1);
        }
        displayGame();
        before = new Date().getTime();
    };
};

// methods
function Drug(name, price, index) {
    this.name = name;
    this.price = price;
    this.index = index;
};
function Rank(name, index, needed, multiplier) {
    this.name = name;
    this.index = index;
    this.needed = needed;
    this.multiplier = multiplier;
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
function Build(name, price, reward, inflation, type1, type2) {
    this.name = name;
    this.price = price;
    this.reward = reward;
    this.inflation = inflation;
    this.type1 = type1;
    this.type2 = type2;
};
function buyBuild(index) {
    if (money[0] >= getBuildPrice(index)) {
        money[0] -= getBuildPrice(index);
        buildsOwned[index]++;
        updateShop();
    };
};
function buildReward(times) {
    for (var i = 0; i < builds.length; i++) {
        var b = builds[i];
        for (var k = 0; k < dInit.length; k++) {
            var d = dInit[k];
            if (b.type1 == 0) {
                dStock[0] += getDrugInc(i) * times;
            };
            if (b.type1 == 1) {
                dStock[1] += getDrugInc(i) * times;
            };
            if (b.type1 == 2) {
                dStock[2] += getDrugInc(i) * times;
            };
        };
    };
};
function Dealer(name, price, sell, inflation, type1, type2) {
    this.name = name;
    this.price = price;
    this.sell = sell;
    this.inflation = inflation;
    this.type1 = type1;
    this.type2 = type2;
};
function buyDealer(index) {
    if (money[0] >= getDealerPrice(index)) {
        money[0] -= getDealerPrice(index);
        dealersOwned[index]++;
        updateShop();
    };
};
function dealerReward(times) {
    for (var i = 0; i < dealers.length; i++) {
        var d = dealers[i];
        if (d.type1 == 0 && dStock[0] > 0.1) {
            dStock[0] -= getDealerSell(i) * times;
            gainMoney((getDealerSell(i) * dPrice[0]) * times);
        };
    };
};

// loading + interval
window.onload = function() {
    initVars();
    loadData();
    initGame();
};
window.setInterval(function() {
    coreUpdate();
}, interval);