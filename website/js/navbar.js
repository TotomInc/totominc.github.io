var navbar = {};
navbar.black = "#383838";
navbar.white = "#eee";
navbar.time = 50;

navbar.scroll = function() {
	var a = $("body").scrollTop();
	if (a >= 35) {
		$("#navbar").css({
			height: '50px',
			background: navbar.white,
			color: '#333'
		});
		$(".header-brand, .header-links").css('line-height', '50px');
		$(".header-bar").css('background', '#333');
	} else {
		if (a < 35) {
			$("#navbar").css({
				height: '70px',
				background: navbar.black,
				color: '#fff'
			});
			$(".header-brand, .header-links").css('line-height', '70px');
			$(".header-bar").css('background', '#fff');
		};
	};
};

window.setInterval(function() {
	navbar.scroll();
}, navbar.time);