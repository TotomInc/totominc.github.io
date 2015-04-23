function devMode(number) {
	if (number == 0) {
		money[0] = 1e7;
	};
	if (number == 1) {
		money[0] = 1e10;
	};
	if (number == 2) {
		money[0] = 1e20;
	};
};
function updateCheckCodeInput() {
	checkCodeInput = document.getElementById('checkCode').value;
	checkCode(checkCodeInput);
};
function checkCode(check) {
	var cleanInput = atob(check);

	if (cleanInput == "Marc") {
		prestige[0] = 1e21;
	};
};