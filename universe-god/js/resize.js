var resize = {};
resize.deviceWidth = $(document).width();
resize.deviceHeight = $(document).height();

$(".tab-content").css('max-height', (resize.deviceHeight - 130) + 'px');
$(".tab-content").css('overflow-y', 'auto');