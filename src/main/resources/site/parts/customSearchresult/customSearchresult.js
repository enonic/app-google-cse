var lib = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    portal: require('/lib/xp/portal'),
    cse: require('/lib/mockcse'),
    cseutil: require('cse-util'),
    util: require('/lib/enonic/util')
}


exports.get = function( req ){

    var siteConf = lib.portal.getSiteConfig();
    var c = lib.portal.getComponent().config;

    var result = lib.cse.search({
        googleApiKey: lib.cseutil.required(siteConf, 'googleApiKey'),
        googleCustomSearchEngineId: lib.cseutil.required(siteConf, 'googleCustomSearchEngineId'),
        query: req.params.q? req.params.q: ""

    });

    var searchResult = JSON.parse(result.body);

    log.info("%s", JSON.stringify(c.resultfield, null, 4));


    var hits = mapResultToConfiguratedFields({
        fields: lib.util.data.forceArray(c.resultfield),
        items: searchResult.items
    });

    var m = {
        hits: hits,
        wrapper: c.wrapper,
        wrapperClass: c.classes
    };

    return {
        body: lib.thymeleaf.render(resolve('customSearchresult.html'), m)
    }
};

function mapResultToConfiguratedFields(p){

    if( p.fields.length == 0 || !lib.cseutil.isSet(p.fields[0].field)){
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
