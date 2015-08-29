define(function () {
  var lib = {
    /**
     * converts any javascript variable to its JSON representation
     * @param {Object} obj
     * @returns {String}
     * */
    encode: function (obj, replacer, space) {
      return JSON.stringify(obj, replacer, space);
    },
    /**
     * parses a JSON string to its object representation
     * @param {String} str
     * @returns {Object}
     */
    decode: function (str) {
      return JSON.parse(str);
    },
    /**
     *
     *
     */
    callServer: function (opts) {
      var scope = opts.scope;
      function doCallbacks(result) {
        try {
          if (opts.callback)
            opts.callback.call(scope, result, opts);
          if (result.success && opts.success)
            opts.success.call(scope, result, opts);
          if (!result.success && opts.failure)
            opts.failure.call(scope, result, opts);
          if (!result.success && !opts.aborted && opts.alerts !== false)
            alert(result.message);
        } catch (e) {
          alert(e);
        }
      }
      var ajaxOpts = _.extend({
        url: opts.url,
        type: opts.type,
        contentType: 'application/json',
        data: this.encode(opts.params),
        dataType: 'json',
        alerts: false,
        success: doCallbacks,
        error: function (req, err, ex) {
          if (opts.alerts !== false)
            alert('Ajax Error ' + err + ' ' + ex);
        }
      }, opts.ajaxOpts);
      return $.ajax(ajaxOpts);
    }
  };
  return window.lib = lib;
});


