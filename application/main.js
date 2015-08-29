require.config({
    paths: {
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        moment: '../bower_components/moment/min/moment.min',
        jquery: '../bower_components/jquery/dist/jquery',
        tpl: 'lib/tpl',
        bootstrap: 'lib/bootstrap.min',
        bootstrapDTpicker: '../bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        marionette: {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        },
        moment: {
            exports: 'Moment',
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery']
        }
    },
    waitSeconds: 15
});

require([
    'app',
    'lib',
    'moment',
    'jquery',
    'routers/index',
    'bootstrap',
], function (app, lib, moment, $, Router) {
    'use strict';

//    Backbone.emulateHTTP = true;

    Backbone.$.ajaxSetup({
        beforeSend: function () {
            $('#loading-indicator').show();
        },
        complete: function (x, error) {
            setTimeout(function() {
                $('#loading-indicator').hide();
            }, 500);
            if (x.status == 401) {
                app.vent.trigger('user:login');
            }
        },
        error: function (x, status, error) {
            if (x.status == 401) {
                alert("Sorry, your session has expired. Please login again to continue");
                app.vent.trigger('user:login');
            }
            else {
                alert("An error occurred: " + status + "nError: " + error);
            }
        }
    });

    app.start();
});
