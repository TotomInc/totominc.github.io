require.config({
    paths: {
        jquery: 'jquery/js/jquery.min',
        bootstrap: 'components-bootstrap/js/bootstrap.min',
        requirecss: 'requirecss',
        sidebar: 'game/js/sidebar',
        typedjs: 'typed.js/js/typed',
        moment: 'moment/js/moment.min',
        game: 'game/js/game'
    }
});

requirejs(['jquery'], function() {
    require(['moment'], function(moment) {
        Moment = moment;
    });

    requirejs(['bootstrap', 'requirecss', 'typedjs'], function() {
        requirejs(['sidebar', 'game']);
        // once game scripts are loaded : load css
    	requireCSS('libs/components-bootstrap/css/bootstrap.css');
    	requireCSS('libs/components-font-awesome/css/font-awesome.min.css');
        requireCSS('libs/Ionicons/css/ionicons.min.css');
    	requireCSS('libs/normalize-css/css/normalize.css');
    	requireCSS('libs/game/css/fonts.css');
    	requireCSS('libs/game/css/interface.css');
        requireCSS('libs/game/css/typed.css');
        // everything is loaded : make the game appear
        $(".loading-content").css('display', 'none');
        $(".sidebar, .main-content").css('display', 'block');
    });
});