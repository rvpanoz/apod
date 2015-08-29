/*global define */

define(function (require) {
  'use strict';

  return {
    pages: {
      home: require('tpl!templates/pages/home.html'),
      pictureTpl: require('tpl!templates/pages/picture.html'),
      filtersTpl: require('tpl!templates/pages/filters.html'),
      help: require('tpl!templates/pages/help.html')
    },
    notificationTpl: require('tpl!templates/notification.html'),
    page: require('tpl!templates/page.html'),
    menuItem: require('tpl!templates/menuItem.html'),
    footer: require('tpl!templates/footer.html')
  };
});

