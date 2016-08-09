var lib = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    portal: require('/lib/xp/portal'),
    cse: require('/lib/mockcse')
}


exports.get = function( req ){

    var siteConf = lib.portal.getSiteConfig();
    var c = lib.portal.getComponent().config;

    var result = lib.cse.search({
        googleApiKey: siteConf.googleApiKey,
        googleCustomSearchEngineId: siteConf.googleCustomSearchEngineId,
        query: "contenttype"
    });

    var searchResult = JSON.parse(result.body);

    var hits = mapResultToConfiguratedFields({
        fields: c.resultfield,
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
