var money; var shoot;

var fps = 60; var interval = (1000 / fps);

function Log(text) { console.log("Blackmarket - " + text); };

function Init() { Log("Calling Init()"); };
Init.variables = function() {
	Log("Calling Init.variables()");
	money = [0, 0];
	shoot = [12, 1, 12, 1500, 5000, 0, 0];
};
Init.update = function() {
    $("#action-shoot").html("+" + beautify(shoot[1], 2) + "$/shoot<br>" + beautify((shoot[3] / 1000), 2) + " sec/shoot");
    $("#action-reload").html(shoot[0] + "/" + shoot[2] + " ammo<br>" + beautify((shoot[4] / 1000), 2) + " sec/reload");
    $("#stats-money").html("Money : " + beautify(money[0], 2) + "$<br>Total Money : " + beautify(money[1], 2) + "$");
    $("#stats-ammo").html("Ammo : " + shoot[0] + "/" + shoot[2] + "<br>Total shoots : " + shoot[5] + "<br>Total reloads : " + shoot[6]);

    if (shoot[0] == shoot[2]) {
        $("#a-2").attr("class", "btn btn-success center-btn disabled");
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
            Helper.gainMoney(shoot[1]);
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

function Helper() { Log("Calling Helper()"); };
Helper.gainMoney = function(source) {
    money[0] += source;
    money[1] += source;
};

window.onload = function() {
	Init.variables();
};
window.setInterval(function() {
    Init.update();
}, interval);