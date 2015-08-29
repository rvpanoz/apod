/*global define */

define([
    'marionette',
    'views/MenuItemView'
], function (Marionette, MenuItemView) {
    'use strict';

    return Marionette.CollectionView.extend({
        childView: MenuItemView,
        tagName: 'ul',
        id: 'menu-top',
        className: 'nav navbar-nav navbar-right'
    });

});
