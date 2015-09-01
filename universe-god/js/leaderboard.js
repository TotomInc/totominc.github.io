g.leaderboard = {};
var firebase = new Firebase("https://universe-god.firebaseio.com/");
var ref = new Firebase("https://universe-god.firebaseio.com/scorelist/");
var htmlForPath = {};
var usernameExists;
var score;

game.leaderboard.setUsername = function() {
	var a = $("#leaderboard-input").val();
	game.leaderboard.checkIfUserExists(a);
	if (usernameExists == false && g.username == undefined && a.length >= 3 && a.indexOf('<') == -1 && a.indexOf("'") == -1 && a.indexOf('"') == -1) {
		$("#leaderboard-input").attr('disabled', '');
		$("#leaderboard-input").attr('placeholder', '');
		g.username = $("#leaderboard-input").val();
		$("#leaderboard-input").val(g.username);
	};
	if (g.username !== undefined) {
		game.leaderboard.submitScore();
	};
};
game.leaderboard.check = function() {
	if (g.username !== undefined) {
		$("#leaderboard-btn").attr('onclick', 'game.leaderboard.submitScore()');
		$("#leaderboard-input").attr('disabled', '');
		$("#leaderboard-input").attr('placeholder', '');
		$("#leaderboard-input").val(g.username);
	};
};
game.leaderboard.submitScore = function() {
	if (g.username !== undefined) {
		var playerName = g.username;
		var playerMeat = Math.floor(g.ressources.owned[5]);
		var playerCells = Math.floor(g.ressources.owned[4]);

		ref.child(playerName).setWithPriority({
			name: playerName,
			meat: playerMeat,
			cell: playerCells
		}, playerCells);
	};
};
game.leaderboard.initScore = function() {
	ref.on("value", function(snapshot) {
		console.info("Loading leaderboard...");
		var list = snapshot.val();
		var scoreboard = $.map(list, function(value, index) {
		    return [value];
		});
		score = scoreboard;
	});
};
game.leaderboard.handleScoreAdded = function(scoreSnapshot, prevScoreName) {
    var newScoreRow = $("<tr/>");
	if (scoreSnapshot.val().name == "TotomInc")
		newScoreRow.append($("<td/>").append($("<span style='color: red; font-weight: bold;'/>").text(scoreSnapshot.val().name)));
	else
		newScoreRow.append($("<td/>").append($("<span/>").text(scoreSnapshot.val().name)));
    newScoreRow.append($("<td/>").text(fix(scoreSnapshot.val().meat, 0)));
    newScoreRow.append($("<td/>").text(fix(scoreSnapshot.val().cell, 0)));
    htmlForPath[scoreSnapshot.key()] = newScoreRow;

    if (prevScoreName === null) {
      	$("#leaderboard-body").append(newScoreRow);
    } else {
      	var lowerScoreRow = htmlForPath[prevScoreName];
      	lowerScoreRow.before(newScoreRow);
    };
};
game.leaderboard.checkIfUserExists = function(userId) {
	var usersRef = new Firebase("https://universe-god.firebaseio.com/scorelist/");
	usersRef.child(userId).once('value', function(snapshot) {
		var exists = (snapshot.val() !== null);
		game.leaderboard.userExistsCallback(exists);
	});
};
game.leaderboard.userExistsCallback = function(exists) {
	if (exists == true) {
		$("#leaderboard-error").html("Username already taken, please choose another one!");
		usernameExists = true;
	} else {
		$("#leaderboard-error").html("");
		usernameExists = false;
	};
};
ref.on('child_added', function(newScoreSnapshot, prevScoreName) {
    game.leaderboard.handleScoreAdded(newScoreSnapshot, prevScoreName);
});