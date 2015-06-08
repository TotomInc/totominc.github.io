var options = o = {};
var optionsfunctions = of = {};

o.init = false;
o.version = 0.001;
o.fps = 60;
o.interval = (1000/o.fps);
o.saving = true;
o.autoidle = true;
o.before = new Date().getTime();
o.now = new Date().getTime();

of.display = function() {
	var playerProgress = Math.floor((p.xp/p.xpNeeded) * 100);
	var questProgress = Math.floor((p.questXp/p.questXpNeeded) * 100);

	var a = document.getElementById('gold-slider');
	var b = document.getElementById('level-slider');

	$("#nav-title").html("Idle-Quester <small>(" + o.version + ")</small>");
	$("#nav-gold").html("Gold : " + fix(p.gold, 2));
	$("#nav-gems").html("Gems : " + fix(p.gems, 0));
	$("#nav-level").html("Level : " + fix(p.level, 0));

	$("#quest-progress").css('width', questProgress + '%');
	$("#quest-progress").html(questProgress + '%');
	$("#player-progress").css('width', playerProgress + '%');
	$("#player-progress").html(playerProgress + '%');

	$("#quest-stats").html("Quest type : " + returnQuestType() + "<br>Quest XP : " + fix(p.questXp, 0) + "/" + fix(p.questXpNeeded, 0) + "<br>" + p.questName);
	$("#player-stats").html("Gold : " + fix(p.gold, 2) + "<br>XP : " + fix(p.xp, 0) + "/" + fix(p.xpNeeded, 0) + "<br>" + p.name + " level : " + fix(p.level, 0));
	$("#player-sword").html(ps.name + " : +" + fix(ps.effect, 0) + " dmg<br>+" + fix(ps.percent, 0) + "%");
	$("#player-boots").html(pb.name + " : +" + fix(pb.effect, 0) + " spd<br>+" + fix(pb.percent, 0) + "%");

	$("#prestige-info").html("Prestige cost : " + fix(getPrestigeCost(), 0) + " levels<br>Current multiplier : x" + fix(p.multiplier, 2) + "<br>Tokens : " + fix(p.tokens, 0));

	$("#craft-gold").html(a.value + "% gold");
	$("#craft-level").html(b.value + " levels");
	$("#craft-effect").html(fix(pf.craft("stats"), 0) + " dmg (sword) / spd (boots)");
	$("#level-slider").attr('max', p.level);
};
of.autoidle = function() {
	var a = document.getElementById('autoidle-input');
	if (a.checked == true)
		o.autoidle = true;
	else
		o.autoidle = false;
};
of.coreloop = function() {
	if (o.init == true) {
		o.now = new Date().getTime();
		var elapsedTime = o.now - o.before;

		if (elapsedTime > 17)
			pf.idle(Math.floor(elapsedTime/o.interval));
		else
			pf.idle(1);

		o.before = new Date().getTime();

		of.display();
		scf.check();
	};
};
of.loading = function() {
	loadData();
	scf.init();

	if (p.name == undefined) {
		$('#begin').modal('show');
		var a = document.getElementById('autoidle-input');
		a.checked = false;
		of.autoidle();
	};

	o.init = true;

	of.waitingScreen();
};
of.waitingScreen = function() {
	if (o.init = true) {
		$("#game-area").css('display', 'block');
		$("#loading-area").css('display', 'none');
	} else {
		$("#game-area").css('display', 'none');
		$("#loading-area").css('display', 'block');
	};
};

window.onload = function() {
	of.loading();
};
var coreInterval = window.setInterval(function() {
	of.coreloop();
}, o.interval);
var saveDataInterval = window.setInterval(function() {
	if (o.init == true && o.saving == true)
		saveData();
}, 20);