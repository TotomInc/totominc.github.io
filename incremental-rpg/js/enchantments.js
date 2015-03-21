var enchantements = [
	new Enchantment("Lightning shot",	'sword',	10,		'crystal',		20,		10)
];

function Enchantment(name, itemType, reqLevel, reqMaterial, numMaterial, effect) {
	this.name = name;
	this.itemType = itemType;
	this.reqLevel = reqLevel;
	this.reqMaterial = reqMaterial;
	this.numMaterial = numMaterial;
	this.effect = effect;
};