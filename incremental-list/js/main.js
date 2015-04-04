var games = [
	new Game("A Dark Room", 			"Continuities", 		"http://adarkroom.doublespeakgames.com/"),
	new Game("Adventure Capitalist",	"HyperHippo",			"http://www.kongregate.com/games/HyperHippoGames/adventure-capitalist"),
	new Game("Anti-Idle : the Game",	"Tukkun",				"http://www.kongregate.com/games/Tukkun/anti-idle-the-game"),
	new Game("Bitcoiner",				"Unknown",				"http://bitcoiner.wernersbacher.de/"),
	new Game("Button Game : Reloaded",	"Unknown",				"http://www.kongregate.com/games/Cmymind4/button-game-reloaded"),
	new Game("Candy Box",				"Aniwey",				"http://candies.aniwey.net/"),
	new Game("Candy Box 2",				"Aniwey",				"http://candybox2.net/"),
	new Game("Candy Clicker",			"Unknown",				"http://candyclicker.com/"),
	new Game("CERN Particle Clicker",	"Unknown",				"http://particle-clicker.web.cern.ch/particle-clicker/"),
	new Game("Choppin' Wood",			"Skarless",				"http://choppin-wood.com/"),
	new Game("CityClicker",				"JohnTooPublic",		"http://giraluna.github.io/citygame/"),
	new Game("Civclicker",				"Eschatonic",			"http://dhmholley.co.uk/civclicker.html"),
	new Game("Clicker Heroes",			"Fragsworth",			"http://www.clickerheroes.com/"),
	new Game("Clickers of Honors",		"Unknown",				"http://users.telenet.be/coh/"),
	new Game("Clicking Bad",			"WebGovernor",			"http://clickingbad.nullism.com/"),
	new Game("Clickpocalypse",			"Jim808",				"http://minmaxia.com/clickpocalypse/"),
	new Game("Clickpocalypse II",		"Jim808",				"http://minmaxia.com/c2/"),
	new Game("Coinbox Hero",			"Unknown",				"http://armorgames.com/play/12247/coinbox-hero"),
	new Game("Cookie Clicker",			"Orteil",				"http://orteil.dashnet.org/cookieclicker/"),
	new Game("Critter Mound",			"Brave_Powerful_Ruler",	"http://yoyz.com/critter/"),
	new Game("Crushing Defeat",			"Hamilton Cline",		"http://www.hamiltondraws.com/scripts/counter2.html"),
	new Game("Derivative Clicker",		"TangentialThinker",	"http://gzgreg.github.io/DerivativeClicker/"),
	new Game("Diamond Hunt",			"Smittyy",				"http://www.diamondhunt.co/"),
	new Game("Dogeminer",				"rknDA1337",			"http://dogeminer.se/"),
	new Game("DripStat",				"Unknown",				"https://dripstat.com/game/"),
	new Game("Dr. Meth",				"Unknown",				"http://drmeth.com/#"),
	new Game("Dungeon Clicker",			"Leandrobarone",		"http://leandrobarone.github.io/dungeonclicker/"),
	new Game("Gaben Clicker",			"Unknown",				"http://gabenclicker.gweb.io/"),
	new Game("Gold Rush Game",			"Unknown",				"http://goldrushgame.net/"),
	new Game("Heroville",				"Meredori",				"http://herovillegame.com/"),
	new Game("Ice-Cream Stand",			"L4w3s",				"http://icecreamstand.ca/")
];

function Game(name, author, link) {
	this.name = name;
	this.author = author;
	this.link = link;
};
function fillTable() {
	for (var i = 0; i < games.length; i++) {
		var g = games[i];
		$("#table-content").append('<tr id="tr-' + i + '"></tr>');
		$("#tr-" + i).append('<td id="td-name-' + i + '"></td>');
		$("#tr-" + i).append('<td id="td-author-' + i + '"></td>');
		$("#tr-" + i).append('<td id="td-gamelink-' + i + '"></td>');
		$("#td-name-" + i).html(g.name);
		$("#td-author-" + i).html(g.author);
		$("#td-gamelink-" + i).html('<a target="_blank" href="' + g.link + '">Play now!</a>');
		if (isOdd(i) == 1) {
			$("#tr-" + i).attr("class", "success");
		};
	};
};
function isOdd(number) {
	return number % 2;
};

window.onload = function() { fillTable(); };