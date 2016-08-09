
exports.isSet = function(v) {
    return v !== null && typeof v !== 'undefined';
}

exports.required = function(params, name) {
    var value = params[name];
    if (value === undefined) {
        throw "Parameter '" + name + "' is required";
    }

    return value;
}

exports.getHeaderScript = function(p){

    var asyncs = exports.isSet(p.async)? p.async : 'true';

    return "<script>(function() { \
      var cx = '" +  exports.required(p, 'googleCustomSearchEngineId') + "'; \
      var gcse = document.createElement('script'); \
      gcse.type = 'text/javascript'; \
      gcse.async = " + asyncs + "; \
      gcse.src = 'https://cse.google.com/cse.js?cx=' + cx; \
      var s = document.getElementsByTagName('script')[0]; \
      s.parentNode.insertBefore(gcse, s); \
  })()</script>";
}
