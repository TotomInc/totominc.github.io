ic = {};

ic.version = 0.01;
ic.money = 0;
ic.icecube = 0;

function saveData() {
    localStorage.setItem('ic', JSON.stringify(ic));
};
function loadData() {
    var permIc = localStorage.getItem('ic');
    ic = JSON.parse(permIc);
};
function resetData() {
    localStorage.removeItem('ic');
};