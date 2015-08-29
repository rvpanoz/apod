define([
    'marionette',
    'templates',
    'views/picture',
    'views/filters'
], function (Marionette, templates, PictureView, FiltersView) {
    'use strict';
    return Marionette.LayoutView.extend({
        template: templates.pages.home,
        regions: {
            picture: "#picture-view",
            filters: '#filters-view'
        },
        childEvents: {
            'picture:fetched': function (childView, picture) {
                this.getRegion('picture').show(new PictureView({
                    model: picture
                }));
            }
        },
        onBeforeShow: function () {
            this.getRegion('filters').show(new FiltersView());
        }
    });
});
