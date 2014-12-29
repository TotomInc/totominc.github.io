// variables
var money; var ammo; var weed; var meth;
var progress; var before;
var init; var now; var fps = 60; var key = "BMKey_"; var interval = (1000 / fps); // interval = 16.6ms
var allVars = ['money', 'ammo', 'weed', 'meth', 'progress', 'before'];

// saving functions
function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); };
function getItem(key) { return JSON.parse(localStorage.getItem(key)); };
function removeItem(key) { localStorage.removeItem(key); };
function saveData() {
    for (var i = 0; i < allVars.length; i++) {
        setItem(key + allVars[i], window[allVars[i]]);
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
    }; location.reload();
};

// loading functions
function initVars() { // this will init all variables
    money = [0, 0];                     // money; total money
    ammo = [12, 1, 1500, 5000, 12, 0];  // stock; reward; time; reload time; max ammo; dark-ammo;
    weed = [0, 2, 0]; meth = [0, 4, 0]; // stock; reward; per/sec
    before = new Date().getTime();      // var needed when game is in background
    init = true;
};
function initDisplay() { // this will init the HTML from variables (only upgrades/ach/shop)
};

// update functions for loops
function updateDisplay() { // this will update the display every 'interval' ms or 16.66 ms
    $("#h-money").html(fix(money[0], 2) + "$");
    $("#s-money").html("Money : " + fix(money[0], 2) + "$");
    $("#s-ammo").html("Ammo : " + fix(ammo[0], 0) + "/" + fix(ammo[4], 0));
    $("#s-darkammo").html("Dark-ammo : " + fix(ammo[5]));
    $("#s-weed").html("Weed : " + fix(weed[0], 2) + "g");
    $("#s-weedP").html("<small>Weed price : " + fix(weed[1], 2) + "$/g</small>");
    $("#s-meth").html("Meth : " + fix(meth[0], 2) + "g");
    $("#s-methP").html("<small>Meth price : " + fix(meth[1], 2) + "$/g</small>");
    $("#s-before").html("<small>Before : " + before + "</small>");
};
function updateCore(times) { // this will update every 'core' functions
    if (init == true) {
        updateDisplay();
    };
};
function recover() { // recover lost when the game is in background - main loop function
    now = new Date().getTime();
    var elapsedTime = now - before;
    if (elapsedTime > 10) { updateCore(Math.floor(elapsedTime / 10)); } else { updateCore(1); };
    before = new Date().getTime();
};

// init loops
window.setInterval(function() { recover(); }, interval);
window.onload = function() { initVars(); initDisplay(); };