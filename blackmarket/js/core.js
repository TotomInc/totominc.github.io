var money; var moneyPerSec; var shoot; var prestige;
var shootPercent; var shootPercentCash;
var experienceSpent;
var drugStock; var drugName; var drugPrice; var drugMultiplier; var drugPerSec;
var drugInit = [
    new Drug("Weed",        50),
    new Drug("Meth",        500),
    new Drug("Cocaine",     3000)
];

var fps = 60; var interval = (1000 / fps); var init = false; var key = "BmInc-";
var version = "1.05"; var release = "-official"; var build = 1050;
var before; var now;
var allVars = [
    'money', 'shoot', 'prestige', 'shootPercent', 'shootPercentCash', 'experienceSpent',
    'before',
    'drugStock', 'drugMultiplier',
    'shootRewardUpgradesOwned', 'shootTimeUpgradesOwned', 'ammoStockUpgradesOwned', 'reloadTimeUpgradesOwned', 'weedPriceUpgradesOwned', 'methPriceUpgradesOwned', 'cocainePriceUpgradesOwned',
    'prestigeUpgradesOwned', 'prestigeShootOwned',
    'weedBuildsOwned', 'methBuildsOwned', 'cocaineBuildsOwned',
    'weedDealersOwned', 'methDealersOwned', 'cocaineDealersOwned',
    'prestigeShootingOwned', 'prestigeReloadingOwned'
];

var inputFps = document.getElementById("update-fps");
var inputValue = inputFps.value;
var refreshRate = 60;

var showUpgradesOwnedCheckBox = document.getElementById('showUpgradesOwned');
var enableAutoShootCheckBox = document.getElementById('enableAutoShoot');
var enableAutoReloadCheckBox = document.getElementById('enableAutoReload');
var checkCodeInput = document.getElementById('checkCode').value;

function Log(text) { console.log("Blackmarket v" + version + release + " - " + text); };
function Drug(name, price) {
    this.name = name;
    this.price = price;
};
function modulableInterval() {
    Init.update();
    setTimeout(modulableInterval, refreshRate);
};

function Init() { Log("Calling Init()"); };
Init.variables = function() {
	Log("Calling Init.variables()");
	money = [0, 0];
	shoot = [12, 1, 12, 1500, 5000, 0, 0, 1];
    prestige = [0, 0, 1, "no rank"];
    shootPercent = 0;
    shootPercentCash = 0;
    experienceSpent = 0;

    drugStock = []; drugName = []; drugPrice = []; drugMultiplier = []; drugPerSec = []; drugNetPerSec = []; moneyPerSec = [];
    for (var i = 0; i < drugInit.length; i++) {
        var d = drugInit[i];
        drugStock.push(0);
        drugName.push(d.name);
        drugPrice.push(d.price);
        drugPerSec.push(0);
        drugNetPerSec.push(0);
        drugMultiplier.push(1);
        moneyPerSec.push(0);
    };

    before = new Date().getTime();
    init = true;
};
Init.update = function() {
    if (init == true) {
        getExperience();
        PrestigeRank.rankup();
        getShootPercent();
        Action.check();

        showUpgradesOwnedCheckBox = document.getElementById('showUpgradesOwned');
        enableAutoShootCheckBox = document.getElementById('enableAutoShoot');
        enableAutoReloadCheckBox = document.getElementById('enableAutoReload');

        $("#navbar-money").html("Money : $" + fix(money[0], "money") + " <small>($" + fix(moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2], "money") + "/sec)</small>");
        $("#navbar-weed").html("Weed : " + fix(drugStock[0], "drug") + "g");
        $("#navbar-meth").html("Meth : " + fix(drugStock[1], "drug") + "g");
        $("#navbar-cocaine").html("Cocaine : " + fix(drugStock[2], "drug") + "g");
        $("#action-shoot").html("+ $" + fix(getShootReward(), "money") + "/shoot<br>" + fix((shoot[3] / 1000), "time") + " sec/shoot");
        $("#action-reload").html(shoot[0] + "/" + shoot[2] + " ammo<br>" + fix((shoot[4] / 1000), "time") + " sec/reload");
        $("#stats-money").html("Money : <b>$" + fix(money[0], "money") + "</b><br>Total money : <b>$" + fix(money[1], "money") + "</b><br>Money per sec : <b>$" + fix(moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2], "money") + "/sec</b>");
        $("#stats-ammo").html("Ammo : <b>" + shoot[0] + "/" + shoot[2] + "</b><br>Total shots : <b>" + shoot[5] + "</b><br>Total reloads : <b>" + shoot[6] + '</b><br>Shoot earn <b>' + shootPercent + '% of your total $/sec</b>');
        $("#stats-weed").html("Weed stock : <b>" + fix(drugStock[0], "drug") + "g</b> (" + fix(drugPerSec[0], "drug") + "g/sec)<br>Weed selling : <b>" + fix(drugNetPerSec[0], "drug") + "g/sec</b><br>Weed price : <b>" + fix(getDrugPrice(0), "drug") + "$/g</b><br>Weed multiplier : <b>x" + fix(drugMultiplier[0], "multiplier") + '</b>');
        $("#stats-meth").html("Meth stock : <b>" + fix(drugStock[1], "drug") + "g</b> (" + fix(drugPerSec[1], "drug") + "g/sec)<br>Meth selling : <b>" + fix(drugNetPerSec[1], "drug") + "g/sec</b><br>Meth price : <b>" + fix(getDrugPrice(1), "drug") + "$/g</b><br>Meth multiplier : <b>x" + fix(drugMultiplier[1], "multiplier") + '</b>');
        $("#stats-cocaine").html("Cocaine stock : <b>" + fix(drugStock[2], "drug") + "g</b> (" + fix(drugPerSec[2], "drug") + "g/sec)<br>Cocaine selling : <b>" + fix(drugNetPerSec[2], "drug") + "g/sec</b><br>Cocaine price : <b>" + fix(getDrugPrice(2), "drug") + "$/g</b><br>Cocaine multiplier : <b>x" + fix(drugMultiplier[2], "multiplier") + '</b>');
        $("#stats-weedcash").html("Money from weed : <b>$" + fix(moneyPerSec[0], "money") + "/sec</b><br>");
        $("#stats-methcash").html("Money from meth : <b>$" + fix(moneyPerSec[1], "money") + "/sec</b><br>");
        $("#stats-cocainecash").html("Money from cocaine : <b>$" + fix(moneyPerSec[2], "money") + "/sec</b><br>");
        $("#stats-totalmoneypersec").html("Total money per sec : <b>$" + fix(moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2], "money") + "/sec</b>");
        $("#stats-experience").html("Experience : <b>" + fix(prestige[0], "prestige") + "</b><br>Experience on reset : <b>" + fix(prestige[1], "prestige") + "</b>");
        $("#stats-prestige").html("Prestige rank : <b>" + prestige[3] + "</b><br>Prestige multiplier : <b>x" + fix(prestige[2], "multiplier") + "</b>");
        $("#options-version").html("Current version : " + version + "-b" + build);
        $("#options-currentFps").html(inputValue + " frames per second. ");
    };
};
Init.game = function() {
    Init.variables();
    Upgrade.init();
    Build.init();
    Dealer.init();
    PrestigeUpgrade.init();
    loadData();
    Upgrade.saveCheck();
    Build.check();
    Dealer.check();
    PrestigeRank.fillTable();
    PrestigeUpgrade.saveCheck();
    resize();
};
Init.coreUpdate = function() {
    if (init == true) {
        now = new Date().getTime();
        var elapsedTime = now - before;
        if (elapsedTime > interval) {
            Build.earn(Math.floor(elapsedTime / interval));
            Dealer.sell(Math.floor(elapsedTime / interval));
        } else {
            Build.earn(1);
            Dealer.sell(1);
        };
        before = new Date().getTime();
        inputValue = inputFps.value;
        refreshRate = (1000 / inputValue);
    };
};

window.onload = function() { Init.game(); };
var intMain = window.setInterval(function() { Init.coreUpdate(); }, interval);
var intSave = window.setInterval(function() { saveData(); }, interval);
setTimeout(modulableInterval, refreshRate);