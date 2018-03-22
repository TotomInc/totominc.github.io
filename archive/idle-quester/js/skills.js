var skills = sk = {};
var skillsfunctions = skf = {};

skf.create = function(id, name, desc, img, req, reqPlace, effect, effectNum, cost) {
	this.id = id;
	this.name = name;
	this.desc = desc;
	this.img = img;
	this.req = req;
	this.reqPlace = reqPlace;
	this.effect = effect;
	this.effectNum = effectNum;
	this.cost = cost;
};

sk.bought = [];
sk.list = [
	new skf.create("runner_1", "Runner I", "Speed quests requires 2% less exp.", './img/boots_1.png', null, null, 'speedQuestMultiplier',	-0.02, 1),
	new skf.create("slicer_1", "Slicer I", "Attack quests requires 2% less exp.", './img/sword_1.png', null, null, 'attackQuestMultiplier', -0.02, 1),
	new skf.create("runner_2", "Runner II", "Speed quests requires 5% less exp.", './img/boots_2.png', "runner_1", 0, 'speedQuestMultiplier', -0.05, 1),
	new skf.create("fortune_1", "Fortune I", "Gain 75% more gold from quests.", './img/ring_1.png', "runner_1", 0, 'goldDrop', 64, 1),
	new skf.create("slicer_2", "Slicer II", "Attack quests requires 5% less exp.", './img/sword_2.png', "slicer_1", 1, 'attackQuestMultiplier', -0.05, 1),
	new skf.create("swordgod_1", "Swordgod I", "todo", './img/sword_3.png', "slicer_1", 1, '', 0, 1)
];

skf.init = function() {
	for (var i = 0; i < sk.list.length; i++) {
		if (sk.bought.length < sk.list.length)
			sk.bought.push(false);
		$("#skills-div-" + (i+1)).attr('onclick', 'skf.buy(' + i + ');');
		$("#skills-div-" + (i+1)).attr('data-toggle', 'tooltip');
		$("#skills-div-" + (i+1)).attr('data-placement', 'bottom');
		$("#skills-div-" + (i+1)).attr('title', sk.list[i].desc);
		$("#skills-div-" + (i+1)).css('background-image', "url('" + sk.list[i].img + "')")
		$("#skills-p-" + (i+1)).html(sk.list[i].name + "<br>Cost " + sk.list[i].cost + " token.");
	};
};
skf.buy = function(index) {
	var a = sk.list[index];
	var b = sk.bought[index];
	if (p.tokens >= a.cost && b == false) {
		if (a.req == null) { // for skills which doesn't depend on other skills
			sk.bought[index] = a.id;
			p.tokens -= a.cost;
			window["p"][sk.list[index].effect] += sk.list[index].effectNum;
		} else { // for skills which need other skills to be bought
			if (a.req == sk.bought[a.reqPlace]) { // check if the skill needed is bought
				sk.bought[index] = a.id;
				p.tokens -= a.cost;
				window["p"][sk.list[index].effect] += sk.list[index].effectNum;
			};
		};
	};
	skf.check();
};
skf.check = function() {
	for (var i = 0; i < sk.list.length; i++) {
		var a = sk.list[i];
		var b = sk.bought[i];
		if (a.req == null) {
			if (b == a.id) {
				$("#skills-p-" + (i+1)).html(a.name + "<br>Bought");
			};
		} else {
			if (a.req == sk.bought[a.reqPlace]) { // can be bought
				if (b == a.id) {
					$("#skills-p-" + (i+1)).html(a.name + "<br>Bought");
				};
			};
		};
	};
};