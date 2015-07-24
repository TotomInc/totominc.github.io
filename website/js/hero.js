var hero = {};
hero.current = "hero-img-1";
hero.time = 5000;

hero.animate = function() {
	if (hero.current == "hero-img-1") {
		$("#hero-img-1").fadeOut('slow', function() {
			$("#hero-img-2").fadeIn('slow', function() {
				hero.current = "hero-img-2";
			});
		});
	};
	if (hero.current == "hero-img-2") {
		$("#hero-img-2").fadeOut('slow', function() {
			$("#hero-img-3").fadeIn('slow', function() {
				hero.current = "hero-img-3";
			});
		});
	};
	if (hero.current == "hero-img-3") {
		$("#hero-img-3").fadeOut('slow', function() {
			$("#hero-img-1").fadeIn('slow', function() {
				hero.current = "hero-img-1";
			});
		});
	};
};

window.setInterval(function() {
	hero.animate();
}, hero.time);