var websites = ["http://totominc.github.io/ajax/blackmarket/"];

var ajax = {};

ajax.loadPage = function(index) {
	$(".result").empty();
	$(".result").load(websites[index]);
};