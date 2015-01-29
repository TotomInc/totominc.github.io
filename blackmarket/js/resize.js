var maxpx = $(document).height(); var marginpx = 80;
$(".container-fluid, .col-md-5, .col-md-7").css('max-height', (maxpx - marginpx) + 'px');
$(".col-md-5, .col-md-7").css('overflow-y', 'auto');