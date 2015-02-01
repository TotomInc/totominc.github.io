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
    window.clearInterval(intSave);
    location.reload();
};
function checkData() {
    if (dealersOwned.length != checkDealers.length || buildsOwned.length != checkBuilds.length) {
        if (dealersOwned.length != checkDealers.length) {
            alert("Old save detected! Game is trying to convert your save, if you see an error like NaN g or $, please wipe your save and let me know that you have the bug! Thanks.");
            for (var i = 0; i < dealers.length; i++) {
                if (dealersOwned[i] == undefined) {
                    dealersOwned.push(0);
                };
            };
        };
        if (buildsOwned.length != checkBuilds.length) {
            alert("Old save detected! Game is trying to convert your save, if you see an error like NaN instead of numbers, please wipe your save and let me know that you have the bug! Thanks.");
            for (var i = 0; i < builds.length; i++) {
                if (buildsOwned[i] == undefined) {
                    buildsOwned.push(0);
                };
            };
        };
    };
};
function hardReset() {
    if (confirm("Do you really want to hard-reset the game, lost everything and restart from scratch?")) {
        resetData();
    };
};