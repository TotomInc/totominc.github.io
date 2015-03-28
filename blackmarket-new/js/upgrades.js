var shootRewardUpgrades = [
    new Upgrade("Shoot reward x3",      12,         function() { shoot[7] *= 3 }),
    new Upgrade("Shoot reward x3",      60,         function() { shoot[7] *= 3 }),
    new Upgrade("Shoot reward x2",      420,        function() { shoot[7] *= 2 }),
    new Upgrade("Shoot reward x2",      2940,       function() { shoot[7] *= 2 }),
    new Upgrade("Shoot reward x2",      20580,      function() { shoot[7] *= 2 })
];
var shootRewardUpgradesOwned;

function Upgrade(name, price, run) {
	this.name = name;
	this.price = price;
	this.run = run;
};
Upgrade.init = function() {
	Log("Calling Upgrade.init()");
	shootRewardUpgradesOwned = []
	for (var i = 0; i < shootRewardUpgrades.length; i++) {
		shootRewardUpgradesOwned.push(true);
		$("#up-shoot-indicator-container").append('<div id="up-shoot-' + (i+1) + '" class="up-indicator"></div>');
        if ((i+1) > 1) {
            $("#up-shoot-" + (i+1)).css("margin-left", (i * 14) + "px");
            $("#up-shoot-" + (i+1)).css("margin-top", "-10px");
        };
	};
};