var data = new Firebase("https://idlerpg.firebaseio.com/");
var nickname = document.getElementById("data-setnickname");

/*
function submitScore() {
	var ref = new Firebase("https://idlerpg.firebaseio.com/scorelist/");

	if (player.name !== "undefined") {
		var playerName = player.name;
		var prestigeMultiplier = Math.floor(player.multiplier);
		var playerLevel = Math.floor(player.level);
		ref.child(playerName).set({
			name: playerName,
		  	prestige: prestigeMultiplier,
		  	level: playerLevel
		});
	};
};
*/
function getScore() {
	var ref = new Firebase("https://idlerpg.firebaseio.com/scorelist/");
	ref.on("value", function(snapshot) {
		var list = snapshot.val();
		// converting objects to arrays
		var scoreboard = $.map(list, function(value, index) {
		    return [value];
		});
		// updating scoreboard in html
		for (var i = 0; i < scoreboard.length; i++) {
			$("#leaderboard-body").append('<tr id="data-' + (i+1) + '"></tr>');
			$("#data-" + (i+1)).append('<th id="data-name-' + (i+1) + '"></th></tr>');
			$("#data-" + (i+1)).append('<td id="data-prestige-' + (i+1) + '"></td>');
			$("#data-" + (i+1)).append('<td id="data-level-' + (i+1) + '"></td>');
			$("#data-name-" + (i+1)).html(scoreboard[i].name);
			$("#data-prestige-" + (i+1)).html("x" + fix(scoreboard[i].prestige, "0d"));
			$("#data-level-" + (i+1)).html(fix(scoreboard[i].level, "0d"));
		};
	});
};