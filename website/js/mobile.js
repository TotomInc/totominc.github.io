var mobile = {};
mobile.width = $("body").width();

mobile.load = function() {
	if (mobile.width < 768) {
		$("#nav-links, .hero, .main-content, .footer").css('display', 'none');
		$("#mobile-div").css('display', 'block');
		$("#mobile-div").html("Mobile version not supported.<br>Version mobile non-supportée actuellement.");
	};
};

window.onload = function() {
	mobile.load();
};