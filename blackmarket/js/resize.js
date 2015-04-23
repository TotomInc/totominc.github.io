var maxpx = $(document).height();
var widthpx = $(document).width();
var marginpx = 150;
var panelspx = 40;

function resize() {
	Log("Browser width : " + widthpx + "px - browser height : " + maxpx + "px");
	if (widthpx >= 768) {
		$("#panels-col").css('max-height', (maxpx - marginpx + panelspx) + 'px');
		$("#panels-col").css('overflow-y', 'auto');
		$(".tab-content").css('max-height', (maxpx - marginpx) + 'px');
		$(".tab-content").css('overflow-y', 'auto');
	} else {
		$(".tab-content").css('max-height', (maxpx - marginpx) + 'px');
		$("#panels-col").css('max-height', (maxpx - marginpx + panelspx) + 'px');
	};
	Log("Game resized to browser height and width. You can play!");
};