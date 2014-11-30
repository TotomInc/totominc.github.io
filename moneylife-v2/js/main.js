var maxpx = $(document).height(); // get document height only
var headerpx = 45;
var marginpx = 10;
$(".row").css('max-height', (maxpx-headerpx-marginpx) + 'px');
$(".col-md-4").css('max-height', (maxpx-headerpx-marginpx) + 'px');

var money;
var totalMoney;
var tokens;

var tokensOn;
var tokensRate;

var gameInit = false;
var fps = 60;
var interval = (1000 / fps);

var t1 = [
    new Building("Lemonade Stand",      4,              1,              1.09, 1.5,  false),
    new Building("Newspaper Stand",     70,             60,             1.17, 3,    false),
    new Building("Car-Wash",            720,            540,            1.16, 6,    false),
    new Building("Gas Extractor",       8640,           4320,           1.15, 12,   false),
    new Building("Meth Lab",            103680,         51840,          1.14, 24,   false),
    new Building("Bank",                1244160,        622080,         1.13, 96,   false),
    new Building("Movie Studio",        14929920,       7464961,        1.12, 384,  false),
    new Building("Oil Company",         179159040,      89579521,       1.11, 576,  false),
    new Building("Ship Company",        2149908480,     1074954241,     1.10, 1296, false),
    new Building("Cookieverse",         25789901760,    29668737024,    1.09, 6144, false)
];
var t1owned = [];
var t1progress = [];

var managers = [
    new Manager("Cave Johnson (Lemonade Stand Manager)", 1000),
    new Manager("Rupert Murdoch (Newspaper Stand Manager)", 15000),
    new Manager("Gus (Car-Wash Manager)", 100000),
    new Manager("RichmanGas (Gas Extractor Manager)", 500000),
    new Manager("Heisenberg (Meth Lab Manager)", 1200000),
    new Manager("Rockfeller (Bank Manager)", 10000000),
    new Manager("Spielberg (Movie Studio Manager)", 111111111),
    new Manager("Harold Hamm (Oil Company Manager", 555555555),
    new Manager("Zoidberg (Ship Company Manager)", 10000000000),
    new Manager("Orteil (Cookieverse Manager)", 100000000000)
];
var managersOwned = [];

var cheatAvert = 0;
var moneyVerif = 0;
var totalmoneyVerif = 0;
var tokensVerif = 0;
var allVars = ["money","totalMoney","tokens","tokensOn","tokensRate","cheatAvert","t1owned","t1progress","moneyVerif","totalmoneyVerif","cheatAvert","tokensVerif","managersOwned"];

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
    for (var i = 0; i < allVars.length; i++)
        setItem(allVars[i], window[allVars[i]]);
};
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(allVars[i]) != null && getItem(allVars[i]) != undefined) {
            window[allVars[i]] = getItem(allVars[i]);
        };
    };
    updateStats();
    updateBuilds();
};
function resetData() {
    var r = confirm("Are you sure to hard-reset? You will not earn tokens, and will start everything from the beginning!");
    if (r == true) {
        var r2 = confirm("Are you really sure?");
        if (r2 == true) {
            for (var i = 0; i < allVars.length; i++) {
                removeItem(allVars[i]);
            }; location.reload();
        };
    };
};
function cheatReset() {
    alert("You have cheated too many times, the game will hard reset.")
    for (var i = 0; i < allVars.length; i++) {
        removeItem(allVars[i]);
    }; location.reload();
};
function softReset() {
    var r = confirm("Do you want to soft reset, restart everything from the beginning and goes from " + fix(tokens, 0) + " tokens to " + fix(getTokensOn(), 0) + " tokens?")
    if (r == true) {
        var temp1 = totalMoney;
        var temp2 = getTokensOn();
        var temp3 = cheatAvert;

        initVars();
        totalMoney = temp1;
        tokens = temp2;
        cheatAvert = temp3;
        saveData();

        location.reload();
    };
};

// Essentials functions
function initVars() {
    money = 0; totalMoney = money;
    tokens = 0; tokensOn = 0; tokensRate = 1;

    t1owned = [];
    for (var i = 0; i < t1.length; i++) { t1owned.push(0); };
    t1owned[0] = 1;

    t1progress = [];
    for (var i = 0; i < t1.length; i++) { t1progress.push(0); };

    managersOwned = [];
    for (var i = 0; i < managersOwned.length; i++) { managersOwned.push(false); };
};
function initGame() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-totalMoney").html("Total money : " + fix(totalMoney, 2) + "$");
    $("#s-tokens").html("Tokens : " + fix(tokens, 0));
    $("#s-tokensOn").html("Tokens on reset : " + fix(getTokensOn(), 0));
    $("#s-tokensRate").html("Tokens Rate : " + fix(tokensRate, 1) + "%");

    for (var i = 0; i < t1.length; i++) {
        var t = t1[i];
        $("#t1-n" + (i+1)).html(t.name + " :");
        $("#t1-r" + (i+1)).html(" " + fix(getInc(i) * t1owned[i], 2) + "$ ");
        $("#t1-o" + (i+1)).html("(" + t1owned[i] + " owned)");

        $("#t1-b" + (i+1) + "c1").html("x1 : " + fix(getPrice(i), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c1").attr('onclick', 'buyBuilding(' + i + ', 1)');
        $("#t1-b" + (i+1) + "c2").html("x10 : " + fix(displayPrice(i, 10), 2) + "$");
        $("#t1-b" + (i+1) + "c2").attr('onclick', 'buyBuilding(' + i + ', 10)');
        $("#t1-b" + (i+1) + "c3").html("x50 : " + fix(displayPrice(i, 50), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c3").attr('onclick', 'buyBuilding(' + i + ', 50)');
        $("#t1-b" + (i+1) + "c4").html("x100 : " + fix(displayPrice(i, 100), 2) + "$");
        $("#t1-b" + (i+1) + "c4").attr('onclick', 'buyBuilding(' + i + ', 100)');
    };

    for (var i = 0; i < managers.length; i++) {
        var m = managers[i];
        $("#m-n" + (i+1)).html(m.name + '<br>');
        $("#m-c" + (i+1)).html("cost : " + fix(m.price, 0) + "$");
        if (managersOwned[i]) { $("#s-m" + (i+1)).css('display', 'none'); };
    };
};
function updateGame(times) {
    times = 1;

    if (gameInit == true) {
        for (var i = 0; i < t1.length; i++)
            if (t1owned[i] > 0 && (t1progress[i] > 0 || managersOwned[i])) {
                var b = t1[i];
                var t = getTime(i);
                if (t1progress[i] += times / fps, managersOwned[i]) {
                    getMoney(Math.floor(t1progress[i] / t) * getInc(i) * t1owned[i]), t1progress[i] %= t;
                    var width = 100 * (t1progress[i] / t);.1 > t && (width = 100), width = Math.max(width, 1), updateStats(), $("#b-f" + (i + 1)).css("width", width + "%")
                } else if (t1progress[i] >= t && 1 == b.trigger) getMoney(getInc(i) * t1owned[i]), t1progress[i] = 0, b.trigger = !1, updateStats(), $("#b-f" + (i + 1)).css("width", 0);
                else {
                    var width = 100 * (t1progress[i] / t);
                    width = Math.max(width, 1), b.trigger = !0, $("#b-f" + (i + 1)).css("width", width + "%")
                }
            }

        $("#s-tokensOn").html("Tokens on reset : " + fix(getTokensOn(), 0));
    };
};

// Helpers
function getInc(source) {
    return t1[source].reward;
};
function getMoney(amount) {
    money += amount;
    totalMoney += amount;
    moneyVerif += amount;
    totalmoneyVerif += amount;
};
function getPrice(index) {
    var t = t1[index];
    return t.price * Math.pow(t.inflation, t1owned[index]);
};
function getTokensOn() {
    return Math.floor(10 * Math.sqrt(totalMoney/1e13));
};
function getTime(index) {
    return t1[index].time;
};
function displayPrice(index, amount) {
    var a = amount; var t = t1[index];
    var totalPrice = 0; var totalOwn = a + t1owned[index];
    while (totalOwn > t1owned[index]) {
        a--; totalOwn = a + t1owned[index];
        totalPrice += t.price * Math.pow(t.inflation, totalOwn);
    };
    return totalPrice;
};
function startBuild(index) {
    if (t1[index].trigger == false) {
        t1progress[index] = 0.01;
        t1[index].trigger = true;
    };
};
function updateBuilds() {
    for (var i = 0; i < t1.length; i++) {
        var t = t1[i];
        $("#t1-n" + (i+1)).html(t.name + " :");
        $("#t1-r" + (i+1)).html(" " + fix(getInc(i) * t1owned[i], 2) + "$ ");
        $("#t1-o" + (i+1)).html("(" + t1owned[i] + " owned)");
        $("#t1-b" + (i+1) + "c1").html("x1 : " + fix(getPrice(i), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c2").html("x10 : " + fix(displayPrice(i, 10), 2) + "$");
        $("#t1-b" + (i+1) + "c3").html("x50 : " + fix(displayPrice(i, 50), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c4").html("x100 : " + fix(displayPrice(i, 100), 2) + "$");
    };
};
function updateStats() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-totalMoney").html("Total money : " + fix(totalMoney, 2) + "$");
    $("#s-tokens").html("Tokens : " + fix(tokens, 0));
    $("#s-tokensOn").html("Tokens on reset : " + fix(getTokensOn(), 0));
    $("#s-tokensRate").html("Tokens Rate : " + fix(tokensRate, 1) + "%");
};
function a98q7w3q8z() {
    if (fps < 60) { cheatAvert++; alert("CHEAT DETECTED ! FPS changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); fps = 60; };
    if (fps > 60) { cheatAvert++; alert("CHEAT DETECTED ! FPS changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); fps = 60; };
    if (money > moneyVerif) { cheatAvert++; alert("CHEAT DETECTED ! Money changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); money = moneyVerif; };
    if (totalMoney > totalmoneyVerif) { cheatAvert++; alert("CHEAT DETECTED ! Total money changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); totalMoney = totalmoneyVerif; };
    if (tokens > tokensVerif) { cheatAvert++; alert("CHEAT DETECTED ! Tokens changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); tokens = tokensVerif; };
    if (cheatAvert == 3) { cheatReset(); };
};

// Methods
function Building(name, price, reward, inflation, time, trigger) {
    this.name = name;
    this.price = price;
    this.reward = reward;
    this.inflation = inflation;
    this.time = time;
    this.trigger = trigger;
};
function buyBuilding(index, buyAmount) {
    var amount = buyAmount;
    if (amount > 0) { for (var i = 0; i < amount; i++) { buyBuildingOnce(index); }; }
    else { while (money >= getPrice(index)) { buyBuildingOnce(index); }; };
    updateBuilds();
    updateStats();
};
function buyBuildingOnce(index) {
    if (money < getPrice(index)) { return; }
    else { money -= getPrice(index); moneyVerif -= getPrice(index); t1owned[index]++; };
};

function Manager(name, price) {
    this.name = name;
    this.price = price;
};
function buyManager(index) {
    if (money >= managers[index].price) {
        money -= managers[index].price;
        moneyVerif -= managers[index].price;
        managersOwned[index] = true;
        $("#s-m" + (index+1)).css('display', 'none');
        updateStats();
    };
};

// Onload + loops
window.onload = function() {
    initVars();
    loadData();
    initGame();
    gameInit = true;
};
window.setInterval(function() {
    updateGame();
}, interval);