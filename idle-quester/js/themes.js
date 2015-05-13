var themeSelected = document.getElementById("theme-select");
var themes = [
	new Theme("Default",		"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"),
	new Theme("Cerulean",		"http://bootswatch.com/cerulean/bootstrap.min.css"),
	new Theme("Paper",			"http://bootswatch.com/paper/bootstrap.min.css"),
	new Theme("Sandstone",		"http://bootswatch.com/sandstone/bootstrap.min.css"),
	new Theme("Simplex",		"http://bootswatch.com/simplex/bootstrap.min.css"),
	new Theme("Spacelab",		"http://bootswatch.com/spacelab/bootstrap.min.css"),
	new Theme("United",			"http://bootswatch.com/united/bootstrap.min.css"),
	new Theme("Yeti",			"http://bootswatch.com/yeti/bootstrap.min.css")
];

function Theme(name, path) {
	this.name = name;
	this.path = path;
};
Theme.update = function() {
	if (options.theme !== themeSelected.selectedIndex) {
		$("#stylesheet").attr("href", themes[themeSelected.selectedIndex].path);
		options.theme = themeSelected.selectedIndex;
	};
};

window.setInterval(function() {
	Theme.update();
}, 1000);