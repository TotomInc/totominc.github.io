var monsters = [ // name - hp - maxhp - attack - gold - maxgold - xp - maxxp
	new Monster("Dark Howler", 		20, 35, 2, 15, 25, 20, 30),
	new Monster("Mournmirage", 		20, 35, 2, 15, 25, 20, 30),
	new Monster("Ashfang", 			20, 35, 2, 15, 25, 20, 30),
	new Monster("Dreambeast", 		20, 35, 2, 15, 25, 20, 30),
	new Monster("Smogbrute", 		20, 35, 2, 15, 25, 20, 30),
	new Monster("Metaltree", 		20, 35, 2, 15, 25, 20, 30),
	new Monster("Dark Mutt", 		20, 35, 2, 15, 25, 20, 30),
	new Monster("Putrid Behemoth", 	20, 35, 2, 15, 25, 20, 30),
	new Monster("Angry Blob", 		20, 35, 2, 15, 25, 20, 30)
];

var liveMonsters = []; var liveMonstersIndex = []; var spawnFinished;