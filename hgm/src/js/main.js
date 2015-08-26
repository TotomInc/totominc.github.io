var hgm = {
	height: $("body").height(),
	width: $("body").width(),
	scrollPos: $(document).scrollTop(),

	navbar: function() {
		var a = $("body").scrollTop();
		if (a >= 35) {
			$(".navbar-inverse").css('background-color', "#fff");
			$(".navbar-brand, .navbar-inverse .navbar-nav > li > a").css('color', '#333');
			$(".icon-bar").css('background-color', '#333');
			$("#navbar-logo").attr('src', 'src/img/logo-black.png');
		} else {
			$(".navbar-inverse").css('background-color', "#2d2d2d");
			$(".navbar-brand, .navbar-inverse .navbar-nav > li > a").css('color', '#DFDFDF');
			$(".icon-bar").css('background-color', '#fff');
			$("#navbar-logo").attr('src', 'src/img/logo-white.png');
		};
	},

	mobile: function() {
		var a = $("body").width();
		if (a < 768) {
			$(".hero").css('height', '550px');
			$(".tp-item::after, .tp-content").css({
				width: '160px',
				margin: '0 0 20px -80px'
			});
			$(".tp-text").css('font-size', '14px');
			$("#footer-text").addClass('text-center');
			$("#hero-carousel").remove();
		};
	},

	list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	current: 1,

	slider: function() {
		if (hgm.current == hgm.list[(hgm.current-1)]) {
			$("#hero-img-" + hgm.current).fadeOut(function() {
				$("#hero-img-" + (hgm.current)).fadeIn();
			});
			if ((hgm.current + 1) == (hgm.list.length + 1))
				hgm.current = 1;
			else
				hgm.current++;
		};
	}
};

window.setInterval(hgm.navbar, 100);
window.setInterval(hgm.slider, 5000);
hgm.mobile();