var basePlayerXp = 100;
var playerXpPower = 1.25;

var baseQuestXp = 150;
var questXpPower = 1.25;
var questDivisor = 3;

var goldPower = 1.15;

function getPlayerAttack() {
	return (ps.effect * p.multiplier);
};
function getPlayerSpeed() {
	return (pb.effect * p.multiplier);
};
function getPlayerXpNeeded() {
	if (p.level > 1)
		return Math.floor(basePlayerXp * Math.pow(playerXpPower, player.level));
	else
		return basePlayerXp;
};
function getQuestXpNeeded() {
	if (p.level > 1)
		if (p.questType == 1)
			return Math.floor(baseQuestXp * Math.pow(questXpPower, p.level) * p.attackQuestMultiplier);
		else
			return Math.floor(baseQuestXp * Math.pow(questXpPower, p.level) * p.speedQuestMultiplier);
	else
		return baseQuestXp;
};
function getPlayerXpReward() {
	return p.questXpNeeded / questDivisor;
};
function getQuestGoldReward() {
	var random = Math.random() + 1;
	if (p.level > 1)
		return Math.floor((p.goldDrop * Math.pow(goldPower, p.level)) * random) * p.multiplier;
	else
		return (p.goldDrop * random) * p.multiplier;
};
function getPrestigeCost() {
	return (p.prestiges * 100);
};
function getPrestigeMultiplier() {
	if (p.prestiges == 2)
		return 2;
	else
		return (p.multiplier + p.multiplier);
};
function returnQuestType() {
	if (p.questType == 0)
		return "attack";
	else
		if (p.questType == 1)
			return "speed";
};
function changeQuestName() {
	if (p.questType == 0) {
		var str;
		var prefix = Math.floor(Math.random() * monsterPrefix.length);
		var root = Math.floor(Math.random() * monsterRoot.length);
		str = "Killing " + monsterPrefix[prefix] + " " + monsterRoot[root];
		return str;
	} else {
		if (p.questType == 1) {
			var str;
			var random = Math.floor(Math.random() * 100);
			var travelingRandom = Math.floor(Math.random() * traveling.length);
			var prefixRandom = Math.floor(Math.random() * travelingPrefix.length);
			str = traveling[travelingRandom] + " to the " + travelingPrefix[prefixRandom];
			return str;
		};
	};
};
function getSwordName() {
	var str;
	var prefix = Math.floor(Math.random() * swordPrefix.length);
	var root = Math.floor(Math.random() * swordRoot.length);
	str = swordPrefix[prefix] + " " + swordRoot[root];
	return str;
};
function getBootsName() {
	var str;
	var prefix = Math.floor(Math.random() * bootPrefix.length);
	var root = Math.floor(Math.random() * bootRoot.length);
	str = bootPrefix[prefix] + " " + bootRoot[root];
	return str;
};