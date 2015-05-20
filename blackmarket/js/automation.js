function Automation() {	Log("This is needed to make the other Automation functions to work."); };
var shootClick = false;
var reloadClick = false;

Automation.autoShoot = function() {
	if (enableAutoShootCheckBox.checked == true && (prestigeShootingOwned == true && shootClick == true)) {
		Action.shoot();
		setTimeout(Automation.autoShoot, shoot[3]);
		$("#enableAutoShoot").attr("oncheck", "shootClick = true");
	};
};
Automation.autoReload = function() {
	if (enableAutoReloadCheckBox.checked == true && (prestigeShootingOwned == true && reloadClick == true)) {
		if (shoot[0] == 0) {
			Action.reload();
		};
		setTimeout(Automation.autoReload, shoot[4]);
		$("#enableAutoReload").attr("oncheck", "reloadClick = true");
	};
};
