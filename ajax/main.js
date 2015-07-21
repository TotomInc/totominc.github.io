var websites = ["html/home.html", "html/home2.html", "html/home3.html"];

var ajax = {};

ajax.loadPage = function(index) {
	$(".result").load(websites[index]);
};