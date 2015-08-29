/*global define */

define([
    'backbone',
    'marionette',
    'routers/index',
    'regions/dialog',
    'collections/Nav',
    'views/MenuView'
], function (Backbone, Marionette, Router, DialogRegion, Nav, MenuView) {
    'use strict';

    var app = new Marionette.Application();

    app.urls = {
        home: '{"cls":"home"}',
        base: 'https://api.nasa.gov/planetary/apod'
    };

    app.api_key = '3AwkRkfONm0LVWFHjagh0bG1IpDLZWMItCVItDDd';

    app.pages = new Nav([
        {title: 'Home', name: 'home', active: true}
    ]);

    app.AppMenu = new MenuView({collection: app.pages});
    app.AppPublicMenu = new MenuView({collection: app.publicPages});

    app.addRegions({
        menu: '#main-nav',
        main: '#main-content',
        footer: '#footer',
        dialog: DialogRegion
    });

    app.addInitializer(function () {
        //TODO
    });

    app.on('start', function (options) {
        this.router = new Router();
        if (Backbone.history)
            Backbone.history.start({pushState: false});
    });
    
    app.commands.setHandler("hide:loader", function (view) {
        view.currentView.trigger('dialog:close', {loading: true});
    });

    app.vent.on('route:home', function () {
        app.router.navigate('{"cls":"home"}', {trigger: true});
    });

    app.vent.on('menu:activate', function (activePageModel) {
        app.AppMenu.collection.findWhere({active: true}).set('active', false);
        activePageModel.set('active', true);
        app.AppMenu.render();
    });
    
    app.commands.setHandler("app:video", function (view) {
        require(['views/video-info'], function (VideoInfo) {
            app.dialog.show(new VideoInfo({
                parentView: view
            }));
        });
    });

    app.commands.setHandler("app:notify", function (model) {
        require(['views/NotificationView'], function (NotifyView) {
            app.dialog.show(new NotifyView({
                model: model
            }));
        });
    });

    /**
     * Show view handler
     */
    app.vent.on('view:show', function (View, params) {
        app.main.show(new View(params));
    });

    return window.app = app;
});
