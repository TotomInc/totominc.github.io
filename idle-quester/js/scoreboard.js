var data = new Firebase("https://idlequester.firebaseio.com/");
var ref = new Firebase("https://idlequester.firebaseio.com/scorelist/");
var LEADERBOARD_SIZE = 10;
var htmlForPath = {};
var score;

function submitScore() {
	var playerName = p.name;
	var playerGold = Math.floor(p.gold);
	var playerLevel = Math.floor(p.level);

	ref.child(playerName).setWithPriority({
		name: playerName,
		gold: playerGold,
		level: playerLevel
	}, playerLevel);
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

function handleScoreAdded(scoreSnapshot, prevScoreName) {
    var newScoreRow = $("<tr/>");
    newScoreRow.append($("<td/>").append($("<span/>").text(scoreSnapshot.val().name)));
    newScoreRow.append($("<td/>").text(fix(scoreSnapshot.val().gold, 3)));
    newScoreRow.append($("<td/>").text(fix(scoreSnapshot.val().level, 0)));

    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.key()] = newScoreRow;

    // Insert the new score in the appropriate place in the table.
    if (prevScoreName === null) {
      	$("#leaderboard-body").append(newScoreRow);
    } else {
      	var lowerScoreRow = htmlForPath[prevScoreName];
      	lowerScoreRow.before(newScoreRow);
    };
};
ref.on('child_added', function(newScoreSnapshot, prevScoreName) {
    handleScoreAdded(newScoreSnapshot, prevScoreName);
});