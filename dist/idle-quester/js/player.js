var player = p = {};
var playerfunctions = pf = {};

p.sword = ps = {};
ps.name = "Mediocre Sword";
ps.base = 100;
ps.effect = 100;
ps.percent = 100;

p.boots = pb = {};
pb.name = "Leather boots";
pb.base = 100;
pb.effect = 100;
pb.percent = 100;

p.name = undefined;
p.nickname = undefined;

p.gold = 0;
p.goldDrop = 85;
p.gems = 0;
p.gemDropped = false;
p.level = 1;
p.xp = 0;
p.xpNeeded = 100;

p.maxGold = 0;
p.maxGems = 0;
p.maxLevel = 0;

p.questXp = 0;
p.questXpNeeded = 100;
p.questType = 0;
p.questName = "Killing game devs";
p.speedQuestMultiplier = 1;
p.attackQuestMultiplier = 1;

p.multiplier = 1;
p.prestiges = 1; // number of prestige times (default is 1)
p.tokens = 0;

// idle function to gain exp/level (and levelup)
pf.idle = function(times) {
	var b = document.getElementById('level-slider');

	if (o.autoidle == true)
		if (p.questType == 0)
			p.questXp += (getPlayerAttack() / o.fps) * times;
		else
			p.questXp += (getPlayerSpeed() / o.fps) * times;

	if (p.questXp >= p.questXpNeeded) {
		p.xp += getPlayerXpReward();
		p.gold += getQuestGoldReward();
		pf.gemDrop();
		if (p.xp >= p.xpNeeded) {
			p.level++;
			p.xp -= p.xpNeeded;
			p.xpNeeded = getPlayerXpNeeded();
			b.value = p.level; // change the craft-level-slider position
		};
		p.questXp -= p.questXpNeeded;
		p.questXpNeeded = getQuestXpNeeded();
		pf.questTrigger();
		p.questName = changeQuestName();
	};
};
// function called to advance the quest when clicking
pf.click = function() {
	var random = Math.random() + 1;
	if (p.questType == 0)
		p.questXp += getPlayerAttack() / random;
	else
		p.questXp += getPlayerSpeed() / random;
};
// random gem drop when quest if finished
pf.gemDrop = function() {
	var random = Math.floor(Math.random() * 1000);
	if (p.gemDropped == false && random >= 995) {
		p.gems++;
		p.maxGems++;
		p.gemDropped = true;
	};
};
// auto-idle trigger function with checkbox
pf.questTrigger = function() {
	if (p.questType == 0)
		p.questType = 1;
	else
		if (p.questType == 1)
			p.questType = 0;
};
// crafting function
pf.craft = function(type) {
	var a = document.getElementById('gold-slider');
	var b = document.getElementById('level-slider');

	var goldcost = a.value * p.gold / 100;
	var levelcost = b.value;

	var effect = (0.06 * goldcost) * (0.15 * levelcost);

	if (type == "stats")
		return effect;
	if (type == "sword" || type == "boots") {
		if (effect >= 100) {
			p.gold -= goldcost;
			p.level -= levelcost;
			if (p.level <= 0)
				p.level = 1;
			p.xp = 0;
			p.xpNeeded = getPlayerXpNeeded();
			p.questXp = 0;
			p.questXpNeeded = getQuestXpNeeded();
			p.gemDropped = false;

			if (type == "sword") {
				ps.effect = effect;
				ps.percent = (effect/ps.base) * 100;
				ps.name = getSwordName();
			};
			if (type == "boots") {
				pb.effect = effect;
				pb.percent = (effect/pb.base) * 100;
				pb.name = getBootsName();
			};
		};
	};
};
// prestige function - equals to a soft-reset
pf.prestige = function() {
	var a = getPrestigeCost();
	if (p.level >= a) {
		o.saving = false;

		p.prestiges++;
		p.gold = 0;
		p.level = 1;
		p.xp = 0;
		p.xpNeeded = getPlayerXpNeeded();
		p.questXp = 0;
		p.questXpNeeded = getQuestXpNeeded();
		p.questType = 0;
		p.questName = "Killing game devs";

		p.multiplier = getPrestigeMultiplier();
		p.tokens++;

		ps.name = "Mediocre Sword";
		ps.base = 100;
		ps.effect = 100;
		ps.percent = 100;

		pb.name = "Leather boots";
		pb.base = 100;
		pb.effect = 100;
		pb.percent = 100;

		o.saving = true;
	};
};
// set player name if user is new
pf.setPlayerName = function() {
	var a = document.getElementById('begin-playername');
	p.name = a.value;
	$('#begin').modal('hide');
	var b = document.getElementById('autoidle-input');
	b.checked = true;
	of.autoidle();
};