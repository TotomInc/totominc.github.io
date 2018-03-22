var deviceWidth = $(document).width();
var deviceHeight = $(document).height();

var marginpx = 150;
var panelspx = 150 + 45;

if (deviceWidth < 768) {
	$('#game-area').attr('class', 'container-fluid');
} else {
	$("#stats-col").css('max-height', (deviceHeight - marginpx) + 'px');
	$(".tab-content, #stats-col").css('overflow-y', 'auto');
	$(".tab-content").css('max-height', (deviceHeight - panelspx) + 'px');
};