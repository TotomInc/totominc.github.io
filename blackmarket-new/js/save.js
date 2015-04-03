function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); };
function getItem(key) { return JSON.parse(localStorage.getItem(key)); };
function removeItem(key) { localStorage.removeItem(key); };
function saveData() {
    if (init == true) {
        for (var i = 0; i < allVars.length; i++) {
            setItem(key + allVars[i], window[allVars[i]]);
        };
        console.log("Game saved!");
    };
};
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(key + allVars[i]) != null && getItem(key + allVars[i]) != undefined) {
            window[allVars[i]] = getItem(key + allVars[i]);
        };
    };
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