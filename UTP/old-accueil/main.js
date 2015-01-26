$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
    	$(".header").css('opacity', 0.6);
    	$(".header").css('height', 50 + "px");
    	$(".logo-content").css('height', 80 + "%");
    	$(".links-content").css('height', 80 + "%");
    	$(".links-content").css('margin-top', -40 + "px");
    	$(".headerTitle").css('font-size', 30 + "px");
    	$(".headerTitle").css('line-height', 50 + "px");
    } else {
    	$(".header").css('opacity', 1);
    	$(".header").css('height', 70 + "px");
    	$(".logo-content").css('height', 100 + "%");
    	$(".headerTitle").css('font-size', 40 + "px");
    	$(".headerTitle").css('line-height', 70 + "px");
        $(".links-content").css('margin-top', -67 + "px");
    }
});

var bg = false;

function option() {
    if (bg == false) {
        bg = true;
        $(".main-showcase").css('background', 'url(img/p3.jpg)');
    } else {
        bg = false;
        $(".main-showcase").css('background', 'url(img/p4.jpg)');
    };
};