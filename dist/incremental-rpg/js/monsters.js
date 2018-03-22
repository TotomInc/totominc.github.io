var monstersNames = [
	"Korok",
	"Urog",
	"Shadow Drakes",
	"Cavernhound",
	"Bonewraith", "Autumn Genie",
	"Skeletal Griffins",
	"Dustbrute",
	"Thunderling",
	"Moldclaw",
	"Metalflayer",
	"Infernohand",
	"Terrorstrike",
	"Creeping Wolpertinger",
	"Dawncat",
	"Abysssnake",
	"Poisonling"
];
var liveMonsters = []; var spawnFinished;

// monsters
function Monster(name, displayName, hp, damage, gold, xp) {
	this.name = name;
	this.hp = hp;
	this.damage = damage;
	this.gold = gold;
	this.xp = xp;
};
Monster.invoke = function(toSpawn, maxHp, minHp, maxDmg, minDmg, maxGold, minGold, maxXp, minXp) {
	var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // up to 10 (1-indexed)
	spawnFinished = false;
	for (var i = 0; i < temp.length; i++) {
		if (i < toSpawn) {
			var rName = Math.floor(Math.random() * monstersNames.length);
			liveMonsters.push(new Monster);
			liveMonsters[i].index = i;
			liveMonsters[i].name = monstersNames[rName];
			liveMonsters[i].hp = getMonsterHp(maxHp, minHp);
			liveMonsters[i].maxHp = liveMonsters[i].hp;
			liveMonsters[i].damage = getMonsterDamage(maxDmg, minDmg);
			liveMonsters[i].gold = getMonsterGold(maxGold, minGold);
			liveMonsters[i].xp = getMonsterXp(maxXp, minXp);
		};
	};
	spawnFinished = true;
	Monster.createDivs();
};
Monster.createDivs = function() {
	if (spawnFinished == true) {
		for (var i = 0; i < liveMonsters.length; i++) {
			var lm = liveMonsters[i];
			var lmi = liveMonsters[i].index;
			$("#monsters-well").append('<div id="monster-' + lmi + '" class="monster-div"></div>');
			$("#monster-" + lmi).append('<div id="monster-row' + lmi + '" class="row"></div>');
			$("#monster-row" + lmi).append('<div id="monster-col' + lmi + '" class="col-md-5"></div>');
			$("#monster-row" + lmi).append('<div id="monster-medcol' + lmi + '" class="col-md-5"></div>');
			$("#monster-row" + lmi).append('<div id="monster-smcol' + lmi + '" class="col-md-2"></div>');
			// attack button (col-md-2)
			$("#monster-smcol" + lmi).append('<a class="btn btn-default btn-sm" onclick="Monster.attack(' + lmi + ');"">Attack!</a>');
			// health-bar with text (col-md-6)
			$("#monster-col" + lmi).append('<div id="monster-healthbar' + lmi + '" class="progress"></div>');
			$("#monster-healthbar" + lmi).append('<div id="monster-hb' + lmi + '" class="progress-bar progress-bar-danger" style="width: 100%"></div>')
			$("#monster-hb" + lmi).append('<span id="monster-hpdisplay' + lmi + '" class="monster-bar-hp">' + lm.hp + "/" + lm.maxHp + ' HP</span>');
			// monster info + img (col-md-4)
			$("#monster-medcol" + lmi).append('<img class="stats" src="img/E_Bones01.png"> ');
			$("#monster-medcol" + lmi).append('<span id="monster-info' + lmi + '"></span>');
			$("#monster-info" + lmi).html(lm.name + ", attack : " + lm.damage);
		};
	};
};
Monster.attack = function(index) {
	var playerDmg = getPlayerDamage();
	var monsterDmg = liveMonsters[index].damage;
	var oldLevel = ps.level;
	var armor = getPlayerArmor();
	if (ps.hp > monsterDmg) {
		ps.hp -= monsterDmg - ((armor/100) * monsterDmg);
		liveMonsters[index].hp -= playerDmg;
		if (liveMonsters[index].hp <= 0) {
			ps.gold += liveMonsters[index].gold;
			ps.xp += liveMonsters[index].xp;
			getLevelUp();
			if (ps.level > oldLevel) {
				$("#alerts").append('<div id="alert-lvl" class="alert alert-success fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><p class="light center small-font">You gained 1 level! Yay hooray!</p></div>')
			};
			$("#monster-" + index).remove();
			Adventure.end(); // check if adventure is finished
		};
	};
};