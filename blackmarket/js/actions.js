// basic actions functions
function shootAction() {
    if (shoot[0] > 0) {
        $("#p-1, #p-2").attr("onclick", "");
        $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#999");
        $("#a-t1, #a-t2").css("display", "none");
        window.setTimeout(function() {
            shoot[0] -= 1;
            totalShoots++;
            gainMoney(((shoot[1]) * rankMultiplier) * prestige[3] + shootPercentCash);
            shootEvent();
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
            $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#31708f");
            $("#a-t1, #a-t2").css("display", "block");
        }, shoot[3]);
        $("#f-1").animate({width: "100%"}, shoot[3], "linear");
        $("#f-1").animate({width: "0%"}, 0, "linear");
    };
};
function shootEvent() {
    var r = Math.floor((Math.random() * 100) + 1);
    if (r < 5) {
        gainMoney((shoot[1] * rankMultiplier) * prestige[3] + shootPercentCash);
        $("#a-eventLog").html("Headshot! Income x2 for this shot!");
        $("#a-eventLog").fadeOut(3000, function() {
            $("#a-eventLog").html("");
            $("#a-eventLog").attr("style", "");
        });
    };
    if (r < 7 && r >= 5) {
        gainMoney(((shoot[1] * 7) * rankMultiplier) * prestige[3] + shootPercentCash);
        $("#a-eventLog").html("Rival gang boss killed! Income x7 for this shot!");
        $("#a-eventLog").fadeOut(3000, function() {
            $("#a-eventLog").html("");
            $("#a-eventLog").attr("style", "");
        });
    };
};
function reloadAction() {
    if (shoot[0] < shoot[2]) {
        $("#p-1, #p-2").attr("onclick", "");
        $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#999");
        $("#a-t1, #a-t2").css("display", "none");
        window.setTimeout(function() {
            shoot[0] = shoot[2];
            totalReloads++;
            $("#p-1").attr("onclick", "shootAction();");
            $("#p-2").attr("onclick", "reloadAction();");
            $("#f-1").attr("class", "progress-bar progress-bar-success active");
            $("#f-1").css("width", "0%");
            $("#a-n1, #a-n2, #a-d1, #a-d2").css("color", "#31708f");
            $("#a-t1, #a-t2").css("display", "block");
        }, shoot[4]);
        $("#f-2").animate({width: "100%"}, shoot[4], "linear");
        $("#f-2").animate({width: "0%"}, 0, "linear");
    };
};