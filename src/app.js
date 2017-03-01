const Marionette = require('backbone.marionette');
const LayoutView = require('views/layout');
const Router = require('./router');
const config = require('./config');

var app = Marionette.Application.extend({
  region: '#app-content',

  onBeforeStart() {
    /**
     * Instatiate router
     * @type {Router}
     */
    this.router = new Router();
  },
  onStart() {
    /**
     * setup config
     */
    this.config = _.extend({}, config);

    /**
     * Show layout view
     */
    this.showView(new LayoutView());

    /**
     * Backbone history start
     */
    if (Backbone.history) {
      Backbone.history.start();
    }

    /**
     * Global app events
     */
    this.listenTo(this, 'app:signin', this.onSignin, this, arguments);
    this.listenTo(this, 'app:signout', this.onSignout, this, arguments);
    this.listenTo(this, 'hide:sidebar', this.onHideSidebar, this, arguments);
  },

  onAppEvent(event, opts) {
    this.trigger(event, opts);
  },

  navigate(cls, params) {
    var url = {};
    _.extend(url, {
      cls: cls,
      params: params
    });
    this.trigger('hide:filters');
    this.router.navigate(JSON.stringify(url), {
      trigger: true
    });
    this.trigger('hide:sidebar');
    return false;
  },

  wait(active) {
    var spinner = $('.loading');
    if (active == true) {
      spinner.show();
    } else if (active == false) {
      setTimeout(function() {
        spinner.hide();
      }, 1000);
    }
  },

  showMessage(message, type) {
    alert(message);
  }
});

module.exports = app;
