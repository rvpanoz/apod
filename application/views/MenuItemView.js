/*global define */

define([
  'marionette',
  'templates',
  'models/Page'
], function (Marionette, templates, Page) {
  'use strict';

  return Marionette.ItemView.extend({
    template: templates.menuItem,
    tagName: 'li',
    model: Page,
    ui: {
      link: 'a'
    },
    events: {
      'click a': 'activateMenu'
    },
    modelEvents: {
      "change:active": function () {
        this.render();
      }
    },
    activateMenu: function (event) {
      app.vent.trigger('menu:activate', this.model);
    },
    onRender: function () {
      if (this.model.get('active'))
        this.$el.addClass('active');
    }

  });
});
