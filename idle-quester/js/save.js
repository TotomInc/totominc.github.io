var save = {
	toSave: {
		player: player,
		quest: quest,
		options: options
	},
	saveData: function() {
		localStorage.setItem('IdleQuestSave', JSON.stringify(this.toSave));
	},
	removeData: function() {
		this.saveInterval = undefined;
		localStorage.removeItem('IdleQuestSave');
		location.reload();
	},
	loadData: function() {
		if (localStorage.getItem('IdleQuestSave') === null) {
			console.log("No save found!")
		} else {
			var savegame = JSON.parse(localStorage.getItem('IdleQuestSave'));
			// player
			var p = savegame.player;
			var pp = player;
			pp.xp = p.xp;
			pp.xpNeeded = p.xpNeeded;
			pp.level = p.level;
			pp.gold = p.gold;
			pp.gems = p.gems;
			pp.sword = p.sword;
			pp.boots = p.boots;
			pp.multiplier = p.multiplier;
			pp.prestigeCost = p.prestigeCost;
			pp.prestigeTimes = p.prestigeTimes;
			pp.name = p.name;
			// quest
			var q = savegame.quest;
			var qq = quest;
			qq.xp = q.xp;
			qq.xpNeeded = q.xpNeeded;
			qq.name = q.name;
			qq.type = q.type;
			qq.autoIdle = q.autoIdle;
			qq.idleMultiplier = q.idleMultiplier;
			// options
			var o = savegame.options;
			var oo = options;
			oo.theme = o.theme;
			oo.before = o.before;
			console.log("Save found and loaded!");
		}
	},
	exportData: function() {
		var saved = btoa(JSON.stringify(this.toSave));
		var exportField = document.getElementById("options-export");
		exportField.value = saved;
	},
	importData: function() {
		var importField = document.getElementById("options-import");
		var saved = JSON.parse(atob(importField.value));
		// player
		var p = saved.player;
		var pp = player;
		pp.xp = p.xp;
		pp.xpNeeded = p.xpNeeded;
		pp.level = p.level;
		pp.gold = p.gold;
		pp.gems = p.gems;
		pp.sword = p.sword;
		pp.boots = p.boots;
		pp.multiplier = p.multiplier;
		pp.prestigeCost = p.prestigeCost;
		pp.prestigeTimes = p.prestigeTimes;
		pp.name = p.name;
		// quest
		var q = saved.quest;
		var qq = quest;
		qq.xp = q.xp;
		qq.xpNeeded = q.xpNeeded;
		qq.name = q.name;
		qq.type = q.type;
		qq.autoIdle = q.autoIdle;
		qq.idleMultiplier = q.idleMultiplier;
		// options
		var o = saved.options;
		var oo = options;
		oo.theme = o.theme;
		oo.before = o.before;
	},
	saveInterval: window.setInterval(function() {
		save.saveData();
	}, 1000)
}