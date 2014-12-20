var money;
var drugStock; var drugReward; var drugTime; var drugSelling;
var drugRewardMultiplier; var drugTimeMultiplier;
var drugs = [
    new Drug("Drug 1", 7500, 5),
    new Drug("Drug 2", 15000, 15),
    new Drug("Drug 3", 30000, 45),
    new Drug("Drug 4", 60000, 135)
];
var init = false; var pepper = "BlackmarketInc";
var allVars = ['drugStock','drugReward','drugTime','drugSelling','drugRewardMultiplier','drugTimeMultiplier']

function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); };
function getItem(key) { return JSON.parse(localStorage.getItem(key)); };
function removeItem(key) { localStorage.removeItem(key); };
function saveData() { for (var i = 0; i < allVars.length; i++) { setItem(pepper+allVars[i], window[allVars[i]]); }; };
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(pepper+allVars[i]) != null && getItem(pepper+allVars[i]) != undefined) {
            window[allVars[i]] = getItem(pepper+allVars[i]);
        };
    };
};
function resetData() {
    for (var i = 0; i < allVars.length; i++) {
        removeItem(allVars[i]);
    }; location.reload();
};

function initVars() {
    money = 0;
    drugStock = []; drugReward = []; drugTime = []; drugSelling = [];
    drugRewardMultiplier = []; drugTimeMultiplier = [];
    for (var i = 0; i < drugs.length; i++) {
        drugStock.push(0); drugSelling.push(1);
        drugRewardMultiplier.push(1); drugTimeMultiplier.push(1);
        drugTime[i] = drugs[i].time;
        drugReward[i] = drugs[i].reward;
    };
    init = true; console.log("Game init : " + init);
};

// Methods
function Drug(name, time, reward) {
    this.name = name;
    this.time = time;
    this.reward = reward;
};

window.onload = function() {
    initVars();
    loadData();
};