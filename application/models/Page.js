/*global define */

define([
  'backbone'
], function (Backbone) {
  'use strict';

  return Backbone.Model.extend({
    defaults: {
      title: 'Page title',
      content: 'Page content',
      active: false,
      name: '404'
    }
  });
});

