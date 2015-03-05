var maxpx = $(document).height();
var widthpx = $(document).width();
var marginpx = 620;

$(".col-md-6, .col-md-7").css('max-height', (maxpx - marginpx) + 'px');
$(".col-md-6, .col-md-7").css('overflow-y', 'auto');