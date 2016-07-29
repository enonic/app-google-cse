var lib = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    portal: require('/lib/xp/portal'),
    gu: require('gss-util')
}


/*
*   GET
*/
exports.get = function( req ){

    var sc = lib.portal.getSiteConfig();
    var c  = lib.portal.getComponent().config;

    var attributes = createAttributes(c);

    var m = {
        attributes: attributes,
        autoComplete: lib.gu.isSet(c.autoComplete)? c.autoComplete: 'false',
        resultPageUrl: lib.gu.isSet(c.searchResultPageId) ? lib.portal.pageUrl({id:c.searchResultPageId}) : null
    };


    return {
        body: lib.thymeleaf.render(resolve('searchfield.html'), m),
        pageContributions: {
            headEnd: lib.gu.isSet(sc.gssSearchEngineId) ? lib.gu.getHeaderScript({gssSearchEngineId: sc.gssSearchEngineId}) : ''
        }
    }
};


function createAttributes(c){
    var attributes = [];

    if(lib.gu.isSet(c.autoComplete)) attributes.push('enableAutoComplete=' + c.autoComplete);

    if(lib.gu.isSet(c.searchResultPageId)){
        var searchPageUrl = lib.portal.pageUrl({id:c.searchResultPageId});
        attributes.push("resultsUrl='" + searchPageUrl + "'");
    }

    return attributes.length > 0? attributes.join(',') : 'x=null';
}
