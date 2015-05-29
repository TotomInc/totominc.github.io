function gainMoney(source) {
    money[0] += source;
    money[1] += source;
};
function getExperience() {
	prestige[1] = Math.floor(35 * Math.sqrt(money[1]/1e7)) - (experienceSpent);
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
function getAchievementsOwned(type) {
	if (type == "money") {
		var owned = 0;
		for (var i = 0; i < totalMoneyAchOwned.length; i++) {
			if (totalMoneyAchOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == "exp") {
		var owned = 0;
		for (var i = 0; i < experienceAchOwned.length; i++) {
			if (experienceAchOwned[i] == true) { owned++; };	
		};
		return owned;
	};
	if (type == "shoot") {
		var owned = 0;
		for (var i = 0; i < shootAchOwned.length; i++) {
			if (shootAchOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == "reload") {
		var owned = 0;
		for (var i = 0; i < reloadAchOwned.length; i++) {
			if (reloadAchOwned[i] == true) { owned++; };
		};
		return owned;
	};
};
function getUpgradesOwned(type) {
	if (type == "shoot-reward") {
		var owned = 0;
		for (var i = 0; i < shootRewardUpgrades.length; i++) {
			if (shootRewardUpgradesOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == "shoot-time") {
		var owned = 0;
		for (var i = 0; i < shootTimeUpgradesOwned.length; i++) {
			if (shootTimeUpgradesOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == "ammo") {
		var owned = 0;
		for (var i = 0; i < ammoStockUpgradesOwned.length; i++) {
			if (ammoStockUpgradesOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == "reload-time") {
		var owned = 0;
		for (var i = 0; i < reloadTimeUpgradesOwned.length; i++) {
			if (reloadTimeUpgradesOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == "weed-price") {
		var owned = 0;
		for (var i = 0; i < weedPriceUpgradesOwned.length; i++) {
			if (weedPriceUpgradesOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == "meth-price") {
		var owned = 0;
		for (var i = 0; i < methPriceUpgradesOwned.length; i++) {
			if (methPriceUpgradesOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == "cocaine-price") {
		var owned = 0;
		for (var i = 0; i < cocainePriceUpgradesOwned.length; i++) {
			if (cocainePriceUpgradesOwned[i] == true) { owned++; };
		};
		return owned;
	};
};
function getPrestigeUpgradesOwned(type) {
	if (type == 'drugs') {
		var owned = 0;
		for (var i = 0; i < prestigeUpgrades.length; i++) {
			if (prestigeUpgradesOwned[i] == true) { owned++; };
		};
		return owned;
	};
	if (type == 'shoot-reward') {
		var owned = 0;
		for (var i = 0; i < prestigeShoot.length; i++) {
			if (prestigeShootOwned[i] == true) { owned++; };
		};
		return owned;
	};
};
function getGunReward(index) {
	var mps = moneyPerSec[0] + moneyPerSec[1] + moneyPerSec[2];
	return mps / guns[index].multiplier;
};
function isOdd(number) {
	return number % 2;
};