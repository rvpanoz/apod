/*global define */

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            '*actions': 'do_action'
        },
        do_action: function (actions) {
            require(['app'], function (app) {
                var url, params;

                if (!actions || _.isNull(actions) || _.isUndefined(actions)) {
                    actions = app.urls.home;
                }
                //get target url;
                url = lib.decode(actions);

                //load the class
                require(["views/" + url.cls], function (View) {
                    app.vent.trigger('view:show', View, _.pick(url, 'params'));
                });
            });
        }
    });
    return Router;
});

