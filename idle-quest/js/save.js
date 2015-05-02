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
			// quest
			var q = savegame.quest;
			var qq = quest;
			qq.xp = q.xp;
			qq.xpNeeded = q.xpNeeded;
			qq.name = q.name;
			qq.type = q.type;
			qq.autoIdle = q.autoIdle;
			// options
			var o = savegame.options;
			var oo = options;
			oo.theme = o.theme;
			oo.before = o.before;
		}
	}
}