var deviceWidth = $(document).width();
var deviceHeight = $(document).height();

$(".tab-container").css('height', (deviceHeight - 100) + 'px');
$(".game-container").css('width', (deviceWidth - 20) + 'px');
$("#upgrades-business, #achievements-business").css('max-height', (deviceHeight - 110) + 'px');
$("#upgrades-business, #achievements-business").css('overflow-y', 'auto');