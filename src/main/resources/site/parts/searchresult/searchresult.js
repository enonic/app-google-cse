var lib = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util'),
    portal: require('/lib/xp/portal'),
    gss: require('/lib/gss'),
    gu: require('cse-util')
}

var settings = {
    view: resolve('searchresult.html')
}

/*
*   GET
*/
exports.get = function( req ){

    var sc = lib.portal.getSiteConfig();
    var c = lib.portal.getContent();

    var result = lib.gss.search({
        googleApiKey: sc.googleApiKey,
        gssSearchEngineId: sc.gssSearchEngineId,
        query: "contenttype"
    });

    var params = {};

    return {
        body: lib.thymeleaf.render(settings.view, params),
        pageContributions: {
            headEnd: sc.gssSearchEngineId ? lib.gu.getHeaderScript({
                gssSearchEngineId: sc.gssSearchEngineId
            }) : null
        }
    }
};

/* Soon to be used */
function hasComponent(page, componentName){
    var regions = lib.util.data.forceArray(page.regions);
    for(var i = 0; i < regions.length; i ++){
        var components = lig.util.data.forecArray(regions[i].components);
    }
}
