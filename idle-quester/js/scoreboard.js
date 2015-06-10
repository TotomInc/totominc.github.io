var data = new Firebase("https://idlequester.firebaseio.com/");
var ref = new Firebase("https://idlequester.firebaseio.com/scorelist/");
var score;

function submitScore() {
	var playerName = p.name;
	var playerGold = Math.floor(p.gold);
	var playerLevel = Math.floor(p.level);

	ref.child(playerName).set({
		name: playerName,
		gold: playerGold,
		level: playerLevel
	});
};
function initScore() {
	ref.on("value", function(snapshot) {
		console.log("Loading scorelist...")
		var list = snapshot.val();
		var scoreboard = $.map(list, function(value, index) {
		    return [value];
		});
		score = scoreboard;
	});
};
function refreshScore() {
	ref.on("value", function(snapshot) {
		var list = snapshot.val();
		// converting objects to arrays
		var scoreboard = $.map(list, function(value, index) {
		    return [value];
		});
		// updating scoreboard in html
		score = scoreboard;
		for (var i = 0; i < scoreboard.length; i++) {
			console.log("refreshScore");
			$("#data-name-" + (i+1)).html(score[i].name);
			$("#data-gold-" + (i+1)).html(fix(score[i].gold, 3));
			$("#data-level-" + (i+1)).html(fix(score[i].level, 0));
		};
	});
};
function generate() {
	for (var i = 0; i < score.length; i++) {
		console.log("Generating leaderboard table...");
		$("#leaderboard-body").append('<tr id="data-' + (i+1) + '"></tr>');
		$("#data-" + (i+1)).append('<th id="data-name-' + (i+1) + '"></th></tr>');
		$("#data-" + (i+1)).append('<td id="data-gold-' + (i+1) + '"></td>');
		$("#data-" + (i+1)).append('<td id="data-level-' + (i+1) + '"></td>');
	};
};