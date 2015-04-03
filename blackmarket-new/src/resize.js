var maxpx = $(document).height();
var widthpx = $(document).width();
var marginpx = 150;

function resize() {
	if (widthpx >= 768) {
		$(".tab-content").css('max-height', (maxpx - marginpx) + 'px');
		$(".tab-content").css('overflow-y', 'auto');
	} else {
		$(".tab-content").css('max-height', (maxpx - marginpx) + 'px');
	};
};