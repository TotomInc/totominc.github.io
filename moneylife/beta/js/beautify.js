function beautify(x, n) {
	if (x >= 1e6) {
		var z = Math.floor(logFloor(x)/3);
		var prefixes = ["million ","billion ","trillion ","quadrillion ","quintillion ","sextillion ","septillion ","octillion ","nonillion ",
		"decillion ","undecillion ","duodecillion ","tredecillion ","quattuordecillion ","quindecillion ","sexdecillion ","septendecillion ","octodecillion ","novemdecillion ",
		"vigintillion ","unvigintillion ","duovigintillion ","trevigintillion ","quattuorvigintillion ","quinvigintillion ","sexvigintillion ","septenvigintillion ","octovigintillion ","novemvigintillion ",
		"trigintillion ","untrigintillion ","duotrigintillion ","tretrigintillion ","quattuortrigintillion ","quintrigintillion ","sextrigintillion ","septentrigintillion ","octotrigintillion ","novemtrigintillion ",
		"quadragintillion ","unquadragintillion ","duoquadragintillion ","trequadragintillion ","quattuorquadragintillion ","quinquadragintillion ","sexquadragintillion ","septenquadragintillion ","octoquadragintillion ","novemquadragintillion ",
		"quinquagintillion "];
		var s = beautify(x/Math.pow(10,3*z),n);
		return s+" "+prefixes[z-2];
	} else {
		return numberWithCommas(x.toFixed(n));
	};
};
function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
};
function logFloor(x) {
	var count = 0;
	while (x >= 10) {
		count++;
		x /= 10;
	};
	return count;
};

function fix(x, n) {
	if (n == 3)
		return beautify(x, 3);
	if (n == 2)
		if (x >= 1e6)
			return beautify(x, 3);
		else
			return beautify(x, 2);
	if (n == 0)
		if (x >= 1e6)
			return beautify(x, 3);
		else
			return beautify(x, 0);
};