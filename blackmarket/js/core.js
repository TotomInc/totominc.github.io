var money; var shoot; var prestige;
var d = []; var dName = []; var dPrice = []; var dSoldPS = [];
var dInit = [
    new Drug("Weed", 1),
    new Drug("Meth", 3),
    new Drug("Cocaine", 6)
];
var init; var fps = 60; var interval = (1000 / fps); var key = "BM-INC_";

// methods
function Drug(name, price) {
    this.name = name;
    this.price = price;
};

// init game
function initVars() {
    money = [0, 0];
    shoot = [0, 1, 12, 1500, 5000];

    for (var i = 0; i < dInit.length; i++) {
        d.push(0); dSoldPS.push(.5);
        dName.push(dInit[i].name); dPrice.push(dInit[i].price);
    };
};