var lib = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util'),
    portal: require('/lib/xp/portal'),
    content: require('/lib/xp/content'),
}

var settings = {
    view: resolve('default.html')
}

/*
*   GET
*/
exports.get = function( req ){

    var content = lib.portal.getContent();

//    log.info("%s", JSON.stringify(content, null, 4));

    var mainRegion = content.page.regions.main;

    var params = {
        mainRegion: mainRegion
    };

//    log.info("%s", JSON.stringify(params));

    return {
        body: lib.thymeleaf.render(settings.view, params)
    }
};
