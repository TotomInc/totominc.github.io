var money; var shoot; var prestige;
var drugStock; var drugName; var drugPrice; var drugMultiplier;
var drugInit = [
    new Drug("Weed",        50),
    new Drug("Meth",        300),
    new Drug("Cocaine",     1250)
];

var fps = 60; var interval = (1000 / fps); var init = false;

function Log(text) { console.log("Blackmarket - " + text); };

function Init() { Log("Calling Init()"); };
Init.variables = function() {
	Log("Calling Init.variables()");
	money = [0, 0];
	shoot = [12, 1, 12, 1500, 5000, 0, 0, 1];
    prestige = [0, 0, 0, "no rank"];

    drugStock = []; drugName = []; drugPrice = []; drugMultiplier = [];
    for (var i = 0; i < drugInit.length; i++) {
        var d = drugInit[i];
        drugStock.push(0);
        drugName.push(d.name);
        drugPrice.push(d.price);
        drugMultiplier.push(1);
    };

    init = true;
};
Init.update = function() {
    if (init == true) {
        $("#navbar-money").html("Money : " + beautify(money[0], 2) + "$");
        $("#action-shoot").html("+" + beautify(getShootReward(), 2) + "$/shoot<br>" + beautify((shoot[3] / 1000), 2) + " sec/shoot");
        $("#action-reload").html(shoot[0] + "/" + shoot[2] + " ammo<br>" + beautify((shoot[4] / 1000), 2) + " sec/reload");
        $("#stats-money").html("Money : " + beautify(money[0], 2) + "$<br>Total Money : " + beautify(money[1], 2) + "$");
        $("#stats-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2] + "<br>Total shoots : " + shoot[5] + "<br>Total reloads : " + shoot[6]);
        $("#stats-weed").html("Weed price : " + beautify(getDrugPrice(0), 2) + "$/g<br>Weed multiplier : x" + drugMultiplier[0]);
        $("#stats-meth").html("Meth price : " + beautify(getDrugPrice(1), 2) + "$/g<br>Meth multiplier : x" + drugMultiplier[1]);
        $("#stats-cocaine").html("Cocaine price : " + beautify(getDrugPrice(2), 2) + "$/g<br>Cocaine multiplier : x" + drugMultiplier[2]);


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

function Action() { Log("Calling Action()"); };
Action.shoot = function() {
	if (shoot[0] > 0) {
		$("#a-1, #a-2").attr("onclick", "");
		$("#a-1, #a-2").attr("class", "btn btn-success center-btn disabled");
        window.setTimeout(function() {
            shoot[0]--;
            shoot[5]++;
            gainMoney(getShootReward());
            $("#a-1").attr("onclick", "Action.shoot();");
            $("#a-2").attr("onclick", "Action.reload();");
            $("#a-1, #a-2").attr("class", "btn btn-success center-btn");
        }, shoot[3]);
        $("#shoot-actions").animate({width: "100%"}, shoot[3], "linear");
        $("#shoot-actions").animate({width: "0%"}, 0, "linear");
        $("#shoot-navbar").animate({width: "100%"}, shoot[3], "linear");
        $("#shoot-navbar").animate({width: "0%"}, 0, "linear");
	};
};
Action.reload = function() {
	if (shoot[0] < shoot[2]) {
		$("#a-1, #a-2").attr("onclick", "");
		$("#a-1, #a-2").attr("class", "btn btn-success center-btn disabled");
        window.setTimeout(function() {
            shoot[0] = shoot[2];
            shoot[6]++;
            $("#a-1").attr("onclick", "Action.shoot();");
            $("#a-2").attr("onclick", "Action.reload();");
            $("#a-1, #a-2").attr("class", "btn btn-success center-btn");
        }, shoot[4]);
        $("#reload-actions").animate({width: "100%"}, shoot[4], "linear");
        $("#reload-actions").animate({width: "0%"}, 0, "linear");
        $("#reload-navbar").animate({width: "100%"}, shoot[4], "linear");
        $("#reload-navbar").animate({width: "0%"}, 0, "linear");
	};
};

function Drug(name, price) {
    this.name = name;
    this.price = price;
};

window.onload = function() {
	Init.variables();
    Upgrade.init();
};
window.setInterval(function() {
    Init.update();
}, interval);