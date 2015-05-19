var options = {
	fps: 60,
	interval: (1000/60),
	now: undefined,
	before: undefined,
	init: false,
	numbers: "shortscale",
	theme: "Default",
	version: "v0.104",

	init: function() {
		save.loadData();
		save.checkData();

		success.init();

		this.before = new Date().getTime();
		$("#t-" + this.theme).attr("selected", "");
		$("#stylesheet").attr("href", themes[themeSelected.selectedIndex].path);
		$("#nav-version").html("(" + this.version + ")");
		
		if (player.name == "undefined") {
			$('#begin').modal('show');
			$('#alert-newplayer').css("display", "block");
		};
		// init bootstrap tooltip.js
		$(function () {
		  $('[data-toggle="tooltip"]').tooltip()
		});

		this.init = true;
	},
	update: function() {
		if (this.init == true) {
			this.now = new Date().getTime();
			var elapsedTime = this.now - this.before;
			if (elapsedTime > 17)
				quest.idle(Math.floor(elapsedTime/this.interval));
			else
				quest.idle(1);
			this.before = new Date().getTime();

			this.display();
			success.check();
		};
	},
	display: function() {
		if (this.init == true) {
			var goldRange = document.getElementById("craft-gold");
			var levelRange = document.getElementById("craft-level");
			var gemsRange = document.getElementById("craft-gems");
			var progress = Math.floor((player.xp/player.xpNeeded) * 100);
			var qprogress = Math.floor((quest.xp/quest.xpNeeded) * 100);

			if (progress > 100)
				progress = 100;
			if (qprogress > 100)
				qprogress = 100;
			
			// nav stats
			$("#nav-gold").html("Gold : " + fix(player.gold, "3d"));
			$("#nav-gems").html("Gems : " + fix(player.gems, "3d"));
			$("#nav-level").html("Level : " + fix(player.level, "0d"));
			$("#nav-playerprogress").css("width", progress + "%");
			// player related stats
			$("#player-progressbar").css("width", progress + "%");
			$("#player-progressbar-percent").html(progress + "%");
			$("#player-level").html(player.name + " level : " + fix(player.level, "0d"));
			$("#player-xp").html("XP : " + fix(player.xp, "1d") + "/" + fix(player.xpNeeded, "1d"));
			$("#player-gold").html("Gold : " + fix(player.gold, "3d"));
			$("#player-gems").html("Gems : " + fix(player.gems, "3d"));
			$("#player-sword").html(player.sword.name + " : +" + fix(player.sword.damage, "1d") + " dmg/click");
			$("#player-sword-percent").html("(" + fix(player.sword.percent, "1d") + "%)");
			$("#player-boots").html(player.boots.name + " : +" + fix(player.boots.speed, "1d") + " speed/click");
			$("#player-boots-percent").html("(" + fix(player.boots.percent, "1d") + "%)");
			$("#player-amulet").html(player.amulet.name + " : +" + fix(player.amulet.luck, "1d") + " luck");
			$("#player-amulet-percent").html("(" + fix(player.amulet.percent, "1d") + "%)");
			$("#player-prestigecost").html("Prestige cost : " + fix(helpers.prestigeCost(), "0d") + " levels");
			$("#player-prestigemultiplier").html("Prestige multiplier : x" + fix(player.multiplier, "0d"));
			// craft related stats
			$("#craft-goldcost").html(goldRange.value + "% gold");
			$("#craft-levelcost").html(levelRange.value + " levels");
			$("#craft-level").attr("max", player.level);
			$("#craft-gems").attr("max", player.gems);
			$("#craft-effect").html(fix(player.craft("stats-effect"), "1d") + " damage/speed (" + fix(player.craft("stats-percent"), "1d") + "%)");
			// leaderboards related
			$("#leaderboard-intro").html("Post your stats as the name of <u>" + player.name + "</u>.");
			// quest related
			$("#nav-questprogress").css("width", qprogress + "%");
			$("#quest-progressbar").css("width", qprogress + "%");
			$("#quest-progressbar-percent").html(qprogress + "%");
			$("#quest-info").html("Quest type : " + quest.type);
			$("#quest-name").html(quest.name);
			$("#quest-multiplier").html("Idle speed multiplier : x" + fix(quest.idleMultiplier, "2d"));
			document.title = "IQ - Level " + player.level + " (" + qprogress + "%)";
			// skills related
			$("#skills-idlemultiplier").html("Upgrade your idle-multiplier by 0.10!<br>Upgrade cost : " + fix(skills.idleMultiplierCost, "0d") + " gems");
			$("#skills-instantgold").html("Earn gold like if you were at level " + fix(player.level + 50, "0d") + "!<br>Cost : " + fix(skills.instantGoldCost, "0d") + " gems");
			// stats panel
			$("#stats-player").html("Current gold : " + fix(player.gold, "3d") + "<br>Total gold earned : " + fix(player.maxGold, "3d") + "<br>Current level : " + fix(player.level, "0d") + "<br>Max level : " + fix(player.maxLevel, "0d") + "<br>");
			// success related
			$("#success-points").html(fix(success.points, "0d") + " achievements points (currently useless)");
		};
	},
	trigger: function() {
		var shortscale = document.getElementById("options-shortscale");
		var scientific = document.getElementById("options-scientific");
		if (shortscale.checked == true)
			this.numbers = "shortscale";
		else
			this.numbers = "scientific";
	}
}

window.onload = function() {
	options.init();
};
window.onbeforeunload = function() {
	save.saveInterval = undefined; // clean save interval if connection is very bad to prevent save lose...
};
window.setInterval(function() {
	options.update();
}, options.interval)