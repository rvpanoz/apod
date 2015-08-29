/*global define */

define([
  'backbone',
  'marionette'
], function (Backbone, Marionette) {
  'use strict';
  var RouterController = Marionette.Controller.extend({
    do_action: function (actions) {
      require(['app'], function (app) {
        var url, params;

        if (!actions || _.isNull(actions)) {
          actions = app.urls.home;
        }

        //get target url;
        url = lib.decode(actions);

        //case logout
        if (url.cls == 'logout') {
          app.vent.trigger('user:logout');
          return;
        }

        //load the class
        require(['views/' + url.cls], function (View) {
          if (url.params) {
            params = url.params;
            _.extend(View, {
              params: params
            });
          }
          app.main.show(new View());
        });

      });
    }
  });
  return RouterController;
});
