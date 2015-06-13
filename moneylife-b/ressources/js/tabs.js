var tabs = {};

tabs.current = 0;

tabs.switcher = function(type) {
	$("#tab-" + tabs.current).css('display', 'none');
	$("#main-btn-" + tabs.current).removeClass('active');
	$("#tab-" + type).css('display', 'block');
	$("#main-btn-" + type).addClass('active')
	tabs.current = type;
};