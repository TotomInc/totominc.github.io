var requirecss = {
	load: function(path) {
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = path;
		document.getElementsByTagName("head")[0].appendChild(link);
	},
	init: function() {
		if (typeof csspath == "object") {
			for (key in csspath) {
				var result = csspath[key];
				this.load(result);
			};
		};
	}
};