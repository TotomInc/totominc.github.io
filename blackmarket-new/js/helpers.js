function gainMoney(source) {
    money[0] += source;
    money[1] += source;
};
function getDrugPrice(index) {
    return drugPrice[index] * drugMultiplier[index];
};
function getShootReward() {
	return shoot[1] * shoot[7];
};