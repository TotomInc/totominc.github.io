var sidebar = {};
sidebar.open = false;

sidebar.animate = function() {
	if (sidebar.open == false) {
		$(".main-content").css('opacity', '0.65');
		$(".sidebar").css('transform', 'translate3d(0%, 0, 0)');
		$(".sidebar").css('visibility', 'visible');
		sidebar.open = true;
	} else {
		$(".main-content").css('opacity', '1');
		$(".sidebar").css('transform', 'translate3d(-100%, 0, 0)');
		$(".sidebar").css('visibility', 'hidden');
		sidebar.open = false;
	};
};

$("#navbar-options, #navbar-options-mobile, .sidebar-close").on('click', function(event) {
	sidebar.animate();
});