const Marionette = require('backbone.marionette');
const template = require('../templates/home.hbs')
const config = require('../config');
const Schema = require('schemas/schema');

var HomeView = Marionette.View.extend({
  template: template,
  modelEvents: {
    'sync': 'render'
  },
  events: {
    'click a.discover': 'onNavigate'
  },
  initialize() {
    this.model = new Schema.Picture();
    this.model.fetch({
      data: {
        hd: true
      }
    });
  },
  onNavigate(e) {
    e.preventDefault();
    app.navigate('discover');
    return false;
  },
  serializeData() {
    return _.extend(this.model.toJSON(), {
      pageTitle: 'Home'
    })
  }
});

module.exports = HomeView;
