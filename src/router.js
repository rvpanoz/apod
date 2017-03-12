const _ = require('lodash');
const Backbone = require('backbone');
const lib = require('./lib');

module.exports = Backbone.Router.extend({
  routes: {
    '*actions': 'do_action'
  },
  do_action: function (actions) {
    var token = localStorage.getItem('token');
    var url = lib.decode(actions), opts;

    //fix url
    if (!url || _.isNull(url)) {
      url = {
        cls: 'home'
      }
    }

    //load the view
    app.onAppEvent('app:loadView', url);
  }
});
