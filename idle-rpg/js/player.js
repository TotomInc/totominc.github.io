var player = {
	xp: 0,
	xpNeeded: 100,
	level: 1,
	gold: 0,
	gems: 0,
	multiplier: 1,
	prestigeCost: 100,
	prestigeTimes: 1,

	sword: {
		name: "Mediocre Stick",
		base: 100,
		damage: 100,
		percent: 100
	},
	boots: {
		name: "Leather Boots",
		base: 100,
		speed: 100,
		percent: 100
	},
	amulet: {
		name: "Old Amulet",
		base: 100,
		luck: 100,
		percent: 100
	},
	charisma: {
		name: "Charisma",
		base: 100,
		charisma: 100,
		percent: 100
	},

	display: function() {
		var goldRange = document.getElementById("craft-gold");
		var levelRange = document.getElementById("craft-level");
		var gemsRange = document.getElementById("craft-gems");
		var progress = Math.floor((this.xp/this.xpNeeded) * 100);
		if (progress > 100)
			progress = 100;
		// nav stats
		$("#nav-gold").html("Gold : " + fix(this.gold, "3d"));
		$("#nav-gems").html("Gems : " + fix(this.gems, "3d"));
		$("#nav-level").html("Level : " + fix(this.level, "0d"));
		$("#nav-playerprogress").css("width", progress + "%");
		// player related stats
		$("#player-progressbar").css("width", progress + "%");
		$("#player-progressbar-percent").html(progress + "%");
		$("#player-level").html("Level : " + fix(this.level, "0d"));
		$("#player-xp").html("XP : " + fix(this.xp, "1d") + "/" + fix(this.xpNeeded, "1d"));
		$("#player-gold").html("Gold : " + fix(this.gold, "3d"));
		$("#player-gems").html("Gems : " + fix(this.gems, "3d"));
		$("#player-sword").html(this.sword.name + " : +" + fix(this.sword.damage, "1d") + " dmg/click");
		$("#player-sword-percent").html("(" + fix(this.sword.percent, "1d") + "%)");
		$("#player-boots").html(this.boots.name + " : +" + fix(this.boots.speed, "1d") + " speed/click");
		$("#player-boots-percent").html("(" + fix(this.boots.percent, "1d") + "%)");
		$("#player-amulet").html(this.amulet.name + " : +" + fix(this.amulet.luck, "1d") + " luck");
		$("#player-amulet-percent").html("(" + fix(this.amulet.percent, "1d") + "%)");
		$("#player-charisma").html(this.charisma.name + " : +" + fix(this.charisma.charisma, "1d") + " chr");
		$("#player-charisma-percent").html("(" + fix(this.charisma.charisma, "1d") + "%)");
		$("#player-prestigecost").html("Prestige cost : " + fix(helpers.prestigeCost(), "0d") + " levels");
		$("#player-prestigemultiplier").html("Prestige multiplier : x" + fix(this.multiplier, "0d"));
		// craft related stats
		$("#craft-goldcost").html(goldRange.value + "% gold");
		$("#craft-levelcost").html(levelRange.value + " levels");
		$("#craft-gemscost").html(gemsRange.value + " gems");
		$("#craft-level").attr("max", this.level);
		$("#craft-gems").attr("max", this.gems);
		$("#craft-effect").html(fix(this.craft("stats-effect"), "1d") + " damage/speed/luck (" + fix(this.craft("stats-percent"), "1d") + "%)");
	},
	craft: function(type) {
		var goldRange = document.getElementById("craft-gold");
		var levelRange = document.getElementById("craft-level");
		var gemsRange = document.getElementById("craft-gems");
		var effect = 0;
		var percent = 0;
		var goldCost = goldRange.value * this.gold / 100;
		var levelCost = levelRange.value;
		var gemsCost = gemsRange.value;

		if (gemsCost == 0)
			effect = (0.06 * goldCost) * (0.15* levelCost);
		else
			if (gemsCost >= 1)
				effect = (0.06 * goldCost) * (0.15 * levelCost) * (1 * gemsCost);

		percent = (effect/player.sword.base) * 100;

		if (type == "stats-effect")
			return effect;
		if (type == "stats-percent")
			return percent;
		if (type == "sword" || type == "boots" || type == "amulet") {
			if (effect >= this.sword.effect || effect > this.boots.speed) { // check if item will be better
				this.gold -= goldCost;
				this.level -= levelCost;
				if (this.level == 0)
					this.level = 1;
				this.gems -= gemsCost;
				this.xp = 0;
				quest.xp = 0;
				quest.xpNeeded = helpers.questXpNeeded();
				this.xpNeeded = helpers.playerXpNeeded();
				if (type == "sword") {
					this.sword.damage = effect;
					this.sword.percent = percent;
					this.sword.name = helpers.swordName();
				};
				if (type == "boots") {
					this.boots.speed = effect;
					this.boots.percent = percent;
					this.boots.name = helpers.bootsName();
				};
				if (type == "amulet") {
					this.amulet.luck = effect;
					this.amulet.percent = percent;
					this.amulet.name = helpers.amuletName();
				};
			};
		};
		
		levelRange.value = 0;
		$("#craft-level").attr("max", this.level);
		gemsRange.value = 0;
		$("#craft-gems").attr("max", this.gems);
	},
	prestige: function() {
		var cost = helpers.prestigeCost();
		if (player.level >= cost) {
			this.prestigeTimes++;
			this.level = 1;
			this.xp = 0;
			this.xpNeeded = 100;
			quest.xp = 0;
			quest.xpNeeded = 100;
			this.gold = 0;
			this.multiplier = helpers.prestigeMultiplier();
			quest.idleMultiplier = helpers.idleMultiplier();

			this.sword.name = "Mediocre Stick";
			this.sword.base = 100;
			this.sword.damage = 100;
			this.sword.percent = 100;

			this.boots.name = "Leather Boots";
			this.boots.base = 100;
			this.boots.speed = 100;
			this.boots.percent = 100;

			this.amulet.name = "Old Amulet";
			this.amulet.base = 100;
			this.amulet.luck = 100;
			this.amulet.percent = 100;

			this.charisma.name = "Charisma";
			this.charisma.base = 100;
			this.charisma.charisma = 100;
			this.charisma.percent = 100;
		};
	}
}