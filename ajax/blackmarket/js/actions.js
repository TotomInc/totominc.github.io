var isReloading = false;

function Action() { Log("Calling Action()"); };
Action.shoot = function() {
	if (shoot[0] > 0) {
		$("#a-1, #a-2").attr("oncheck", "");
		$("#a-1, #a-2").attr("class", "btn btn-success center-btn disabled");
        window.setTimeout(function() {
            shoot[0]--;
            shoot[5]++;
            gainMoney(getShootReward());
            $("#a-1").attr("oncheck", "Action.shoot();");
            $("#a-2").attr("oncheck", "Action.reload();");
            $("#a-1, #a-2").attr("class", "btn btn-success center-btn");
        }, shoot[3]);
        $("#shoot-actions").animate({width: "100%"}, shoot[3], "linear");
        $("#shoot-actions").animate({width: "0%"}, 0, "linear");
	};
};
Action.reload = function() {
	if (shoot[0] < shoot[2]) {
        isReloading = true;
		$("#a-1, #a-2").attr("oncheck", "");
		$("#a-1, #a-2").attr("class", "btn btn-success center-btn disabled");
        window.setTimeout(function() {
            shoot[0] = shoot[2];
            shoot[6]++;
            $("#a-1").attr("oncheck", "Action.shoot();");
            $("#a-2").attr("oncheck", "Action.reload();");
            isReloading = false;
            $("#a-1, #a-2").attr("class", "btn btn-success center-btn");
        }, shoot[4]);
        $("#reload-actions").animate({width: "100%"}, shoot[4], "linear");
        $("#reload-actions").animate({width: "0%"}, 0, "linear");
	};
};
Action.check = function() {
    if (shoot > 0) {
        $("#a-1").attr("class", "btn btn-success center-btn");
        $("#a-2").attr("class", "btn btn-success center-btn");
    } else {
        if (shoot[0] == shoot[2]) {
            $("#a-2").attr("class", "btn btn-success center-btn disabled");
        } else {
            if (shoot[0] <= 0 && isReloading == false) {
                $("#a-1").attr("class", "btn btn-success center-btn disabled");
                $("#a-2").attr("class", "btn btn-danger center-btn");
            };
        }
    };
    if (enableAutoShootCheckBox.checked == true) {
        $("#a-1").attr("class", "btn btn-success center-btn disabled");
    };
    if (enableAutoReloadCheckBox.checked == true) {
        $("#a-2").attr("class", "btn btn-success center-btn disabled");
    };
};
