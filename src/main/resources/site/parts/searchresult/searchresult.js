var lib = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util'),
    portal: require('/lib/xp/portal'),
    cse: require('/lib/enonic/google-cse/cse'),
    gu: require('/lib/cse-util')
}

var settings = {
    view: resolve('searchresult.html')
};

/*
*   GET
*/
exports.get = function( req ){

    var sc = lib.portal.getSiteConfig();
    var c = lib.portal.getContent();

    var result = lib.cse.search({
        googleApiKey: sc.googleApiKey,
        googleCustomSearchEngineId: sc.googleCustomSearchEngineId,
        query: "contenttype",
        q: req.params.q? req.params.q: "",
    });

    var params = {};

    return {
        body: lib.thymeleaf.render(settings.view, params),
        pageContributions: {
            headEnd: sc.googleCustomSearchEngineId ? lib.gu.getHeaderScript({
                googleCustomSearchEngineId: sc.googleCustomSearchEngineId
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
