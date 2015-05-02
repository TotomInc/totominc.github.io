var themeSelected = document.getElementById("theme-select");
var themes = [
	new Theme("Default",		"./src/bootstrap.min.css"),
	new Theme("Cerulean",		"./themes/cerulean.css"),
	new Theme("Paper",			"./themes/paper.css"),
	new Theme("Sandstone",		"./themes/sandstone.css"),
	new Theme("Simplex",		"./themes/simplex.css"),
	new Theme("Spacelab",		"./themes/spacelab.css"),
	new Theme("United",			"./themes/united.css"),
	new Theme("Yeti",			"./themes/yeti.css")
];

function Theme(name, path) {
	this.name = name;
	this.path = path;
};
Theme.update = function() {
	$("#stylesheet").attr("href", themes[themeSelected.selectedIndex].path);
	options.theme = themeSelected.selectedIndex;
};

window.setInterval(function() {
	Theme.update();
}, 1000);