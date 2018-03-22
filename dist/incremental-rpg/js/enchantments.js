var enchantments = [
	new Enchant("Lightning Sword",	"Boosts sword damage!",		'sword',	20,		'jade',		5,	100, "img/W_Sword015.png")
];
var enchantmentsOwned = [];

function Enchant(name, desc, item, lvlReq, itemReq, numReq, effect, img) {
	this.name = name;
	this.desc = desc;
	this.item = item;
	this.lvlReq = lvlReq;
	this.itemReq = itemReq;
	this.numReq = numReq;
	this.effect = effect;
	this.img = img;
};
Enchant.buy = function(index) {
};
Enchant.init = function() {
	Log("Calling Enchant.init()");
	for (var i = 0; i < enchantments.length; i++) {
		enchantmentsOwned.push(false);
	};
};
Enchant.check = function() {
	Log("Calling Enchant.check()");
	for (var i = 0; i < enchantments.length; i++) {
		var e = enchantments[i];
		$("#e-n" + (i+1)).html('<img class="stats" src="' + e.img + '"> ' + e.name);
		$("#e-desc" + (i+1)).html(e.desc);
		$("#e-lvl" + (i+1)).html(e.lvlReq);
		$("#e-items" + (i+1)).html(e.numReq + " of " + e.itemReq);
		$("#e-effect" + (i+1)).html("+" + e.effect);
		$("#e-btn" + (i+1)).html('<a id="e-b' + (i+1) + '" class="btn btn-primary btn-sm center-btn">Enchant</a>');
		$("#e-b" + (i+1)).attr("onclick", 'Enchant.buy(' + i + ');');
	};
};