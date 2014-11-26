var ic = {};

ic.version = 0.01;
ic.money = 0;
ic.icecube = 0;

ic.owned = [];

var buildings = [
    new Building("Cart Stand", 10, 1, 1.08)
];

// Saving system
function saveData() {
    localStorage.setItem('ic', JSON.stringify(ic));
};
function loadData() {
    var permIc = localStorage.getItem('ic');
    ic = JSON.parse(permIc);
};
function resetData() {
    localStorage.removeItem('ic');
    location.reload();
};

// Methods
function Building(name, price, reward, inflation) {
    this.name = name;
    this.price = price;
    this.reward = reward;
    this.inflation = inflation
};
function buyBuilding(index) {
    var p = buildings[index-1].price * Math.pow(buildings[index-1].inflation, ic.owned[index-1]);
    if (ic.money >= p) {
        ic.money -= p;
        ic.owned[index-1]++;
    };
};