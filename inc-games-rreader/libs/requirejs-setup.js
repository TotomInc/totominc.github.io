require.config({
    paths: {
        jquery: 'jquery/js/jquery.min',
        bootstrap: 'components-bootstrap/js/bootstrap.min',
        requirecss: 'requirecss',
        redditjs: 'reddit.js/js/reddit.min',
        main: 'app/js/main'
    }
});

requirejs(['jquery'], function() {
    requirejs(['bootstrap', 'requirecss', 'main', 'redditjs'], function() {
        requireCSS('libs/components-bootstrap/css/bootstrap.css');
        requireCSS('libs/components-font-awesome/css/font-awesome.min.css');
        requireCSS('libs/Ionicons/css/ionicons.min.css');
        requireCSS('libs/normalize-css/css/normalize.css');
        requireCSS('libs/app/css/fonts.css');
        requireCSS('libs/app/css/interface.css');

        init();
    });
});