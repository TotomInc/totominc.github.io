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
    $("#s-cg").html("Current gun : " + rank + "<br>");
    $("#s-ob").html("Overall bonus : x" + fix(rankMultiplier, 2));
};
function prestigeRankUp() {
    for (var i = 0; i < prestigeRanks.length; i++) {
        var p = prestigeRanks[i];
        if (prestige[0] >= p.needed) {
            prestige[2] = p.name;
            prestige[3] = p.multiplier;
        };
    };
    $("#s-pr").html("Prestige rank : " + prestige[2] + "<br>");
    $("#s-pm").html("Prestige multiplier : x" + fix(prestige[3], 2));
};
function offlineCalc() {
    var now = new Date().getTime();
    var offlineTime = now - before;
    buildReward(Math.floor(offlineTime/interval));
    dealerReward(Math.floor(offlineTime/interval));
};
function tutorial() {
    if (totalShoots == 0) {
        $("#a-i1").html("Click on the bar to shoot!");
    } else {
        if (totalShoots > 0 && totalShoots < 4) {
            $("#a-i1").html("Yeah, you understand how it works.<br>Shoot all your bullets now.");
        } else {
            if (totalShoots > 4 && totalShoots < 8) {
                $("#a-i1").html("When you shoot, you earn dollars.");
            } else {
                if (totalShoots > 8 && totalShoots < 11) {
                    $("#a-i1").html("You can see your stats on the top-bar.");
                };
            };
        };
    };
    if (totalShoots == 12) {
        $("#a-i2").html("No more ammo!<br>Click on the bar to reload and gain ammo!");
        $("#a-i1").css("display", "none");
    };
    if (totalReloads > 0) {
        $("#a-i2").css("display", "none");
    };
};
function whatIsPrestige() {
    alert("Your prestige rank is determined by your experience. Check the table below to see what ranks are available, and how many experienced they need.\nWhen you're going to soft-reset, you lose everything but not total money and experience, but restart everything.\nYour prestige rank (if you got one) will give you a prestige multiplier determined by your prestige rank.\nFor example, if you do a reset and got 100 exp, you will gain the rank Bronze Elite, which will give you a prestige multiplier of x6.00");
};