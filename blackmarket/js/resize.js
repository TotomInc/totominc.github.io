var maxpx = $(document).height(); var marginpx = 80;
$(".container-fluid, .col-md-4").css('max-height', (maxpx - marginpx) + 'px');
$(".col-md-4").css('overflow-y', 'auto');