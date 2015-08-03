require.config({
	paths: {
		jquery: 'jquery/js/jquery.min',
		bootstrap: 'components-bootstrap/js/bootstrap.min',
		requirecss: 'requirecss/js/requirecss'
	}
});

csspath = {
	bootstrap: 'libs/components-bootstrap/css/bootstrap.min.css',
	fontawesome: 'libs/components-font-awesome/css/font-awesome.min.css',
	ionicons: 'libs/Ionicons/css/ionicons.min.css'
};

require(['jquery'], function($) {
	if (!window.jQuery == false || !jQuery == false || !$) {
		require(['bootstrap', 'requirecss'], function() {
			requirecss.init();
		});
	};
});