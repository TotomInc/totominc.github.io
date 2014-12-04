var money;
var ammo; var drug;

var upgradesOwned;
var upgrades = [
    new Upgrade("Copper bullets : 1.50$/shoot", 30, function() {console.log(test)})
];

var allVars = ['money','ammo','drug'];

// Saving system
function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); };
function getItem(key) { return JSON.parse(localStorage.getItem(key)); };
function removeItem(key) { localStorage.removeItem(key); };
function saveData() {
    for (var i = 0; i < allVars.length; i++) {
        setItem(allVars[i], window[allVars[i]]);
    };
};
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(allVars[i]) != null && getItem(allVars[i]) != undefined) {
            window[allVars[i]] = getItem(allVars[i]);
        };
    };
    updateStats();
    updateActions();
};
function resetData() {
    for (var i = 0; i < allVars.length; i++) {
        removeItem(allVars[i]);
    }; location.reload();
};

// Basic functions
function shoot() {
    if (ammo[0] >= 1) { ammo[0] -= 1; $("#shoot").attr('onclick', '');
        setTimeout(function() { money += ammo[1]; $("#shoot").attr('onclick', 'shoot()'); updateStats(); }, ammo[2]);
        $("#b-f1").animate({width: "100%"}, ammo[2], "linear");
        $("#b-f1").animate({width: "0%"}, 10);
    };
};
function reload() {
    if (ammo[0] == 0) { $("#reload").attr('onclick', '');
        setTimeout(function() { ammo[0] = 12; $("#reload").attr('onclick', 'reload()'); updateStats(); }, ammo[3]);
        $("#b-f2").animate({width: "100%"}, ammo[3], "linear");
        $("#b-f2").animate({width: "0%"}, 10);
    };
};
function cook() {
    $("#cook").attr('onclick', '');
    setTimeout(function() { drug[0] += drug[1]; $("#cook").attr('onclick', 'cook()'); updateStats(); }, drug[3]);
    $("#b-f3").animate({width: "100%"}, drug[3], "linear");
    $("#b-f3").animate({width: "0%"}, 10);
};
function sell() {
    if (drug[0] >= drug[5]) { $("#sell").attr('onclick', '');
        setTimeout(function() { drug[0] -= drug[5]; money += drug[5] * drug[2]; $("#sell").attr('onclick', 'sell()'); updateStats(); }, drug[4]);
        $("#b-f4").animate({width: "100%"}, drug[4], "linear");
        $("#b-f4").animate({width: "0%"}, 10);
    };
};

// Helpers
function initVars() {
    money = 0;
    ammo = [12, 0.75, 1500, 5000]; // ammo stock - reward - time - reload time
    drug = [0, 2, 4, 15000, 7500, 1]; // drug stock - prod - reward/g - prod time - sell time - g. sold/click

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++) { upgradesOwned.push(false); };
};
function updateStats() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-ammo").html("Ammo : " + fix(ammo[0], 0) + "/12");
    $("#s-drug").html("Meth in stock : " + fix(drug[0], 2) + "g");
    $("#s-gprice").html("Gram price : " + fix(drug[2], 2) + "$/g");

    if (ammo[0] == 0) { $("#shoot").css('background', 'rgba(231, 76, 60, 0.3)'); $("#reload").css('background', 'rgba(46, 204, 113, 0.3)'); }
    else { $("#shoot").css('background', 'none'); $("#reload").css('background', 'none'); };
};
function updateActions() {
    $("#a-shoot").html(fix(ammo[1], 2) + "$/shoot - " + fix((ammo[2]/1000), 2) + "s");
    $("#a-reload").html("+ 12 ammo - " + fix((ammo[3]/1000), 2) + "s");
    $("#a-cook").html("+ " + fix(drug[1], 2) + "g/click - " + fix((drug[3]/1000), 2) + "s");
    $("#a-sell").html("+ " + fix((drug[5] * drug[2]), 2) + "$/click - " + fix((drug[4]/1000), 2) + "s");
};
function updateUpgrades() {
    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-n" + (i+1)).html(u.name);
        $("#u-c" + (i+1)).html(" - cost " + fix(u.price, 0) + "$");
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
        upgrades[index].run();
        updateStats(); updateActions();
    };
};

window.onload = function() {
    initVars();
    loadData();
    updateStats();
    updateActions();
    updateUpgrades();
};