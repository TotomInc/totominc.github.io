var maxpx = $(document).height(); var headerpx = 45; var marginpx = 10;
$(".container-fluid").css('max-height', (maxpx - headerpx - marginpx) + 'px');
$(".col-md-4").css('max-height', (maxpx - headerpx - marginpx) + 'px');

var money; var ammo; var weed; var meth;
var progress; var before;

var upgradesOwned; var helpersOwned; var helpersTrigged; var buildsOwned; var dealersOwned;
var upgrades = [
    new Upgrade("Shoot reward x3!", 12, function() { ammo[1] *= 3 }), // *7
    new Upgrade("Shoot reward x3!", 60, function() { ammo[1] *= 3 }),
    new Upgrade("Shoot reward x3!", 420, function() { ammo[1] *= 3 }),
    new Upgrade("Shoot reward x3!", 2940, function() { ammo[1] *= 4 }),

    new Upgrade("Shoot time /2!", 90, function() { ammo[2] /= 2 }), // *7
    new Upgrade("Shoot time /2!", 630, function() { ammo[2] /= 2 }),
    new Upgrade("Shoot time /2!", 4410, function() { ammo[2] /= 2 }),

    new Upgrade("Ammo stock x3!", 90, function() { ammo[4] *= 3 }), // *15
    new Upgrade("Ammo stock x3!", 1350, function() { ammo[4] *= 3 }),
    new Upgrade("Ammo stock x3!", 20250, function() { ammo[4] *= 3 }),

    new Upgrade("Reload time /2!", 270, function() { ammo[3] /= 2 }), // *7
    new Upgrade("Reload time /2!", 1890, function() { ammo[3] /= 2 }),
    new Upgrade("Reload time /2!", 13230, function() { ammo[3] /= 2 })
];
var helpers = [
    new Helper("Shoot Helper", 325),
    new Helper("Reload Helper", 650)
];
var builds = [
    new Build("Weed plant", 150, 1, 1.07, 0, "weed"),
    new Build("Old Van", 1000, 2, 1.07, 1, "meth")
];
var dealers = [
    new Dealer("Weed dealer", 200, 0.5, 1.07, 0, "weed"),
    new Dealer("Meth dealer", 1500, 1, 1.07, 1, "meth")
];

var init; var fps = 60; var interval = (1000 / fps); var key = "Blackmarket_";
var allVars = ['money', 'ammo', 'weed', 'meth', 'progress', 'before', 'upgradesOwned', 'helpersOwned', 'helpersTrigged', 'buildsOwned', 'dealersOwned'];

// Saving system
function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
};
function removeItem(key) {
    localStorage.removeItem(key);
};
function saveData() {
    for (var i = 0; i < allVars.length; i++) {
        setItem(key + allVars[i], window[allVars[i]]);
    };
};
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(key + allVars[i]) != null && getItem(key + allVars[i]) != undefined) {
            window[allVars[i]] = getItem(key + allVars[i]);
        };
    };
};
function resetData() {
    for (var i = 0; i < allVars.length; i++) {
        removeItem(key + allVars[i]);
    };
    location.reload();
};

// Helpers
function initVars() {
    money = 0;
    ammo = [12, 1, 1500, 5000, 12]; // stock; reward; time; reload time; max ammo
    weed = [0, 2, 0]; meth = [0, 8, 0]; // stock; reward; per/sec
    before = new Date().getTime();

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++) {
        upgradesOwned.push(false);
    };

    helpersOwned = []; helpersTrigged = [];
    for (var i = 0; i < helpers.length; i++) {
        helpersOwned.push(false); helpersTrigged.push(false);
    };

    buildsOwned = [];
    for (var i = 0; i < builds.length; i++) {
        buildsOwned.push(0);
    };

    dealersOwned = [];
    for (var i = 0; i < dealers.length; i++) {
        dealersOwned.push(0);
    };

    progress = [];
    for (var i = 0; i < helpers.length; i++) {
        progress.push(0);
    };

    init = false;
};
function initGame() {
    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-n" + (i+1)).html(u.name + " ");
        $("#u-c" + (i+1)).html("cost : " + fix(u.price, 0) + "$");
        $("#u-c" + (i+1)).attr("class", "u-cost");
        $("#u-c" + (i+1)).attr("onclick", "buyUpgrade(" + i + ")");
        if (upgradesOwned[i]) { $("#u-" + (i+1)).css('display', 'none'); };
    };
    for (var i = 0; i < helpers.length; i++) {
        var h = helpers[i];
        $("#h-n" + (i+1)).html(h.name + " - ");
        $("#h-c" + (i+1)).html("cost : " + fix(h.price, 0) + "$");
        $("#h-c" + (i+1)).attr("class", "h-cost");
        $("#h-c" + (i+1)).attr("onclick", "buyHelper(" + i + ")");
        if (helpersOwned[i]) { $("#h-c" + (i+1)).html("trigged : " + helpersTrigged[i]); };
    };
    for (var i = 0; i < builds.length; i++) {
        var b = builds[i]; var c1 = builds[i].price * Math.pow(builds[i].inflation, buildsOwned[i]);
        $("#b-n" + (i+1)).html(b.name + " - ");
        $("#b-c" + (i+1)).html("cost : " + fix(c1, 2) + "$<br>");
        $("#b-c" + (i+1)).attr("class", "b-cost");
        $("#b-c" + (i+1)).attr("onclick", "buyBuild(" + i + ")");
        $("#b-o" + (i+1)).html(buildsOwned[i] + " owned<br>");
        $("#b-r" + (i+1)).html(fix(b.reward, 2) + " g. of " + b.type2 + "/sec");
        $("#b-r" + (i+1)).attr("class", "b-reward");
    };
    for (var i = 0; i < dealers.length; i++) {
        var d = dealers[i]; var c2 = dealers[i].price * Math.pow(dealers[i].inflation, dealersOwned[i]);
        $("#d-n" + (i+1)).html(d.name + " - ");
        $("#d-c" + (i+1)).html("cost : " + fix(c2, 2) + "$<br>");
        $("#d-c" + (i+1)).attr("class", "d-cost");
        $("#d-c" + (i+1)).attr("onclick", "buyDealer(" + i +")");
        $("#d-o" + (i+1)).html(dealersOwned[i] + " owned<br>");
        $("#d-r" + (i+1)).html("Sell " + fix(d.sell, 2) + " g. of " + d.type2 + "/sec");
        $("#d-r" + (i+1)).attr("class", "d-reward");
    };

    updateStats(); updateBuilds(); updateActions();
    init = true;
};
function updateStats() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-ammo").html("Ammo : " + fix(ammo[0], 0) + "/" + fix(ammo[4], 0));
    $("#s-weed").html("Weed : " + fix(weed[0], 2) + "g (" + fix(weed[2], 2) + "g/sec)" );
    $("#s-weedPrice").html("<br>Weed price : " + fix(weed[1], 2) + "$/g.");
    $("#s-weedPrice, #s-methPrice").attr("class", "drug-price");
    $("#s-meth").html("Meth : " + fix(meth[0], 2) + "g (" + fix(meth[2], 2) + "g/sec)");
    $("#s-methPrice").html("<br>Meth price : " + fix(meth[1], 2) + "$/g.");

    if (ammo[0] == 0) {
        $("#shoot").css('background', 'rgba(231, 76, 60, 0.3)');
        $("#reload").css('background', 'rgba(46, 204, 113, 0.3)');
    } else {
        $("#shoot").css('background', 'none');
        $("#reload").css('background', 'none');
    };
};
function updateActions() {
    $("#a-shoot").html(fix(ammo[1], 2) + "$/shoot - " + fix((ammo[2] / 1000), 2) + "s");
    $("#a-reload").html("+" + fix(ammo[4], 0) + " ammo - " + fix((ammo[3] / 1000), 2) + "s");
};
function updateBuilds() {
    for (var i = 0; i < builds.length; i++) {
        var b = builds[i]; var c = builds[i].price * Math.pow(builds[i].inflation, buildsOwned[i]);
        $("#b-n" + (i+1)).html(b.name + " - ");
        $("#b-c" + (i+1)).html("cost : " + fix(c, 2) + "$<br>");
        $("#b-c" + (i+1)).attr("class", "b-cost");
        $("#b-c" + (i+1)).attr("onclick", "buyBuild(" + i + ")");
        $("#b-o" + (i+1)).html(buildsOwned[i] + " owned <br>");
        $("#b-r" + (i+1)).html(fix(b.reward * buildsOwned[i], 2) + " g. of " + b.type2 + "/sec");
    };
    for (var i = 0; i < dealers.length; i++) {
        var d = dealers[i]; var c2 = dealers[i].price * Math.pow(dealers[i].inflation, dealersOwned[i]);
        $("#d-n" + (i+1)).html(d.name + " - ");
        $("#d-c" + (i+1)).html("cost : " + fix(c2, 2) + "$<br>");
        $("#d-c" + (i+1)).attr("class", "d-cost");
        $("#d-c" + (i+1)).attr("onclick", "buyDealer(" + i +")");
        $("#d-o" + (i+1)).html(dealersOwned[i] + " owned<br>");
        $("#d-r" + (i+1)).html("Sell " + fix(d.sell * dealersOwned[i], 2) + " g. of " + d.type2 + "/sec");
    };
};
function updateGame(times) {
    if (init == true) {
        var t = times;
        hShoot(t); hReload(t);
        updateStats(); updateActions(); buildReward(); dealerReward();
    };
};
function recoverLost() {
    now = new Date().getTime();
    var elapsedTime = now - before;
    if (elapsedTime > 10) {
        updateGame(Math.floor(elapsedTime / 10));
    } else {
        updateGame(1);
    };
    before = new Date().getTime();
};

// Basic functions
function shoot() {
    if (ammo[0] >= 1 && helpersTrigged[0] == false) {
        ammo[0] -= 1;
        $("#shoot, #reload").attr('onclick', '');
        setTimeout(function() {
            money += ammo[1]; updateStats();
            $("#shoot").attr('onclick', 'shoot()'); $("#reload").attr('onclick', 'reload()');
        }, ammo[2]);
        $("#b-f1").animate({ width: "100%" }, ammo[2], "linear");
        $("#b-f1").animate({ width: "0%" }, 10);
    };
};
function reload() {
    if (ammo[0] < ammo[4] && helpersTrigged[1] == false) {
        $("#reload, #shoot").attr('onclick', '');
        setTimeout(function() {
            $("#reload").attr('onclick', 'reload()'); $("#shoot").attr('onclick', 'shoot()');
            ammo[0] = ammo[4]; updateStats();
        }, ammo[3]);
        $("#b-f2").animate({ width: "100%" }, ammo[3], "linear");
        $("#b-f2").animate({ width: "0%" }, 10);
    };
};
function hShoot(times) {
    if (helpersOwned[0] == true) {
        if (helpersTrigged[0] == true && ammo[0] >= 1) { // shoot
            progress[0] += times / fps;
            progress[0] %= ammo[2];
            var width = progress[0] / (ammo[2] / 1000) * 100;
            if ((ammo[2] / 1000) < 0.2) {
                width = 100;
            };
            $("#b-f1").css('width', width + '%');
            if (progress[0] > (ammo[2] / 1000)) {
                progress[0] = 0;
                money += ammo[1];
                ammo[0] --;
                $("#b-f1").css('width', 0);
            };
        };
        if (helpersTrigged[0] == false) {
            progress[0] = 0;
            $("#b-f1").css('width', 0);
        };
    };
};
function hReload(times) {
    if (helpersOwned[1] == true) {
        if (helpersTrigged[1] == true && ammo[0] == 0) { // reload
            progress[1] += times / fps;
            progress[1] %= ammo[3];
            var width = progress[1] / (ammo[3] / 1000) * 100;
            $("#b-f2").css('width', width + '%');
            if (progress[1] > (ammo[3] / 1000)) {
                progress[1] = 0;
                ammo[0] = ammo[4];
                $("#b-f2").css('width', 0);
            };
        };
        if (helpersTrigged[1] == false) {
            progress[1] = 0;
            $("#b-f2").css('width', 0);
        };
    };
};

// Methods
function Upgrade(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};
function buyUpgrade(index) {
    if (money >= upgrades[index].price) {
        money -= upgrades[index].price;
        upgradesOwned[index] = true;
        $("#u-" + (index + 1)).css('display', 'none');
        upgrades[index].run(); updateStats(); updateActions();
    };
};

function Helper(name, price) {
    this.name = name;
    this.price = price;
};
function buyHelper(index) {
    if (money >= helpers[index].price) {
        money -= helpers[index].price;
        helpersOwned[index] = true;
        helpersTrigged[index] = true;
        $("#h-c" + (index + 1)).html("trigged : " + helpersTrigged[index]);
        $("#h-c" + (index + 1)).attr("onclick", "triggerHelper(" + index + ")");
        updateStats();
        updateActions();
    };
};
function triggerHelper(index) {
    if (helpersOwned[index]) {
        if (helpersTrigged[index]) {
            helpersTrigged[index] = false;
        } else {
            helpersTrigged[index] = true;
        };
    };
    $("#h-c" + (index + 1)).html("trigged : " + helpersTrigged[index]);
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
    var c = builds[index].price * Math.pow(builds[index].inflation, buildsOwned[index]);
    if (money >= c) {
        money -= c;
        buildsOwned[index]++;
        updateStats(); updateActions(); updateBuilds();
    };
};
function buildReward() {
    for (var i = 0; i < builds.length; i++) {
        var b = builds[i]; var d = dealers[i];
        if (b.type1 == 0) {
            weed[0] += (buildsOwned[i] * b.reward) / 62.5;
            weed[2] = (buildsOwned[i] * b.reward) - (d.sell * dealersOwned[i]);
        };
        if (b.type1 == 1) {
            meth[0] += (buildsOwned[i] * b.reward) / 62.5;
            meth[2] = (buildsOwned[i] * b.reward) - (d.sell * dealersOwned[i]);
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
    var c = dealers[index].price * Math.pow(dealers[index].inflation, dealersOwned[index]);
    if (money >= c) {
        money -= c;
        dealersOwned[index]++;
        updateStats(); updateActions(); updateBuilds();
    };
};
function dealerReward() {
    for (var i = 0; i < dealers.length; i++) {
        var d = dealers[i];
        if (d.type1 == 0) {
            if (weed[0] > 1) {
                weed[0] -= (d.sell * dealersOwned[i]) / 62.5;
                money += ((d.sell * dealersOwned[i]) * weed[1]) / 62.5;
            };
        };
        if (d.type1 == 1) {
            if (meth[0] > 1) {
                meth[0] -= (d.sell * dealersOwned[i]) / 62.5;
                money += ((d.sell * dealersOwned[i]) * meth[1]) / 62.5;
            };
        };
    };
};

// fix.min + little functions
function numberWithCommas(a) {
    var b = a.toString().split(",");
    return b[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (b[1] ? "," + b[1] : "")
};
function logFloor(a) {
    for (var b = 0; a >= 10;) b++, a /= 10;
    return b
};
function fix(a, b) {
    if (a >= 1e9) {
        var c = Math.floor(logFloor(a) / 3),
            d = ["billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion", "unvigintillion", "duovigintillion", "tresvigintillion", "quattuorvigintillion", "quinvigintillion", "sexvigintillion", "septenvigintillion", "octovigintillion", "novenvigintillion", "trigintillion", "untrigintillion", "duotrigintillion", "tretrigintillion", "quattuortrigintillion", "quintrigintillion", "sextrigintillion", "septentrigintillion", "octotrigintillion", "novemtrigintillion", "quadragintillion", "unquadragintillion", "duoquadragintillion", "trequadragintillion", "quattuorquadragintillion", "quinquadragintillion", "sexquadragintillion", "septenquadragintillion"],
            e = fix(a / Math.pow(10, 3 * c), b);
        return e + " " + d[c - 3] + " "
    }
    return numberWithCommas(a.toFixed(b))
};

// Loop + onload
window.onload = function() {
    initVars();
    loadData();
    initGame();
};
window.setInterval(function() {
    recoverLost();
}, interval);