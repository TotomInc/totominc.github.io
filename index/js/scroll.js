$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 30) {
    	$(".navbar-default").css('background-color', 'rgba(248, 248, 248, 0.92)');
    } else {
    	$(".navbar-default").css('background-color', 'rgba(248, 248, 248, 1)');
    };
});

function scrollMain() {
	document.getElementById('content').scrollIntoView();
};