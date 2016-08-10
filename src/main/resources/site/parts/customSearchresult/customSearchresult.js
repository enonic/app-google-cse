var lib = {
    portal: require('/lib/xp/portal'),
    cse: require('/lib/cse'),
    cseutil: require('cse-util'),
    util: require('/lib/enonic/util')
}


exports.get = function( req ){

    var siteConf = lib.portal.getSiteConfig();
    var cc = lib.portal.getComponent().config;

    var result = lib.cse.search({
        googleApiKey: lib.cseutil.required(siteConf, 'googleApiKey'),
        googleCustomSearchEngineId: lib.cseutil.required(siteConf, 'googleCustomSearchEngineId'),
        q: req.params.q? req.params.q: "",
        startIndex: req.params.startIndex? req.params.startIndex: null
    });

    var searchResult = JSON.parse(result.body);

    log.info("%s", JSON.stringify(searchResult, null, 4));


    var hits = mapResultToConfiguratedFields({
        fields: lib.util.data.forceArray(cc.resultfield),
        items: searchResult.items
    });

    var paninationData = createPageinationData({
        sr: searchResult,
        cc: cc
    });

    var m = {
        hits: hits,
        wrapper: cc.wrapper,
        wrapperClass: cc.classes,
        pagination: paninationData

    };

    return {
        body: require('/lib/xp/thymeleaf').render(resolve('customSearchresult.html'), m)
    }
};



function createPageinationData(p){

    if( !lib.cseutil.isSet(p.cc.pagination) || !p.cc.pagination.show ){
        return {}
    }

    var pagination = {
        show: lib.cseutil.isSet(p.cc.pagination.show) ? p.cc.pagination.show : false
    };

    var directions = ["previous", "next"];

    for (var i = 0; i < directions.length; i++) {
        var direction = directions[i];
        if(lib.cseutil.isSet(p.sr.queries[direction + "Page"])){
            pagination[direction] = {
                    text: p.cc.pagination[direction + "Text"] ? p.cc.pagination[direction + "Text"] : direction + " page",
                    url: lib.portal.pageUrl({
                            params: {
                                q: p.sr.queries.request[0].searchTerms,
                                startIndex: p.sr.queries[direction + "Page"][0].startIndex
                            }
                        })
            };
        }
    }

    return pagination;
}



function mapResultToConfiguratedFields(p){

    if( p.fields.length == 0 || !lib.cseutil.isSet(p.fields[0].field) ||  !lib.cseutil.isSet(p.items)){
        return [];
    }

    var hits = [];

    for( var i = 0; i < p.items.length; i++ ){
        var item = [];

        for(var k = 0; k < p.fields.length; k++){
            var field = {
                title: p.fields[k].title,
                htmltag: p.fields[k].htmltag,
                clickable: p.fields[k].clickable,
                clickableLink: p.items[i]['link'],
                classes: p.fields[k].classes,
                value: p.items[i][p.fields[k].field],

            };
            item.push(field);
        }
        hits.push(item);
    }
    return hits;
}
