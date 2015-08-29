/*global define */

define([
  'marionette',
  'tpl!templates/notification.html'
], function (Marionette, notificationTpl) {
  'use strict';

  return Marionette.ItemView.extend({
    template: notificationTpl,
    events: {
      'click #clear': function(evt) {
        evt.preventDefault();
        this.trigger('dialog:close');
      },
      'click #remove': function(evt) {
        evt.preventDefault();
        this.model.destroy();
        this.trigger('dialog:close');
      },
      'click .dismiss': function (e) {
        e.preventDefault();
        this.trigger('dialog:close');
      }
    },
    templateHelpers: function() {
      return {
        type: 'danger'
      }
    }
  });
});
