require.config({
    paths: {
        jquery: 'jquery/js/jquery.min',
        bootstrap: 'components-bootstrap/js/bootstrap.min',
        requirecss: 'requirecss',
        sidebar: 'game/js/sidebar',
        typedjs: 'typed.js/js/typed'
    }
});

requirejs(['jquery'], function() {
    requirejs(['bootstrap', 'requirecss', 'typedjs'], function() {
        requirejs(['sidebar']);
        // once game scripts are loaded load css
    	requireCSS('libs/components-bootstrap/css/bootstrap.min.css');
    	requireCSS('libs/components-font-awesome/css/font-awesome.min.css');
        requireCSS('libs/Ionicons/css/ionicons.min.css');
    	requireCSS('libs/normalize-css/css/normalize.css');
    	requireCSS('libs/game/css/fonts.css');
    	requireCSS('libs/game/css/interface.css');
        requireCSS('libs/game/css/typed.css');
        // everything is loaded, make the body display: block
        $("body").css('display', 'block');
    });
});