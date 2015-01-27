var maxpx = $(document).height(); var marginpx = 80;
$(".container-fluid, .col-md-4").css('max-height', (maxpx - marginpx) + 'px');
$(".col-md-4").css('overflow-y', 'auto');
if (maxpx < 680) {
	$(".navbar").css("display", "none");
	$("body").css("margin", "10px 0 0 0");
};