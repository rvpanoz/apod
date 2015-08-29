/*global define */

define([
    'marionette',
    'templates',
    'underscore',
    'models/Picture'
], function (Marionette, templates, _, Picture) {
    'use strict';
    return Marionette.ItemView.extend({
        template: templates.pages.pictureTpl,
        initialize: function () {
            this.model = this.options.model || new Picture();
            this.listenTo(this.model, 'change', this.render, this);
        },
        onShow: function () {
            var model = this.model, url = null;
            if (this.model.get('media_type') == 'video') {
                
            }

        },
        templateHelpers: function () {
            return {
                items: this.model.toJSON()
            };
        }
    });
});
