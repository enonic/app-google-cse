var lib = {
    portal: require('/lib/xp/portal'),
    gu: require('/lib/cse-util')
};


exports.get = function(){

    var c  = lib.portal.getComponent().config;

    var m = {
        resultPageUrl: lib.gu.isSet(c.searchResultPageId) ? lib.portal.pageUrl({id:c.searchResultPageId}) : null
    };

    return {
        body:require('/lib/thymeleaf').render(resolve('customSearchfield.html'),m)
    };

};
