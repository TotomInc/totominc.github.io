var money; var moneyPerSec; var shoot; var prestige;
var shootPercent; var shootPercentCash;
var experienceSpent;
var drugStock; var drugName; var drugPrice; var drugMultiplier; var drugPerSec;
var drugInit = [
    new Drug("Weed",        50),
    new Drug("Meth",        750),
    new Drug("Cocaine",     3500)
];

var fps = 60; var interval = (1000 / fps); var init = false; var key = "BmInc-";
var version = "1.20"; var release = "-official";
var before; var now;
var allVars = [
    'money', 'shoot', 'prestige', 'shootPercent', 'shootPercentCash', 'experienceSpent',
    'before',
    'drugStock', 'drugMultiplier',
    'shootRewardUpgradesOwned', 'shootTimeUpgradesOwned', 'ammoStockUpgradesOwned', 'reloadTimeUpgradesOwned', 'weedPriceUpgradesOwned', 'methPriceUpgradesOwned', 'cocainePriceUpgradesOwned',
    'prestigeUpgradesOwned', 'prestigeShootOwned',
    'weedBuildsOwned', 'methBuildsOwned', 'cocaineBuildsOwned',
    'weedDealersOwned', 'methDealersOwned', 'cocaineDealersOwned',
    'prestigeShootingOwned', 'prestigeReloadingOwned',
    'totalMoneyAchOwned', 'experienceAchOwned', 'shootAchOwned', 'reloadAchOwned',
    'partsOwned', 'partsTrigged', 'currentTimeParts', 'partsTimeMultiplier',
    'gunsOwned', 'gunsTrigged', 'currentTimeGuns', 'gunsTimeMultiplier',
    'enableAutoCraftCheck', 'enableAutoCraftCheck2'
];

var inputFps = document.getElementById("update-fps");
var inputValue = inputFps.value;
var refreshRate = 60;

var showUpgradesOwnedCheckBox = document.getElementById('showUpgradesOwned');
var showAchOwnedCheckBox = document.getElementById('showAchOwned');
var enableAutoShootCheckBox = document.getElementById('enableAutoShoot');
var enableAutoReloadCheckBox = document.getElementById('enableAutoReload');
var enableAutoCraft = document.getElementById('partAutocraft');
var enableAutoCraft2 = document.getElementById('gunAutocraft');
var enableAutoCraftCheck = false;
var enableAutoCraftCheck2 = false;

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

    if (jQuery) {
        init = true;
    };
};
Init.update = function() {
    if (init == true) {
        getExperience();
        PrestigeRank.rankup();
        getShootPercent();
        Action.check();
        Achievement.check();

        showUpgradesOwnedCheckBox = document.getElementById('showUpgradesOwned');
        showAchOwnedCheckBox = document.getElementById('showAchOwned');
        enableAutoShootCheckBox = document.getElementById('enableAutoShoot');
        enableAutoReloadCheckBox = document.getElementById('enableAutoReload');
        enableAutoCraft = document.getElementById('partAutocraft');
        enableAutoCraft2 = document.getElementById('gunAutocraft');
        
        if (prestige[0] >= 1000000) {
            $("#factory-locked, #market-locked").css("display", "none");
            $("#factory-unlocked, #market-unlocked").css("display", "block");
        };

        $("#navbar-money").html("$" + fix(money[0], "money") + " <small>($" + fix(moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2], "money") + "/sec)</small>");
        $("#navbar-weed").html("Weed : " + fix(drugStock[0], "drug") + "g");
        $("#navbar-meth").html("Meth : " + fix(drugStock[1], "drug") + "g");
        $("#navbar-cocaine").html("Cocaine : " + fix(drugStock[2], "drug") + "g");
        
        $("#action-shoot").html("+ $" + fix(getShootReward(), "money") + "/shoot<br>" + fix((shoot[3] / 1000), "time") + " sec/shoot");
        $("#action-reload").html(shoot[0] + "/" + shoot[2] + " ammo<br>" + fix((shoot[4] / 1000), "time") + " sec/reload");
        
        $("#stats-money").html("Money : <b>$" + fix(money[0], "money") + "</b><br>Total money : <b>$" + fix(money[1], "money") + "</b><br>Money per sec : <b>$" + fix(moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2], "money") + "/sec</b>");
        $("#stats-ammo").html("Ammo : <b>" + shoot[0] + "/" + shoot[2] + "</b><br>Total shots : <b>" + fix(shoot[5], "money") + "</b><br>Total reloads : <b>" + fix(shoot[6], "money") + '</b><br>Shoot earn <b>' + shootPercent + '% of your total $/sec</b>');
        $("#stats-weed").html("Weed stock : <b>" + fix(drugStock[0], "drug") + "g</b> (" + fix(drugPerSec[0], "drug") + "g/sec)<br>Weed selling : <b>" + fix(drugNetPerSec[0], "drug") + "g/sec</b><br>Weed price : <b>" + fix(getDrugPrice(0), "drug") + "$/g</b><br>Weed multiplier : <b>x" + fix(drugMultiplier[0], "multiplier") + '</b>');
        $("#stats-meth").html("Meth stock : <b>" + fix(drugStock[1], "drug") + "g</b> (" + fix(drugPerSec[1], "drug") + "g/sec)<br>Meth selling : <b>" + fix(drugNetPerSec[1], "drug") + "g/sec</b><br>Meth price : <b>" + fix(getDrugPrice(1), "drug") + "$/g</b><br>Meth multiplier : <b>x" + fix(drugMultiplier[1], "multiplier") + '</b>');
        $("#stats-cocaine").html("Cocaine stock : <b>" + fix(drugStock[2], "drug") + "g</b> (" + fix(drugPerSec[2], "drug") + "g/sec)<br>Cocaine selling : <b>" + fix(drugNetPerSec[2], "drug") + "g/sec</b><br>Cocaine price : <b>" + fix(getDrugPrice(2), "drug") + "$/g</b><br>Cocaine multiplier : <b>x" + fix(drugMultiplier[2], "multiplier") + '</b>');
        $("#stats-weedcash").html("Money from weed : <b>$" + fix(moneyPerSec[0], "money") + "/sec</b><br>");
        $("#stats-methcash").html("Money from meth : <b>$" + fix(moneyPerSec[1], "money") + "/sec</b><br>");
        $("#stats-cocainecash").html("Money from cocaine : <b>$" + fix(moneyPerSec[2], "money") + "/sec</b><br>");
        $("#stats-totalmoneypersec").html("Total money per sec : <b>$" + fix(moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2], "money") + "/sec</b>");
        $("#stats-experience").html("Experience : <b>" + fix(prestige[0], "prestige") + "</b><br>Experience on reset : <b>" + fix(prestige[1], "prestige") + "</b><br>Experience spent : <b>" + fix(experienceSpent, "prestige") + "</b>");
        $("#stats-prestige").html("Prestige rank : <b>" + prestige[3] + "</b><br>Prestige multiplier : <b>x" + fix(prestige[2], "multiplier") + "</b>");
        
        $("#options-version").html("Current version : " + version);
        $("#options-currentFps").html(inputValue + " frames per second. ");

        $("#builds-weedstats").html("(" + weedBuildsOwned[0] + "/" + weedBuildsOwned[1] + "/" + weedBuildsOwned[2] + "/" + weedBuildsOwned[3] + ") ");
        $("#builds-methstats").html("(" + methBuildsOwned[0] + "/" + methBuildsOwned[1] + "/" + methBuildsOwned[2] + "/" + methBuildsOwned[3] + ") ");
        $("#builds-cocainestats").html("(" + cocaineBuildsOwned[0] + "/" + cocaineBuildsOwned[1] + "/" + cocaineBuildsOwned[2] + "/" + cocaineBuildsOwned[3] + ") ");
        $("#dealers-weedstats").html("(" + weedDealersOwned[0] + "/" + weedDealersOwned[1] + "/" + weedDealersOwned[2] + "/" + weedDealersOwned[3] + ") ");
        $("#dealers-methstats").html("(" + methDealersOwned[0] + "/" + methDealersOwned[1] + "/" + methDealersOwned[2] + "/" + methDealersOwned[3] + ") ");
        $("#dealers-cocainestats").html("(" + cocaineDealersOwned[0] + "/" + cocaineDealersOwned[1] + "/" + cocaineDealersOwned[2] + "/" + cocaineDealersOwned[3] + ") ");

        $("#ach-totalmoney-stats").html("(" + getAchievementsOwned("money") + "/" + totalMoneyAch.length + ") ");
        $("#ach-experience-stats").html("(" + getAchievementsOwned("exp") + "/" + experienceAch.length + ") ");
        $("#ach-shoot-stats").html("(" + getAchievementsOwned("shoot") + "/" + shootAch.length + ") ");
        $("#ach-reload-stats").html("(" + getAchievementsOwned("reload") + "/" + reloadAch.length + ") ");

        $("#up-shootreward-stats").html("(" + getUpgradesOwned("shoot-reward") + "/" + shootRewardUpgrades.length + ") ");
        $("#up-shoottime-stats").html("(" + getUpgradesOwned("shoot-time") + "/" + shootTimeUpgrades.length + ") ");
        $("#up-ammo-stats").html("(" + getUpgradesOwned("ammo") + "/" + ammoStockUpgrades.length + ") ");
        $("#up-reloadtime-stats").html("(" + getUpgradesOwned("reload-time") + "/" + reloadTimeUpgrades.length + ") ");
        $("#up-weedprice-stats").html("(" + getUpgradesOwned("weed-price") + "/" + weedPriceUpgrades.length + ") ");
        $("#up-methprice-stats").html("(" + getUpgradesOwned("meth-price") + "/" + methPriceUpgrades.length + ") ");
        $("#up-cocaineprice-stats").html("(" + getUpgradesOwned("cocaine-price") + "/" + cocainePriceUpgrades.length + ") ");

        $("#pup-drugs-stats").html("(" + getPrestigeUpgradesOwned("drugs") + "/" + prestigeUpgrades.length + ") ");
        $("#pup-shootreward-stats").html("(" + getPrestigeUpgradesOwned("shoot-reward") + "/" + prestigeShoot.length + ") ");

        for (var i = 0; i < guns.length; i++)
            $("#market-guns-table-reward-" + (i+1)).html(fix(getGunReward(i), 'money') + '$');
    };
};
Init.game = function() {
    Init.variables();
    
    Upgrade.init();
    Build.init();
    Dealer.init();
    PrestigeUpgrade.init();
    Achievement.init();
    Part.init();
    Gun.init();
    Market.init();

    loadData();

    Upgrade.saveCheck();
    Build.check();
    Dealer.check();
    if (enableAutoCraftCheck == true) {
        document.getElementById("partAutocraft").checked = false;
        Part.autocraft();
        document.getElementById("partAutocraft").checked = true;
        Part.autocraft();
    };
    if (enableAutoCraftCheck2 == true) {
        document.getElementById("gunAutocraft").checked = false;
        Gun.autocraft();
        document.getElementById("gunAutocraft").checked = true;
        Gun.autocraft();
    };
    Part.check();
    Gun.check();
    Market.check();

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
            Part.update(Math.floor(elapsedTime / interval));
            Gun.update(Math.floor(elapsedTime / interval));
        } else {
            Build.earn(1);
            Dealer.sell(1);
            Part.update(1);
            Gun.update(1);
        };
        before = new Date().getTime();
        inputValue = inputFps.value;
        refreshRate = (1000 / inputValue);
    };
};

window.onload = function() { Init.game(); };
var intMain = window.setInterval(function() { Init.coreUpdate(); }, interval);
var intSave = window.setInterval(function() {
    if (init == true)
        saveData();
}, interval);
setTimeout(modulableInterval, refreshRate);
window.onbeforeunload = function() {
    intSave = undefined;
};