var helmetSelect = $("#inv-helmet");
var armourSelect = $("#inv-armour");
var glovesSelect = $("#inv-gloves");
var bootsSelect = $("#inv-boots");
var swordSelect = $("#inv-sword");

function Inventory() { Log("This is needed to make the other Inventory.() functions to work."); };
Inventory.check = function() {
	var a = helmetSelect[0].value;
	if (helmetsOwned[a] == true) {
		p.helmet.itemName = shopHelmets[a].name;
		p.helmet.armor = shopHelmets[a].armorPts;
		p.helmet.img = shopHelmets[a].img;
	};
	var b = armourSelect[0].value;
	if (armoursOwned[b] == true) {
		p.armour.itemName = shopArmours[b].name;
		p.armour.armor = shopArmours[b].armorPts;
		p.armour.img = shopArmours[b].img;
	};
	var c = glovesSelect[0].value;
	if (glovesOwned[c] == true) {
		p.gloves.itemName = shopGloves[c].name;
		p.gloves.armor = shopGloves[c].armorPts;
		p.gloves.img = shopGloves[c].img;
	};
	var d = bootsSelect[0].value;
	if (bootsOwned[d] == true) {
		p.boots.itemName = shopBoots[d].name;
		p.boots.armor = shopBoots[d].armorPts;
		p.boots.img = shopBoots[d].img;
	};
	var f = swordSelect[0].value;
	if (swordOwned[f] == true) {
		p.sword.itemName = shopSwords[f].name;
		p.sword.damage = shopSwords[f].damagePts;
		p.sword.img = shopSwords[f].img;
	};
};