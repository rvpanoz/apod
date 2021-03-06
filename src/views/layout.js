const Marionette = require('backbone.marionette');
const fontawesome = require('assets/font-awesome/css/font-awesome.min.css');
const bootstrapCss = require('bootstrap/dist/css/bootstrap.css');
const appCss = require('assets/css/app.css');
const template = require('../templates/layout.hbs')
const config = require('../config');
const HeaderView = require('./common/header');
const SidebarView = require('./common/sidebar');

require('assets/css/apod.css');
require('assets/css/animate.min.css');

var LayoutView = Marionette.View.extend({
  template: template,
  regions: {
    headerRegion: '#header',
    mainRegion: '#main'
  },
  initialize() {
    /**
     * [load main view]
     */
    this.listenTo(app, 'app:loadView', _.bind(function (url) {
      var View = require("views/" + url.cls);
      var params = _.extend(url.params, {});

      app.activeView = new View(params);
      this.showChildView('mainRegion', app.activeView);
    }, this));
  },
  onRender() {
    var headerView = new HeaderView();
    this.showChildView('headerRegion', headerView);
  }
});

module.exports = LayoutView;
