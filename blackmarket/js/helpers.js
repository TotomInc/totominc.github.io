// helpers functions
function gainMoney(source) {
    money[0] += source;
    money[1] += source;
};
function getBuildPrice(index) {
    return builds[index].price * Math.pow(builds[index].inflation, buildsOwned[index]);
};
function getDealerPrice(index) {
    return dealers[index].price * Math.pow(dealers[index].inflation, dealersOwned[index]);
};
function getDrugInc(index) { // used to gain in functions
    return ((builds[index].reward * buildsOwned[index])) / 187.5;
};
function getNormalDrugInc(index) { // used to display
    return (builds[index].reward * buildsOwned[index]);
};
function getDealerSell(index) { // used to gain in functions
    return (dealers[index].sell * dealersOwned[index]) / 187.5;
};
function getNormalDealerSell(index) { // used to display
    return (dealers[index].sell * dealersOwned[index]);
};
function getExperienceOnReset() {
    return Math.floor(25 * Math.sqrt(money[1]/1e6));
};
function getShootPercent() {
    return shootPercentCash = (shootPercent * money[2]) / 100;
};
function gunRankUp() {
    for (var i = 0; i < ranks.length; i++) {
        var r = ranks[i];
        if (money[1] >= r.needed) {
            rank = r.name;
            rankMultiplier = r.multiplier;
        };
    };
    $("#s-cg").html("Current gun : <b>" + rank + "</b><br>");
    $("#s-ob").html("Overall bonus : <b>x" + fix(rankMultiplier, 2) + "</b>");
};
function prestigeRankUp() {
    for (var i = 0; i < prestigeRanks.length; i++) {
        var p = prestigeRanks[i];
        if (prestige[0] >= p.needed) {
            prestige[2] = p.name;
            prestige[3] = p.multiplier;
        };
    };
    $("#s-pr").html("Prestige rank : <b>" + prestige[2] + "</b><br>");
    $("#s-pm").html("Prestige multiplier : <b>x" + fix(prestige[3], 2) + "</b>");
};
function offlineCalc() {
    var now = new Date().getTime();
    var offlineTime = now - before;
    buildReward(Math.floor(offlineTime/interval));
    dealerReward(Math.floor(offlineTime/interval));
};
function tutorial() {
    if (totalShoots == 0) {
        $("#a-i1").html("Tutorial : Click on the bar to shoot!");
    } else {
        if (totalShoots > 0 && totalShoots < 4) {
            $("#a-i1").html("Tutorial : Yeah, you understand how it works.<br>Shoot all your bullets now.");
        } else {
            if (totalShoots > 4 && totalShoots < 8) {
                $("#a-i1").html("Tutorial : When you shoot, you earn dollars.");
            } else {
                if (totalShoots > 8 && totalShoots < 11) {
                    $("#a-i1").html("Tutorial : You can see your stats on the top-bar.");
                };
            };
        };
    };
    if (totalShoots == 12) {
        $("#a-i2").html("Tutorial : No more ammo!<br>Click on the bar to reload and gain ammo!");
        $("#a-i1").css("display", "none");
    };
    if (totalReloads > 0) {
        $("#a-i2").css("display", "none");
    };
};