var maxpx = $(document).height();
var headerpx = 45;
var marginpx = 10;
$(".container-fluid").css('max-height', (maxpx - headerpx - marginpx) + 'px');
$(".col-md-4").css('max-height', (maxpx - headerpx - marginpx) + 'px');

var money; var ammo; var meth; var weed;

var upgradesOwned; var helpersOwned; var helpersTrigged;
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

var progress; var before;
var init; var fps = 60; var interval = (1000 / fps); var key = "Blackmarket_";
var allVars = ['money', 'ammo', 'progress', 'before', 'upgradesOwned', 'helpersOwned', 'helpersTrigged'];

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
    ammo = [12, 1, 1500, 5000, 12]; // stock - reward - time - reload time - max ammo
    weed = [0, 2]; meth = [0, 20]; // stock - reward
    before = new Date().getTime();

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++) {
        upgradesOwned.push(false);
    };

    helpersOwned = []; helpersTrigged = [];
    for (var i = 0; i < helpers.length; i++) {
        helpersOwned.push(false);
        helpersTrigged.push(false);
    };

    progress = [];
    for (var i = 0; i < helpers.length; i++) {
        progress.push(0);
    };

    init = false;
};
function initGame() {
    updateStats();
    updateActions();

    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-n" + (i + 1)).html(u.name + " ");
        $("#u-c" + (i + 1)).html("cost : " + fix(u.price, 0) + "$");
        $("#u-c" + (i + 1)).attr("class", "u-cost");
        if (upgradesOwned[i]) {
            $("#u-" + (i + 1)).css('display', 'none');
        };
    };

    for (var i = 0; i < helpers.length; i++) {
        var h = helpers[i];
        $("#h-n" + (i + 1)).html(h.name);
        $("#h-c" + (i + 1)).html(" - cost : " + fix(h.price, 0) + "$");
        if (helpersOwned[i]) {
            $("#h-c" + (i + 1)).html(" - trigged : " + helpersTrigged[i]);
        };
    };

    init = true;
};
function updateStats() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-ammo").html("Ammo : " + fix(ammo[0], 0) + "/" + fix(ammo[4], 0));

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
function updateGame(times) {
    if (init == true) {
        var t = times;
        hShoot(t);
        hReload(t);
        updateStats();
        updateActions();
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
        upgrades[index].run();
        $("#u-" + (index + 1)).css('display', 'none');
        updateStats();
        updateActions();
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
        $("#h-c" + (index + 1)).html(" - trigged : " + helpersTrigged[index]);
        $("#h-" + (index + 1)).attr('onclick', 'triggerHelper(' + index + ')');
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
    $("#h-c" + (index + 1)).html(" - trigged : " + helpersTrigged[index]);
};

// fix.min
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