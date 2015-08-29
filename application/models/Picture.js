/*global define */

define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        url: app.urls.base,
        defaults: {
            url: '',
            media_type: '',
            explanation: true,
            concepts: [],
            title: ''
        }
    });
});

