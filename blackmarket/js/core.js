var money; var shoot; var prestige;
var dStock = []; var dName = []; var dPrice = []; var dSoldPS = [];
var dInit = [
    new Drug("Weed", 1),
    new Drug("Meth", 3),
    new Drug("Cocaine", 6)
];
var init; var fps = 60; var interval = (1000 / fps); var key = "BM-INC_";

// game display
function initVars() {
    money = [0, 0];
    shoot = [12, 1, 12, 1500, 5000];

    for (var i = 0; i < dInit.length; i++) {
        dStock.push(0);
        dSoldPS.push(.5);
        dName.push(dInit[i].name);
        dPrice.push(dInit[i].price);
    };
};
function initGame() {
    for (var i = 0; i < dInit.length; i++) {
        var d = dInit[i];
        $("#h-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g");
    };

    $("#h-money").html("Money : " + fix(money[0], 2) + "$");
    $("#h-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2]);
    $("#a-n1").html("Shoot : +" + fix(shoot[1], 2) + "$");
    $("#a-d1").html(fix(shoot[3]/1000, 1) + " sec/shoot");
    $("#a-n2").html("Reload : +" + fix(shoot[2], 0) + " ammo");
    $("#a-d2").html(fix(shoot[4]/1000, 1) + " sec");

    $("#f-1, #f-2").css("width", 0 + "%");
    $("#p-1").attr("onclick", "shootAction();");
    $("#p-2").attr("onclick", "reloadAction();");
};
function displayGame() {
    for (var i = 0; i < dInit.length; i++) {
        var d = dInit[i];
        $("#h-d" + (i+1)).html(d.name + " : " + fix(dStock[i], 2) + "g");
    };

    $("#h-money").html("Money : " + fix(money[0], 2) + "$");
    $("#h-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2]);
};

// helpers functions
function gainMoney(source) {
    money[0] += source;
    money[1] += source;
};

// basic functions
function shootAction() {
    if (shoot[0] > 0) {
        shoot[0] -= 1;
        $("#p-1, #p-2").attr("onclick", "");
        window.setTimeout(function() {
            gainMoney(shoot[1]);
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
        }, shoot[3]);
        $("#f-1").animate({width: "100%"}, shoot[3], "linear");
        $("#f-1").animate({width: "0%"}, 0, "linear");
    };
};
function reloadAction() {
    if (shoot[0] < shoot[2]) {
        $("#p-1, #p-2").attr("onclick", "");
        window.setTimeout(function() {
            shoot[0] = shoot[2];
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
        }, shoot[4]);
        $("#f-2").animate({width: "100%"}, shoot[4], "linear");
        $("#f-2").animate({width: "0%"}, 0, "linear");
    };
};

// methods
function Drug(name, price) {
    this.name = name;
    this.price = price;
};

// loading + interval
window.onload = function() {
    initVars();
    initGame();
};
window.setInterval(function() {
    displayGame();
}, interval);