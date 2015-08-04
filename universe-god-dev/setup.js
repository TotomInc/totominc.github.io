require.config({
    paths: {
        jquery: 'libs/jquery/js/jquery.min',
        jqueryui: 'libs/jquery-ui/js/jquery-ui.min',
        bootstrap: 'libs/components-bootstrap/js/bootstrap.min',
        typedjs: 'libs/typed.js/js/typed',
        requirecss: 'libs/requirecss/js/requirecss.min',
        sidebar: 'game/js/sidebar',
        game: 'game/js/game'
    }
});

csspath = {
    bootstrap: "libs/components-bootstrap/css/bootstrap.css",
    fontawesome: "libs/components-font-awesome/css/font-awesome.css",
    ionicons: "libs/Ionicons/css/ionicons.css",
    gameInterface: "game/css/interface.css",
    gameFonts: "game/css/fonts.css",
    gameTyped: "game/css/typed.css"
};

requirejs(['jquery', 'jqueryui'], function() {
    requirejs(['bootstrap', 'typedjs', 'requirecss'], function() {
        requirejs(['sidebar', 'game'], function() {
            requirecss.init();

            $(".loading-content").css('display', 'none');
            $(".sidebar, .main-content").css('display', 'block');
        });
    });
});