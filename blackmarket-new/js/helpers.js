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
function getBuildPrice(index, jsType) {
	if (jsType == 0) {
		return weedBuilds[index].price * Math.pow(weedBuilds[index].inflation, weedBuildsOwned[index]);
	};
};
function getDealerPrice(index, jsType) {
	if (jsType == 0) {
		return weedDealers[index].price * Math.pow(weedDealers[index].inflation, weedDealersOwned[index]);
	};
};
function getDrugIncome(index, jsType) {
	if (jsType == 0) {
		return weedBuilds[index].reward * weedBuildsOwned[index];
	};
};
function getDealerSelling(index, jsType) {
	if (jsType == 0) {
		return weedDealers[index].sell * weedDealersOwned[index];
	};
};
/* display functions */
function getDrugProduction(index, jsType) {
	if (jsType == 0) {
		return weedBuilds[index].reward;
	};
};
function getDealerSell(index, jsType) {
	if (jsType == 0) {
		return weedDealers[index].sell;
	};
};