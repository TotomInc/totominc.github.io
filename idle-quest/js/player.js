var player = {
	xp: 0,
	xpNeeded: 100,
	level: 1,
	gold: 0,
	gems: 0,

	sword: {
		name: "Sword",
		base: 100,
		damage: 100,
		percent: 100
	},
	boots: {
		name: "Boots",
		base: 100,
		speed: 100,
		percent: 100
	},

	display: function() {
		var goldRange = document.getElementById("craft-gold");
		var levelRange = document.getElementById("craft-level");
		var progress = Math.floor((this.xp/this.xpNeeded) * 100);
		if (progress > 100)
			progress = 100;

		$("#player-progressbar").css("width", progress + "%");
		$("#player-progressbar-percent").html(progress + "%");
		$("#nav-gold").html("Gold : " + fix(this.gold, "3d"));
		$("#nav-gems").html("Gems : " + fix(this.gems, "3d"));
		$("#nav-level").html("Level : " + fix(this.level, "0d"));
		$("#player-level").html("Level : " + fix(this.level, "0d"));
		$("#player-xp").html("XP : " + fix(this.xp, "1d") + "/" + fix(this.xpNeeded, "1d"));
		$("#player-gold").html("Gold : " + fix(this.gold, "3d"));
		$("#player-gems").html("Gems : " + fix(this.gems, "3d"));
		$("#player-sword").html(this.sword.name + " : +" + fix(this.sword.damage, "1d") + " dmg/click");
		$("#player-sword-percent").html("(" + fix(this.sword.percent, "1d") + "%)");
		$("#player-boots").html(this.boots.name + " : +" + fix(this.boots.speed, "1d") + " speed/click");
		$("#player-boots-percent").html("(" + fix(this.boots.percent, "1d") + "%)");
		$("#craft-goldcost").html(goldRange.value + "% gold");
		$("#craft-levelcost").html(levelRange.value + " levels");
		$("#craft-level").attr("max", this.level);
		$("#craft-effect").html(fix(this.craft("stats-effect"), "1d") + " damage/speed (" + fix(this.craft("stats-percent"), "1d") + "%)");
	},
	craft: function(type) {
		var goldRange = document.getElementById("craft-gold");
		var levelRange = document.getElementById("craft-level");
		var effect = 0;
		var percent = 0;
		var goldCost = goldRange.value * this.gold / 100;
		var levelCost = levelRange.value;

		effect = (0.03 * goldCost) * (0.07 * levelCost);
		percent = (effect/player.sword.base) * 100;

		if (type == "stats-effect")
			return effect;
		if (type == "stats-percent")
			return percent;
		if (type == "sword" || type == "boots") {
			if (effect >= this.sword.effect || effect > this.boots.speed) { // check if item will be better
				this.gold -= goldCost;
				this.level -= levelCost;
				if (this.level == 0)
					this.level = 1;
				this.xp = 0;
				quest.xp = 0;
				quest.xpNeeded = helpers.questXpNeeded();
				this.xpNeeded = helpers.playerXpNeeded();
				if (type == "sword") {
					this.sword.damage = effect;
					this.sword.percent = percent;
				};
				if (type == "boots") {
					this.boots.speed = effect;
					this.boots.percent = percent;
				};
			};
		};
		levelRange.value = 0;
		$("#craft-level").attr("max", this.level);
	}
}