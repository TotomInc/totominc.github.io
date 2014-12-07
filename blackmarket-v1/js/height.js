var maxpx = $(document).height();
var headerpx = 45;
var marginpx = 10;
$(".container-fluid").css('max-height', (maxpx-headerpx-marginpx) + 'px');
$(".col-md-4").css('max-height', (maxpx-headerpx-marginpx) + 'px');
$("#shop").css('overflow-y', 'scroll');