var money; var shoot; var prestige;
var totalShoots; var totalReloads;
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
var dStock; var dName; var dPrice; var dPS;
var dInit = [
    new Drug("Weed",    15, 0),
    new Drug("Meth",    45, 1),
    new Drug("Cocaine", 135, 2)
];
var upgradesOwned;
var upgrades = [
    new Upgrade("Shoot reward x3",      12,         function() { shoot[1] *= 3 },       "money",    "$"), // *7
    new Upgrade("Shoot reward x3",      60,         function() { shoot[1] *= 3 },       "money",    "$"),
    new Upgrade("Shoot reward x2",      420,        function() { shoot[1] *= 2 },       "money",    "$"),
    new Upgrade("Shoot reward x2",      2940,       function() { shoot[1] *= 2 },       "money",    "$"),
    new Upgrade("Shoot reward x2",      20580,      function() { shoot[1] *= 2 },       "money",    "$"),

    new Upgrade("Shoot time /1.50",     90,         function() { shoot[3] /= 1.5 },     "money",    "$"), // *7
    new Upgrade("Shoot time /1.50",     630,        function() { shoot[3] /= 1.5 },     "money",    "$"),
    new Upgrade("Shoot time /1.25",     4410,       function() { shoot[3] /= 1.25 },    "money",    "$"),
    new Upgrade("Shoot time /1.10",     30870,      function() { shoot[3] /= 1.1 },     "money",    "$"),

    new Upgrade("Ammo stock x3",        90,         function() { shoot[2] *= 3 },       "money",    "$"), // *15
    new Upgrade("Ammo stock x3",        1350,       function() { shoot[2] *= 3 },       "money",    "$"),
    new Upgrade("Ammo stock x2",        20250,      function() { shoot[2] *= 2 },       "money",    "$"),

    new Upgrade("Reload time /1.50",    270,        function() { shoot[4] /= 1.5 },     "money",    "$"), // *7
    new Upgrade("Reload time /1.50",    1890,       function() { shoot[4] /= 1.5 },     "money",    "$"),
    new Upgrade("Reload time /1.25",    13230,      function() { shoot[4] /= 1.25 },    "money",    "$"),
    new Upgrade("Reload time /1.10",    92624,      function() { shoot[4] /= 1.1 },     "money",    "$"),

    new Upgrade("Weed price x1.50",     760,        function() {dPrice[0] *= 1.5 },     "money",    "$"), // *3
    new Upgrade("Weed price x1.50",     2280,       function() {dPrice[0] *= 1.5 },     "money",    "$"),
    new Upgrade("Weed price x1.50",     6840,       function() {dPrice[0] *= 1.5 },     "money",    "$"),
    new Upgrade("Meth price x1.50",     4600,       function() {dPrice[1] *= 1.5 },     "money",    "$"),
    new Upgrade("Meth price x1.50",     13800,      function() {dPrice[1] *= 1.5 },     "money",    "$"),
    new Upgrade("Meth price x1.50",     41400,      function() {dPrice[1] *= 1.5 },     "money",    "$")
];
var buildsOwned;
var builds = [
    new Build("Weed Plant",         500,        0.1,    1.12, 0, "weed"),
    new Build("Shed Grow",          5000,       0.5,    1.11, 0, "weed"),
    new Build("Basement Grow",      30000,      1.25,   1.10, 0, "weed"),
    new Build("Hydroponic Farm",    500000,     3.5,    1.09, 0, "weed"),
    new Build("Rusty Van",          3000,       0.1,    1.12, 1, "meth"),
    new Build("RV-91X2",            30000,      0.5,    1.11, 1, "meth"),
    new Build("Lab-Assistant",      250000,     1.25,   1.10, 1, "meth"),
    new Build("Underground Lab",    5000000,    3.5,    1.09, 1, "meth")
];
var dealersOwned;
var dealers = [
    new Dealer("Slave Dealer",          500,        0.05,   1.15, 0, "weed"),
    new Dealer("Street Dealer",         5000,       0.4,    1.14, 0, "weed"),
    new Dealer("Dirty Dealer",          30000,      1,      1.13, 0, "weed"),
    new Dealer("Old Dealer",            500000,     3,      1.12, 0, "weed"),
    new Dealer("Common Dealer",         3000,       0.05,   1.15, 1, "meth"),
    new Dealer("Experienced Dealer",    30000,      0.4,    1.14, 1, "meth"),
    new Dealer("Royal Dealer",          250000,     1,      1.13, 1, "meth"),
    new Dealer("King Dealer",           5000000,    3,      1.12, 1, "meth")
];
var mps = 0; var mps1 = 0; var mps2 = 0;
var init; var fps = 60; var interval = (1000 / fps); var before; var before; var key = "BM-INC_";
var allVars = ["money", "shoot", "rank", "totalShoots", "totalReloads", "dStock", "dName", "dPrice", "rank", "rankMultiplier", "upgradesOwned", "buildsOwned", "dealersOwned", "before"];

// game display
function initVars() {
    money = [0, 0, 0];
    shoot = [12, 1, 12, 1500, 5000];
    totalShoots = 0; totalReloads = 0;
    prestige = [];
    rank = "Glock-18"; rankMultiplier = 1;
    before = new Date().getTime();

    dStock = []; dName = []; dPrice = []; dPS = [];
    for (var i = 0; i < dInit.length; i++) {
        dStock.push(0);
        dName.push(dInit[i].name);
        dPrice.push(dInit[i].price);
        dPS.push(0);
    };

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++)
        upgradesOwned.push(false);

    buildsOwned = [];
    for (var i = 0; i < builds.length; i++)
        buildsOwned.push(0);

    dealersOwned = [];
    for (var i = 0; i < dealers.length; i++)
        dealersOwned.push(0);

    init = true;
};
function initGame() {
    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-" + (i+1)).attr("onclick", "buyUpgrade(" + (i+1) + ");");
        $("#u-n" + (i+1)).html(u.name + " : ");
        $("#u-c" + (i+1)).html(fix(u.price, 0) + u.type2);
        if (upgradesOwned[i]) {
            $("#u-b" + (i+1)).html("Bought");
            $("#u-" + (i+1)).attr("onclick", "");
        };
    };

    for (var i = 0; i < builds.length; i++) {
        var b = builds[i];
        $("#b-n" + (i+1)).html("<b>" + b.name + "</b> : ");
        $("#b-c" + (i+1)).html("cost " + fix(getBuildPrice(i), 0) + "$<br>");
        $("#b-r" + (i+1)).html("Produce " + fix(b.reward, 2) + "g/sec of <b>" + b.type2 + "</b>");
        $("#b-o" + (i+1)).html(buildsOwned[i] + " owned");
        $("#b-" + (i+1)).attr("onclick", "buyBuild(" + i + ");");
    };

    for (var i = 0; i < dealers.length; i++) {
        var d = dealers[i];
        $("#d-n" + (i+1)).html("<b>" + d.name + "</b> : ");
        $("#d-c" + (i+1)).html("cost " + fix(getDealerPrice(i), 0) + "$<br>");
        $("#d-r" + (i+1)).html("Sell " + fix(d.sell, 2) + "g/sec of <b>" + d.type2 + "</b>");
        $("#d-o" + (i+1)).html(dealersOwned[i] + " owned");
        $("#d-" + (i+1)).attr("onclick", "buyDealer(" + i + ");");
    };

    $("#f-1, #f-2").css("width", 0 + "%");
    $("#p-1").attr("onclick", "shootAction();");
    $("#p-2").attr("onclick", "reloadAction();");
};
function displayGame() {
    if (init == true) {
        // drug stock display
        for (var i = 0; i < dInit.length; i++) {
            var d = dInit[i];
            $("#h-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g");
            $("#s-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g (" + fix(dPS[i], 2) + "g/sec)<br>");
            $("#s-dp" + (i+1)).html("<small>" + d.name + " price : " + fix((dPrice[i] * rankMultiplier), 2) + "$/g</small><br>");
        };
        // if upgrade is available then do CSS
        for (var i = 0; i < upgrades.length; i++) {
            var u = upgrades[i];
            if (money[0] < u.price || upgradesOwned[i] == true) {
                $("#u-" + (i+1)).attr("class", "list-group-item disabled");
            } else {
                $("#u-" + (i+1)).attr("class", "list-group-item");
            };
        };
        // actions basic tutorial
        if (totalShoots == 0) {
            $("#a-i1").html("Click on the bar to shoot!");
        } else {
            if (totalShoots > 0 && totalShoots < 4) {
                $("#a-i1").html("Yeah, you understand how it works.<br>Shoot all your bullets now.");
            } else {
                if (totalShoots > 4 && totalShoots < 8) {
                    $("#a-i1").html("When you shoot, you earn dollars.");
                } else {
                    if (totalShoots > 8 && totalShoots < 11) {
                        $("#a-i1").html("You can see your stats on the top-bar.");
                    };
                };
            };
        };
        if (totalShoots == 12) {
            $("#a-i2").html("No more ammo!<br>Click on the bar to reload and gain ammo!");
            $("#a-i1").css("display", "none");
        };
        if (totalReloads > 0) {
            $("#a-i2").css("display", "none");
        };
        // hint on reload if needed
        if (shoot[0] < 1) {
            $("#f-1").attr("class", "progress-bar progress-bar-danger progress-bar-striped active");
            $("#f-1").css("width", "100%");
        };
        // basic stats display
        $("#h-money").html("Money : " + fix(money[0], 2) + "$");
        $("#s-money").html("Money : " + fix(money[0], 2) + "$ (" + fix(money[2], 2) + "$/sec)<br>");
        $("#s-totalmoney").html("Total money : " + fix(money[1], 2) + "$<br>");
        $("#h-ammo, #s-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2]);
        $("#a-n1").html("Shoot : +" + fix(shoot[1] * rankMultiplier, 2) + "$");
        $("#a-d1").html(fix(shoot[3]/1000, 2) + " sec/shoot");
        $("#a-n2").html("Reload : +" + fix(shoot[2], 0) + " ammo");
        $("#a-d2").html(fix(shoot[4]/1000, 2) + " sec");
        // rank up and update gun display/multiplier
        gunRankUp();
        $("#s-cg").html("Current gun : " + rank + "<br>");
        $("#s-ob").html("Overall bonus : x" + rankMultiplier);
    };
};
function updateShop() {
    // update shop when buy something on the shop
    for (var i = 0; i < builds.length; i++) { // updating builds
        var b = builds[i];
        $("#b-n" + (i+1)).html("<b>" + b.name + "</b> : ");
        $("#b-c" + (i+1)).html("cost " + fix(getBuildPrice(i), 0) + "$<br>");
        $("#b-r" + (i+1)).html("Produce " + fix(b.reward, 2) + "g/sec of <b>" + b.type2 + "</b>");
        $("#b-o" + (i+1)).html(buildsOwned[i] + " owned");
    };
    for (var i = 0; i < dealers.length; i++) { // updating dealers
        var d = dealers[i];
        $("#d-n" + (i+1)).html("<b>" + d.name + "</b> : ");
        $("#d-c" + (i+1)).html("cost " + fix(getDealerPrice(i), 0) + "$<br>");
        $("#d-r" + (i+1)).html("Sell " + fix(d.sell, 2) + "g/sec of <b>" + d.type2 + "</b>");
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
function getDrugInc(index) { // used to gain in functions
    return ((builds[index].reward * buildsOwned[index])) / 187.5;
};
function getNormalDrugInc(index) { // used to display
    return (builds[index].reward * buildsOwned[index]);
};
function getDealerSell(index) { // used to gain in functions
    return (dealers[index].sell * dealersOwned[index]) / 187.5;
};
function getNormalDealerSell(index) { // used to display
    return (dealers[index].sell * dealersOwned[index]);
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
function offlineCalc() {
    var now = new Date().getTime();
    var offlineTime = now - before;
    buildReward(Math.floor(offlineTime/interval));
    dealerReward(Math.floor(offlineTime/interval));
};

// basic actions functions
function shootAction() {
    if (shoot[0] > 0) {
        $("#p-1, #p-2").attr("onclick", "");
        $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#999");
        window.setTimeout(function() {
            shoot[0] -= 1;
            totalShoots++;
            gainMoney(shoot[1] * rankMultiplier);
            shootEvent();
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
            $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#31708f");
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
            totalReloads++;
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
            $("#f-1").attr("class", "progress-bar progress-bar-success active");
            $("#f-1").css("width", "0%");
            $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#31708f");
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
        if (elapsedTime > interval) {
            buildReward(Math.floor(elapsedTime / interval));
            dealerReward(Math.floor(elapsedTime / interval));
        } else {
            buildReward(1);
            dealerReward(1);
        };
        displayGame();
        before = new Date().getTime();
    };
};

// methods + related to them
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
function Upgrade(name, price, run, type, type2) {
    this.name = name;
    this.price = price;
    this.run = run;
    this.type = type;
    this.type2 = type2;
};
function buyUpgrade(index) {
    var upType = upgrades[index-1].type;
    if (upgrades[index-1].type == "money") {
        if (money[0] >= upgrades[index-1].price) {
            money[0] -= upgrades[index-1].price;
            upgradesOwned[index-1] = true;
            upgrades[index-1].run();
            $("#u-b" + index).html("Bought");
            $("#u-" + index).attr("class", "list-group-item disabled");
            $("#u-" + index).attr("onclick", "");
        };
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
                var pos = (getNormalDrugInc(0) + getNormalDrugInc(1) + getNormalDrugInc(2) + getNormalDrugInc(3));
                var neg = (getNormalDealerSell(0) + getNormalDealerSell(1) + getNormalDealerSell(2) + getNormalDealerSell(3));
                dPS[0] = pos - neg;
            };
            if (b.type1 == 1) {
                dStock[1] += getDrugInc(i) * times;
                var pos1 = (getNormalDrugInc(4) + getNormalDrugInc(5) + getNormalDrugInc(6) + getNormalDrugInc(7));
                var neg1 = (getNormalDealerSell(4) + getNormalDealerSell(5) + getNormalDealerSell(6) + getNormalDealerSell(7));
                dPS[1] = pos1 - neg1;
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
        for (var x = 0; x < dInit.length; x++) {
            var k = dInit[x];
            if (d.type1 == 0) {
                if (dStock[0] > 0.01) {
                    dStock[0] -= getDealerSell(i) * times;
                    gainMoney(((getDealerSell(i) * dPrice[0]) * rankMultiplier) * times);
                    mps = ((dealers[0].sell * dealersOwned[0]) * dPrice[0]) + ((dealers[1].sell * dealersOwned[1]) * dPrice[0]) + ((dealers[2].sell * dealersOwned[2]) * dPrice[0]) + ((dealers[3].sell * dealersOwned[3]) * dPrice[0]);
                    mps *= rankMultiplier;
                };
            };
            if (d.type1 == 1) {
                if (dStock[1] > 0.01) {
                    dStock[1] -= getDealerSell(i) * times;
                    gainMoney(((getDealerSell(i) * dPrice[1]) * rankMultiplier) * times);
                    mps1 = ((dealers[4].sell * dealersOwned[4]) * dPrice[1]) + ((dealers[5].sell * dealersOwned[5]) * dPrice[1]) + ((dealers[6].sell * dealersOwned[6]) * dPrice[1]) + ((dealers[7].sell * dealersOwned[7]) * dPrice[1]);
                    mps1 *= rankMultiplier;
                }; 
            };
            if (d.type1 == 2) {
                if (dStock[2] > 0.01) {
                    dStock[2] -= getDealerSell(i) * times;
                    gainMoney(((getDealerSell(i) * dPrice[2]) * rankMultiplier) * times);
                };
            };
            money[2] = mps + mps1 + mps2;
        };
    };
};

// loading + interval
window.onload = function() {
    initVars();
    loadData();
    initGame();
    offlineCalc();
};
var intSave = window.setInterval(function() {saveData(); }, 1000);
var intCore = window.setInterval(function() {coreUpdate(); }, interval);