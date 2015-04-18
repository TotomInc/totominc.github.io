function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); };
function getItem(key) { return JSON.parse(localStorage.getItem(key)); };
function removeItem(key) { localStorage.removeItem(key); };
function saveData() {
    if (init == true) {
        for (var i = 0; i < allVars.length; i++) {
            setItem(key + allVars[i], window[allVars[i]]);
        };
    };
};
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(key + allVars[i]) != null && getItem(key + allVars[i]) != undefined) {
            window[allVars[i]] = getItem(key + allVars[i]);
        };
    };
    Log("Savegame loaded! Game have to check things before playing.");
};
function resetData() {
    for (var i = 0; i < allVars.length; i++) {
        removeItem(key + allVars[i]);
    };
};
function hardReset() {
    if (confirm("You are trying to hard-reset your save, it means that you will be restarting everything from scratch without any multiplier or bonuses! Note : this is not the prestige reset/soft-reset.")) {
        window.clearInterval(intSave);
        resetData();
        location.reload();
    };
};
function softReset() {
    if (confirm("You are trying to soft-reset. This means that you will start the game over but with " + fix(prestige[1]) + " experience. Check-out the tables panel to verify if you will get a prestige multiplier after your reset.")) {
        window.clearInterval(intSave);
        var temp = money[1];
        var temp2 = prestige[1];
        var temp3 = shoot[5];
        var temp4 = shoot[6];
        resetData();
        Init.variables();
        Upgrade.init();
        Build.init();
        Dealer.init();
        PrestigeUpgrade.init();
        money[1] = temp;
        prestige[0] = temp2;
        shoot[5] = temp3;
        shoot[6] = temp4;
        saveData();
        location.reload();
    };
};