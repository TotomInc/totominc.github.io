var money; var ammo; var drug; var drugPrice;
var progress; var before;

var upgradesOwned;
var upgrades = [
    new Upgrade("Up 1.10 : shoot reward x2!",           15,     function() {ammo[1] *= 2}),
    new Upgrade("Up 1.11 : shoot reward x2!",           30,     function() {ammo[1] *= 2}),
    new Upgrade("Up 1.12 : shoot reward x2!",           120,    function() {ammo[1] *= 2}),
    new Upgrade("Up 1.13 : shoot reward x3!",           760,    function() {ammo[1] *= 3}),
    new Upgrade("Up 1.14 : shoot reward x4!",           1840,   function() {ammo[1] *= 4}),
    new Upgrade("Up 1.20 : shoot time /2!",             50,     function() {ammo[2] /= 2}),
    new Upgrade("Up 1.21 : shoot time /2!",             200,    function() {ammo[2] /= 2}),
    new Upgrade("Up 1.22 : shoot time /3!",             950,    function() {ammo[2] /= 3}),
    new Upgrade("Up 2.10 : reload time /2!",            50,     function() {ammo[3] /= 2}),
    new Upgrade("Up 2.11 : reload time /2!",            200,    function() {ammo[3] /= 2}),
    new Upgrade("Up 2.12 : reload time /3!",            950,    function() {ammo[3] /= 3}),
    new Upgrade("Up 3.10 : cook production x2!",        100,    function() {drug[1] *= 2}),
    new Upgrade("Up 3.11 : cook production x3!",        400,    function() {drug[1] *= 3}),
    new Upgrade("Up 3.12 : cook production x4!",        1200,   function() {drug[1] *= 4}),
    new Upgrade("Up 3.20 : cook time /2!",              50,     function() {drug[3] /= 2}),
    new Upgrade("Up 3.21 : cook time /2!",              200,    function() {drug[3] /= 2}),
    new Upgrade("Up 3.22 : cook time /3!",              950,    function() {drug[3] /= 3}),
    new Upgrade("Up 4.10 : sell g/click x2!",           15,     function() {drug[5] *= 2}),
    new Upgrade("Up 4.11 : sell g/click x2!",           30,     function() {drug[5] *= 2}),
    new Upgrade("Up 4.12 : sell g/click x3!",           120,    function() {drug[5] *= 3}),
    new Upgrade("Up 4.20 : sell time /2!",              50,     function() {drug[4] /= 2}),
    new Upgrade("Up 4.21 : sell time /2!",              200,    function() {drug[4] /= 2}),
    new Upgrade("Up 4.22 : sell time /3!",              950,    function() {drug[4] /= 3}),
    new Upgrade("Up 4.20 : g. price between 10$-20$",   50,     function() {drugPrice[0] += 8; drugPrice[1] += 14; marketChange(); }),
    new Upgrade("Up 4.21 : g. price between 20$-40$",   100,    function() {drugPrice[0] += 10; drugPrice[1] += 20; marketChange(); }),
    new Upgrade("Up 4.22 : g. price between 40$-80$",   200,    function() {drugPrice[0] += 20; drugPrice[1] += 40; marketChange(); }),
    new Upgrade("Up 4.23 : g. price between 80$-160$",  400,    function() {drugPrice[0] += 40; drugPrice[1] += 80; marketChange(); })
];

var helpersOwned;
var helpersTrigged;
var helpers = [
    new Helper("Shoot Helper",      50),
    new Helper("Reload Helper",     200),
    new Helper("Cook Helper",       50),
    new Helper("Sell Drug Helper",  200)
];

var init; var fps = 60; var interval = (1000/fps);
var allVars = ['money','ammo','drug','drugPrice','progress','before','upgradesOwned','helpersOwned','helpersTrigged'];

// Saving system
function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); };
function getItem(key) { return JSON.parse(localStorage.getItem(key)); };
function removeItem(key) { localStorage.removeItem(key); };
function saveData() { for (var i = 0; i < allVars.length; i++) { setItem(allVars[i], window[allVars[i]]); }; };
function loadData() {
    for (var i = 0; i < allVars.length; i++) { if (getItem(allVars[i]) != null && getItem(allVars[i]) != undefined) { window[allVars[i]] = getItem(allVars[i]); }; };
    updateStats(); updateActions();
};
function resetData() { for (var i = 0; i < allVars.length; i++) { removeItem(allVars[i]); }; location.reload(); };

// Helpers
function initVars() {
    money = 0;
    ammo = [12, 0.75, 1500, 5000];      // stock - reward   - time      - reload time
    drug = [0, 2, 4, 15000, 7500, 1];   // stock - prod     - reward/g  - prod time     - sell time - g.sold/click
    drugPrice = [2, 6];                 // min price - max price
    before = new Date().getTime();

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++) { upgradesOwned.push(false); };

    helpersOwned = []; helpersTrigged = [];
    for (var i = 0; i < helpers.length; i++) { helpersOwned.push(false); helpersTrigged.push(false); };

    progress = [];
    for (var i = 0; i < helpers.length; i++) { progress.push(0); };

    init = false;
};
function initGame() {
    updateStats();
    updateActions();

    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-n" + (i+1)).html(u.name);
        $("#u-c" + (i+1)).html("<br> cost : " + fix(u.price, 0) + "$");
        if (upgradesOwned[i]) { $("#u-" + (i+1)).css('display', 'none'); };
    };

    for (var i = 0; i < helpers.length; i++) {
        var h = helpers[i];
        $("#h-n" + (i+1)).html(h.name);
        $("#h-c" + (i+1)).html(" - cost : " + h.price + "$");
        if (helpersOwned[i]) { $("#h-c" + (i+1)).html(" - trigged : " + helpersTrigged[i]); };
    };

    init = true;
};
function updateStats() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-ammo").html("Ammo : " + fix(ammo[0], 0) + "/12");
    $("#s-drug").html("Meth in stock : " + fix(drug[0], 2) + "g");
    $("#s-gprice").html("Gram price : " + fix(drug[2], 2) + "$/g");
    $("#s-generalprice").html("Gram price between " + fix(drugPrice[0], 2) + "-" + fix(drugPrice[1], 2) + "$/g.");

    if (ammo[0] == 0) { $("#shoot").css('background', 'rgba(231, 76, 60, 0.3)'); $("#reload").css('background', 'rgba(46, 204, 113, 0.3)'); }
    else { $("#shoot").css('background', 'none'); $("#reload").css('background', 'none'); };
};
function updateActions() {
    $("#a-shoot").html(fix(ammo[1], 2) + "$/shoot - " + fix((ammo[2]/1000), 2) + "s");
    $("#a-reload").html("+ 12 ammo - " + fix((ammo[3]/1000), 2) + "s");
    $("#a-cook").html("+" + fix(drug[1], 2) + "g/click - " + fix((drug[3]/1000), 2) + "s");
    $("#a-sell").html("Sell " + drug[5] + "g : +" + fix((drug[5] * drug[2]), 2) + "$ - " + fix((drug[4]/1000), 2) + "s");
};
function updateGame(times) { // todo : make a better system to reduce lag
    if (init == true) {
        var t = times;
        hShoot(t); hReload(t); hCook(t); hSell(t); updateStats();
    };
};
function recoverLost() {
    now = new Date().getTime();
    var elapsedTime = now - before;
    if (elapsedTime > 10) { updateGame(Math.floor(elapsedTime/10)); }
    else { updateGame(1); };
    before = new Date().getTime();
};

// Basic functions
function shoot() {
    if (ammo[0] >= 1 && helpersTrigged[0] == false) { ammo[0] -= 1; $("#shoot").attr('onclick', '');
        setTimeout(function() { money += ammo[1]; $("#shoot").attr('onclick', 'shoot()'); updateStats(); }, ammo[2]);
        $("#b-f1").animate({width: "100%"}, ammo[2], "linear");
        $("#b-f1").animate({width: "0%"}, 10);
    };
};
function reload() {
    if (ammo[0] == 0 && helpersTrigged[1] == false) { $("#reload").attr('onclick', '');
        setTimeout(function() { ammo[0] = 12; $("#reload").attr('onclick', 'reload()'); updateStats(); }, ammo[3]);
        $("#b-f2").animate({width: "100%"}, ammo[3], "linear");
        $("#b-f2").animate({width: "0%"}, 10);
    };
};
function cook() {
    if (helpersTrigged[2] == false) {
        $("#cook").attr('onclick', '');
        setTimeout(function() { drug[0] += drug[1]; $("#cook").attr('onclick', 'cook()'); updateStats(); }, drug[3]);
        $("#b-f3").animate({width: "100%"}, drug[3], "linear");
        $("#b-f3").animate({width: "0%"}, 10);
    };
};
function sell() {
    if (helpersTrigged[3] == false && drug[0] >= drug[5]) { $("#sell").attr('onclick', '');
        setTimeout(function() { drug[0] -= drug[5]; money += drug[5] * drug[2]; $("#sell").attr('onclick', 'sell()'); updateStats(); }, drug[4]);
        $("#b-f4").animate({width: "100%"}, drug[4], "linear");
        $("#b-f4").animate({width: "0%"}, 10);
    };
};

function hShoot(times) {
    if (helpersOwned[0] == true) {
        if (helpersTrigged[0] == true && ammo[0] >= 1) { // shoot
            progress[0] += times/fps; progress[0] %= ammo[2];
            var width = progress[0]/(ammo[2]/1000) * 100;
            $("#b-f1").css('width', width + '%');
            if (progress[0] > (ammo[2]/1000)) {
                progress[0] = 0; money += ammo[1]; ammo[0]--;
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
            progress[1] += times/fps; progress[1] %= ammo[3];
            var width = progress[1]/(ammo[3]/1000) * 100;
            $("#b-f2").css('width', width + '%');
            if (progress[1] > (ammo[3]/1000)) {
                progress[1] = 0; ammo[0] = 12;
                $("#b-f2").css('width', 0);
            };
        };
        if (helpersTrigged[1] == false) {
            progress[1] = 0;
            $("#b-f2").css('width', 0);
        };
    };
};
function hCook(times) {
    if (helpersOwned[2] == true) {
        if (helpersTrigged[2] == true) {
            progress[2] += times/fps; progress[2] %= drug[3];
            var width = progress[2]/(drug[3]/1000) * 100;
            $("#b-f3").css('width', width + '%');
            if (progress[2] > (drug[3]/1000)) {
                progress[2] = 0; drug[0] += drug[1];
                $("#b-f3").css('width', 0);
            };
        };
        if (helpersTrigged[2] == false) {
            progress[2] = 0;
            $("#b-f3").css('width', 0);
        };
    };
};
function hSell(times) {
    if (helpersOwned[3] == true) {
        if (helpersTrigged[3] == true && drug[0] >= drug[5]) {
            progress[3] += times/fps; progress[3] %= drug[4];
            var width = progress[3]/(drug[4]/1000) * 100;
            $("#b-f4").css('width', width + '%');
            if (progress[3] > (drug[4]/1000)) {
                progress[3] = 0; drug[0] -= drug[5]; money += drug[5] * drug[2];
                $("#b-f4").css('width', 0);
            };
        };
        if (helpersTrigged[3] == false) {
            progress[3] = 0;
            $("#b-f4").css('width', 0);
        };
    };
};

function marketChange() { drug[2] = Math.floor((Math.random() * drugPrice[1]) + drugPrice[0]); updateStats(); };

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
        $("#u-" + (index+1)).css('display', 'none');
        updateStats(); updateActions();
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
        $("#h-c" + (index+1)).html(" - trigged : " + helpersTrigged[index]);
        $("#h-" + (index+1)).attr('onclick', 'triggerHelper(' + index + ')');
        updateStats(); updateActions();
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
    $("#h-c" + (index+1)).html(" - trigged : " + helpersTrigged[index]);
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
window.setInterval(function() {
    marketChange();
    updateActions();
}, 30000);