var money; var moneyPerSec; var shoot; var prestige;
var drugStock; var drugName; var drugPrice; var drugMultiplier; var drugPerSec;
var drugInit = [
    new Drug("Weed",        50),
    new Drug("Meth",        300),
    new Drug("Cocaine",     1250)
];

var fps = 60; var interval = (1000 / fps); var init = false; var before; var now; var key = "Blackmarket-";
var allVars = [
    'money', 'shoot', 'prestige', 'before',
    'drugStock', 'drugMultiplier',
    'shootRewardUpgradesOwned', 'shootTimeUpgradesOwned', 'ammoStockUpgradesOwned', 'reloadTimeUpgradesOwned', 'weedPriceUpgradesOwned', 'methPriceUpgradesOwned', 'cocainePriceUpgradesOwned',
    'weedBuildsOwned',
    'weedDealersOwned'
];

function Log(text) { console.log("Blackmarket - " + text); };

function Init() { Log("Calling Init()"); };
Init.variables = function() {
	Log("Calling Init.variables()");
	money = [0, 0];
	shoot = [12, 1, 12, 1500, 5000, 0, 0, 1];
    prestige = [0, 0, 0, "no rank"];

    drugStock = []; drugName = []; drugPrice = []; drugMultiplier = []; drugPerSec = []; moneyPerSec = [];
    for (var i = 0; i < drugInit.length; i++) {
        var d = drugInit[i];
        drugStock.push(0);
        drugName.push(d.name);
        drugPrice.push(d.price);
        drugPerSec.push(0);
        drugMultiplier.push(1);
        moneyPerSec.push(0);
    };

    before = new Date().getTime();
    init = true;
};
Init.update = function() {
    if (init == true) {
        $("#navbar-money").html("Money : " + fix(money[0]) + "$");
        $("#action-shoot").html("+" + fix(getShootReward()) + "$/shoot<br>" + fix((shoot[3] / 1000)) + " sec/shoot");
        $("#action-reload").html(shoot[0] + "/" + shoot[2] + " ammo<br>" + fix((shoot[4] / 1000)) + " sec/reload");
        $("#stats-money").html("Money : " + fix(money[0]) + "$<br>Total Money : " + fix(money[1]) + "$");
        $("#stats-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2] + "<br>Total shoots : " + shoot[5] + "<br>Total reloads : " + shoot[6]);
        $("#stats-weed").html("Weed stock : " + fix(drugStock[0]) + "g (" + fix(drugPerSec[0]) + "g/sec)<br>Weed price : " + fix(getDrugPrice(0)) + "$/g<br>Weed multiplier : x" + fix(drugMultiplier[0]));
        $("#stats-meth").html("Meth stock : " + fix(drugStock[1]) + "g (" + fix(drugPerSec[1]) + "g/sec)<br>Meth price : " + fix(getDrugPrice(1)) + "$/g<br>Meth multiplier : x" + fix(drugMultiplier[1]));
        $("#stats-cocaine").html("Cocaine stock : " + fix(drugStock[2]) + "g (" + fix(drugPerSec[2]) + "g/sec)<br>Cocaine price : " + fix(getDrugPrice(2)) + "$/g<br>Cocaine multiplier : x" + fix(drugMultiplier[2]));
        $("#stats-weedcash").html("Money from weed : " + fix(moneyPerSec[0]) + "$/sec<br>");
        $("#stats-methcash").html("Money from meth : " + fix(moneyPerSec[1]) + "$/sec<br>");
        $("#stats-cocainecash").html("Money from cocaine : " + fix(moneyPerSec[2]) + "$/sec<br>");
        $("#stats-totalmoneypersec").html("Money per sec : " + fix(moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2]) + "$/sec");

        if (shoot > 0) {
            $("#a-1").attr("class", "btn btn-success center-btn");
            $("#a-2").attr("class", "btn btn-success center-btn");
        } else {
            if (shoot[0] == shoot[2]) {
                $("#a-2").attr("class", "btn btn-success center-btn disabled");
            } else {
                if (shoot[0] == 0) {
                    $("#a-1").attr("class", "btn btn-success center-btn disabled");
                    $("#a-2").attr("class", "btn btn-danger center-btn");
                };
            }
        };
    };
};
Init.game = function() {
    Init.variables();
    Upgrade.init();
    Build.init();
    Dealer.init();
    loadData();
    Upgrade.saveCheck();
    Build.check();
    Dealer.check();
    resize();
};
Init.coreUpdate = function() {
    if (init == true) {
        now = new Date().getTime();
        var elapsedTime = now - before;
        if (elapsedTime > interval) {
            Build.earn(Math.floor(elapsedTime / interval));
            Dealer.sell();
        } else {
            Build.earn(1);
            Dealer.sell();
        };
        Init.update();
        before = new Date().getTime();
    };
};

function Drug(name, price) {
    this.name = name;
    this.price = price;
};

window.onload = function() {
    Init.game();
};
window.setInterval(function() {
    Init.coreUpdate();
}, interval);
var intSave = window.setInterval(function() {saveData(); }, 5000);