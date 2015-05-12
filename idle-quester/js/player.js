var player = {
	xp: 0,
	xpNeeded: 100,
	level: 1,
	gold: 0,
	gems: 0,
	multiplier: 1,
	prestigeCost: 100,
	prestigeTimes: 1,
	nickname: undefined,
	name: "undefined",

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

	craft: function(type) {
		var goldRange = document.getElementById("craft-gold");
		var levelRange = document.getElementById("craft-level");
		var effect = 0;
		var percent = 0;
		var goldCost = goldRange.value * this.gold / 100;
		var levelCost = levelRange.value;

		effect = (0.06 * goldCost) * (0.15* levelCost);
		percent = (effect/player.sword.base) * 100;

		if (type == "stats-effect")
			return effect;
		if (type == "stats-percent")
			return percent;
		if (type == "sword" || type == "boots" || type == "amulet") {
			if (effect >= this.sword.effect || effect > this.boots.speed || effect > this.amulet.luck) { // check if item will be better
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
		};
	},
	setName: function() {
		var inputName = document.getElementById("begin-playername");
		if (inputName.value.length > 1) {
			this.name = inputName.value;
			$("#begin-playername").attr("disabled", "");
			$('#begin').modal('hide');
		};
		if (player.name !== "undefined") {
			$('#begin').modal('hide');
		} else {
			$("#begin-alert").css('display', 'block');
		};
	}
}