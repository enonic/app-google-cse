var lib = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util'),
    portal: require('/lib/xp/portal'),
    gss: require('/lib/gss')
}

var settings = {
    view: resolve('customSearchresult.html')
}

/*
*   GET
*/
exports.get = function( req ){

    var siteConf = lib.portal.getSiteConfig();

    var result = lib.gss.search({
        googleApiKey: siteConf.googleApiKey,
        gssSearchEngineId: siteConf.gssSearchEngineId,
        query: "contenttype"
    });

    log.info("%s", JSON.stringify(result, null, 4));

    var params = {};

    return {
        body: lib.thymeleaf.render(settings.view, params)
    }
};
