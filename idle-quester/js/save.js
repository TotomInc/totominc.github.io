var save = s = {};

s.tosave = { player: player, options: options };

function saveData() {
	localStorage.setItem('IdleQuest-Save', JSON.stringify(s.tosave));
};
function removeData() {
	o.saving = false;
	localStorage.removeItem('IdleQuest-Save');
	location.reload();
};
function loadData() {
	if (localStorage.getItem('IdleQuest-Save') === null)
		console.log("No save found!");
	else {
		var savegame = JSON.parse(localStorage.getItem('IdleQuest-Save'));
		var so = savegame.options;
		var sp = savegame.player;
		var sps = savegame.player.sword;
		var spb = savegame.player.boots;

		if (o.version !== so.version)
			console.log("Warning! Loading save from an older version.");

		ps.name = sps.name;
		ps.base = sps.base;
		ps.effect = sps.effect;
		ps.percent = sps.percent;

		pb.name = spb.name;
		pb.base = spb.base;
		pb.effect = spb.effect;
		pb.percent = spb.percent;

		p.name = sp.name;
		p.nickname = sp.nickname;

		p.gold = sp.gold;
		p.gems = sp.gems;
		p.gemDropped = sp.gemDropped;
		p.level = sp.level;
		p.xp = sp.xp;
		p.xpNeeded = sp.xpNeeded;

		p.maxGold = sp.maxGold;
		p.maxGems = sp.maxGems;
		p.maxLevel = sp.maxLevel;

		p.questXp = sp.questXp;
		p.questXpNeeded = sp.questXpNeeded;
		p.questType = sp.questType;
		p.questName = sp.questName;

		p.multiplier = sp.multiplier;
		p.prestiges = sp.prestiges;
		p.tokens = sp.tokens;

		o.before = so.before;
		o.now = so.now;

		console.log("Save found and loaded.");
	};
};
function importData() {
	var a = document.getElementById("options-import");
	var savegame = JSON.parse(atob(a.value));
	var so = savegame.options;
	var sp = savegame.player;
	var sps = savegame.player.sword;
	var spb = savegame.player.boots;

	if (o.version !== so.version)
		console.log("Warning! Loading save from an older version.");

	ps.name = sps.name;
	ps.base = sps.base;
	ps.effect = sps.effect;
	ps.percent = sps.percent;

	pb.name = spb.name;
	pb.base = spb.base;
	pb.effect = spb.effect;
	pb.percent = spb.percent;

	p.name = sp.name;
	p.nickname = sp.nickname;

	p.gold = sp.gold;
	p.gems = sp.gems;
	p.gemDropped = sp.gemDropped;
	p.level = sp.level;
	p.xp = sp.xp;
	p.xpNeeded = sp.xpNeeded;

	p.maxGold = sp.maxGold;
	p.maxGems = sp.maxGems;
	p.maxLevel = sp.maxLevel;

	p.questXp = sp.questXp;
	p.questXpNeeded = sp.questXpNeeded;
	p.questType = sp.questType;
	p.questName = sp.questName;

	p.multiplier = sp.multiplier;
	p.prestiges = sp.prestiges;
	p.tokens = sp.tokens;
};
function exportData() {
	var a = btoa(JSON.stringify(s.tosave));
	var b = document.getElementById('options-export');
	b.value = a;
};