var shopHelmets = [
	new Helmet("Newbie Helmet",				0,		1,		15,		"img/C_Hat03.png"),
	new Helmet("Bronze Helmet",				100,	5,		75,		"img/C_Elm01.png"),
	new Helmet("Iron Helmet",				5000,	10,		150,	"img/C_Elm02.png")
];
var shopArmours = [
	new Armour("Newbie Armour",				0,		1,		40,		"img/A_Clothing02.png"),
	new Armour("Bronze Armour",				350,	5,		95,		"img/A_Armour01.png"),
	new Armour("Iron Armour",				7500,	10,		200,	"img/A_Armour02.png")
];
var shopGloves = [
	new Gloves("Newbie Gloves",				0,		1,		10,		"img/Ac_Gloves02.png"),
	new Gloves("Leather Gloves",			75,		5,		30,		"img/Ac_Gloves01.png"),
	new Gloves("Reinforced Leather Gloves",	2250,	10,		100,	"img/Ac_Gloves04.png")
];
var shopBoots = [
	new Boots("Newbie Boots",				0,		1,		30,		"img/A_Shoes01.png"),
	new Boots("Reinforced Boots",			200,	5,		75,		"img/A_Shoes03.png"),
	new Boots("Iron Boots",					6000,	10,		175,	"img/A_Shoes07.png")
];
var shopSwords = [
	new Sword("Newbie Sword",				0,		1,		5,		"img/W_Sword001.png"),
	new Sword("Reinforced Sword",			100,	5,		15,		"img/W_Sword005.png"),
	new Sword("Iron Sword",					5500,	10,		40,		"img/W_Sword007.png")
];

var helmetsOwned = []; var armoursOwned = []; var glovesOwned = []; var bootsOwned = []; var amuletsOwned = []; var swordOwned = [];

// helmets
function Helmet(name, price, reqLevel, armorPts, img) {
	this.name = name;
	this.price = price;
	this.reqLevel = reqLevel;
	this.armorPts = armorPts
	this.img = img;
};
// armours
function Armour(name, price, reqLevel, armorPts, img) {
	this.name = name;
	this.price = price;
	this.reqLevel = reqLevel;
	this.armorPts = armorPts
	this.img = img;
};
// gloves
function Gloves(name, price, reqLevel, armorPts, img) {
	this.name = name;
	this.price = price;
	this.reqLevel = reqLevel;
	this.armorPts = armorPts
	this.img = img;
};
// boots
function Boots(name, price, reqLevel, armorPts, img) {
	this.name = name;
	this.price = price;
	this.reqLevel = reqLevel;
	this.armorPts = armorPts
	this.img = img;
};
// sword
function Sword(name, price, reqLevel, damagePts, img) {
	this.name = name;
	this.price = price;
	this.reqLevel = reqLevel;
	this.damagePts = damagePts
	this.img = img;
};

// shop
function Shop (argument) { Log("This is needed to make the other Shop.() functions to work."); };
Shop.buy = function(itemType, index) {
	if (itemType == 'helmet' && (ps.gold >= shopHelmets[index].price & ps.level >= shopHelmets[index].reqLevel)) {
		ps.gold -= shopHelmets[index].price;
		helmetsOwned[index] = true;
		$("#s-helmet-btn-info" + (index+1)).attr("onclick", "");
		$("#s-helmet-btn-info" + (index+1)).html("owned");
	};
	if (itemType == 'armour' && (ps.gold >= shopArmours[index].price & ps.level >= shopArmours[index].reqLevel)) {
		ps.gold -= shopArmours[index].price;
		armoursOwned[index] = true;
		$("#s-armour-btn-info" + (index+1)).attr("onclick", "");
		$("#s-armour-btn-info" + (index+1)).html("owned");
	};
	if (itemType == 'gloves' && (ps.gold >= shopGloves[index].price & ps.level >= shopGloves[index].reqLevel)) {
		ps.gold -= shopGloves[index].price;
		glovesOwned[index] = true;
		$("#s-gloves-btn-info" + (index+1)).attr("onclick", "");
		$("#s-gloves-btn-info" + (index+1)).html("owned");
	};
	if (itemType == 'boots' && (ps.gold >= shopBoots[index].price & ps.level >= shopBoots[index].reqLevel)) {
		ps.gold -= shopBoots[index].price;
		bootsOwned[index] = true;
		$("#s-boots-btn-info" + (index+1)).attr("onclick", "");
		$("#s-boots-btn-info" + (index+1)).html("owned");
	};
	if (itemType == 'sword' && (ps.gold >= shopSwords[index].price & ps.level >= shopSwords[index].reqLevel)) {
		ps.gold -= shopSwords[index].price;
		swordOwned[index] = true;
		$("#s-sword-btn-info" + (index+1)).attr("onclick", "");
		$("#s-sword-btn-info" + (index+1)).html("owned");
	};
};
Shop.init = function() {
	Log("Calling Shop.init()");
	for (var i = 0; i < shopHelmets.length; i++) {
		var s = shopHelmets[i];
		helmetsOwned.push(false);
		$("#s-helmet" + (i+1)).html('<img class="stats" src="' + s.img + '"> ' + s.name + " : " + beautify(s.price, 0) + " gold - required level : " + s.reqLevel);
		$("#s-helmet-btn" + (i+1)).html('<a id="s-helmet-btn-info' + (i+1) + '" class="btn btn-primary btn-sm">Buy it</a>');
		$("#s-helmet-btn-info" + (i+1)).attr("onclick", "Shop.buy('helmet', " + i + ");");
		$("#inv-helmet").append('<option value="' + i + '">' + s.name + '</option>');
	};
	for (var i = 0; i < shopArmours.length; i++) {
		var s = shopArmours[i];
		armoursOwned.push(false);
		$("#s-armour" + (i+1)).html('<img class="stats" src="' + s.img + '"> ' + s.name + " : " + beautify(s.price, 0) + " gold - required level : " + s.reqLevel);
		$("#s-armour-btn" + (i+1)).html('<a id="s-armour-btn-info' + (i+1) + '" class="btn btn-primary btn-sm">Buy it</a>');
		$("#s-armour-btn-info" + (i+1)).attr("onclick", "Shop.buy('armour', " + i + ");");
		$("#inv-armour").append('<option value="' + i + '">' + s.name + '</option>');
	};
	for (var i = 0; i < shopGloves.length; i++) {
		var s = shopGloves[i];
		glovesOwned.push(false);
		$("#s-gloves" + (i+1)).html('<img class="stats" src="' + s.img + '"> ' + s.name + " : " + beautify(s.price, 0) + " gold - required level : " + s.reqLevel);
		$("#s-gloves-btn" + (i+1)).html('<a id="s-gloves-btn-info' + (i+1) + '" class="btn btn-primary btn-sm">Buy it</a>');
		$("#s-gloves-btn-info" + (i+1)).attr("onclick", "Shop.buy('gloves', " + i + ");");
		$("#inv-gloves").append('<option value="' + i + '">' + s.name + '</option>');
	};
	for (var i = 0; i < shopBoots.length; i++) {
		var s = shopBoots[i];
		bootsOwned.push(false);
		$("#s-boots" + (i+1)).html('<img class="stats" src="' + s.img + '"> ' + s.name + " : " + beautify(s.price, 0) + " gold - required level : " + s.reqLevel);
		$("#s-boots-btn" + (i+1)).html('<a id="s-boots-btn-info' + (i+1) + '" class="btn btn-primary btn-sm">Buy it</a>');
		$("#s-boots-btn-info" + (i+1)).attr("onclick", "Shop.buy('boots', " + i + ");");
		$("#inv-boots").append('<option value="' + i + '">' + s.name + '</option>')
	};
	for (var i = 0; i < shopSwords.length; i++) {
		var s = shopSwords[i];
		swordOwned.push(false);
		$("#s-sword" + (i+1)).html('<img class="stats" src="' + s.img + '"> ' + s.name + " : " + beautify(s.price, 0) + " gold - required level : " + s.reqLevel)
		$("#s-sword-btn" + (i+1)).html('<a id="s-sword-btn-info' + (i+1) + '" class="btn btn-primary btn-sm">Buy it</a>');
		$("#s-sword-btn-info" + (i+1)).attr("onclick", "Shop.buy('sword', " + i + ");");
		$("#inv-sword").append('<option value="' + i + '">' + s.name + '</option>');
	};
};
Shop.check = function() {
	Log("Calling Shop.check()");
	for (var i = 0; i < shopHelmets.length; i++) {
		if (helmetsOwned[i] == true) {
			$("#s-helmet-btn-info" + (i+1)).attr("onclick", "");
			$("#s-helmet-btn-info" + (i+1)).html("owned");
		};
	};
	for (var i = 0; i < shopArmours.length; i++) {
		if (armoursOwned[i] == true) {
			$("#s-armour-btn-info" + (i+1)).attr("onclick", "");
			$("#s-armour-btn-info" + (i+1)).html("owned");
		};
	};
	for (var i = 0; i < shopGloves.length; i++) {
		if (glovesOwned[i] == true) {
			$("#s-gloves-btn-info" + (i+1)).attr("onclick", "");
			$("#s-gloves-btn-info" + (i+1)).html("owned");
		};
	};
	for (var i = 0; i < shopBoots.length; i++) {
		if (bootsOwned[i] == true) {
			$("#s-boots-btn-info" + (i+1)).attr("onclick", "");
			$("#s-boots-btn-info" + (i+1)).html("owned");
		};
	};
	for (var i = 0; i < shopSwords.length; i++) {
		if (swordOwned[i] == true) {
			$("#s-sword-btn-info" + (i+1)).attr("onclick", ""),
			$("#s-sword-btn-info" + (i+1)).html("owned");
		};
	};
};