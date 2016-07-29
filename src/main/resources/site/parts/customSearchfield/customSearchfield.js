var lib = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util'),
    portal: require('/lib/xp/portal'),
}

var settings = {
    view: resolve('customSearchfield.html')
}

/*
*   GET
*/
exports.get = function( req ){


    var params = {};

    return {
        body: lib.thymeleaf.render(settings.view, params)
    }
};
