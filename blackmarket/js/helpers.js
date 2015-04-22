function gainMoney(source) {
    money[0] += source;
    money[1] += source;
};
function getExperience() {
	prestige[1] = Math.floor(30 * Math.sqrt(money[1]/1e7)) - experienceSpent;
	if (prestige[1] < 0) {
		prestige[1] = 0;
	};
	if (prestige[0] < 0) {
		prestige[0] = 0;
	};
};
function getDrugPrice(index) {
    return (drugPrice[index] * drugMultiplier[index]) * prestige[2];
};
function getShootReward() {
	return (((shoot[1] * shoot[7]) * prestige[2]) + shootPercentCash);
};
function getShootPercent() {
	return shootPercentCash = (shootPercent * (moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2])) / 100;
};
function getBuildPrice(index, jsType) {
	if (jsType == 0) {
		return weedBuilds[index].price * Math.pow(weedBuilds[index].inflation, weedBuildsOwned[index]);
	};
	if (jsType == 1) {
		return methBuilds[index].price * Math.pow(methBuilds[index].inflation, methBuildsOwned[index]);
	};
	if (jsType == 2) {
		return cocaineBuilds[index].price * Math.pow(cocaineBuilds[index].inflation, cocaineBuildsOwned[index]);
	};
};
function getDealerPrice(index, jsType) {
	if (jsType == 0) {
		return weedDealers[index].price * Math.pow(weedDealers[index].inflation, weedDealersOwned[index]);
	};
	if (jsType == 1) {
		return methDealers[index].price * Math.pow(methDealers[index].inflation, methDealersOwned[index]);
	};
	if (jsType == 2) {
		return cocaineDealers[index].price * Math.pow(cocaineDealers[index].inflation, cocaineDealersOwned[index]);
	};
};
function getDrugIncome(index, jsType) {
	if (jsType == 0) {
		return weedBuilds[index].reward * weedBuildsOwned[index];
	};
	if (jsType == 1) {
		return methBuilds[index].reward * methBuildsOwned[index];
	};
	if (jsType == 2) {
		return cocaineBuilds[index].reward * cocaineBuildsOwned[index];
	};
};
function getDealerSelling(index, jsType) {
	if (jsType == 0) {
		return weedDealers[index].sell * weedDealersOwned[index];
	};
	if (jsType == 1) {
		return methDealers[index].sell * methDealersOwned[index];
	};
	if (jsType == 2) {
		return cocaineDealers[index].sell * cocaineDealersOwned[index];
	};
};
/* display functions */
function getDrugProduction(index, jsType) {
	if (jsType == 0) {
		return weedBuilds[index].reward;
	};
	if (jsType == 1) {
		return methBuilds[index].reward;
	};
	if (jsType == 2) {
		return cocaineBuilds[index].reward;
	};
};
function getDealerSell(index, jsType) {
	if (jsType == 0) {
		return weedDealers[index].sell;
	};
	if (jsType == 1) {
		return methDealers[index].sell;
	};
	if (jsType == 2) {
		return cocaineDealers[index].sell;
	};
};
function isOdd(number) {
	return number % 2;
};