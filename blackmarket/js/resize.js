var maxpx = $(document).height(); var marginpx = 100;
$(".container-fluid, .col-md-4").css('max-height', (maxpx - marginpx) + 'px');
$(".col-md-4").css('overflow-y', 'auto');
if (maxpx < 650) {
	console.log("Small screen/smartphone detected");
	$(".navbar").css("display", "none");
	$("body").css("margin", "10px");
};