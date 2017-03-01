const Marionette = require('backbone.marionette');
const Schema = require('schemas/picture');
const template = require('templates/home.hbs');
const moment = require('moment');
const PictureView = require('./picture');
const config = require('../config');

var fd = moment().format('YYYY-MM-DD');

var HomeView = Marionette.CompositeView.extend({
  template: template,
  className: 'container home',
  childView: PictureView,
  childViewContainer: '.pictures',
  data: {
    date: fd,
    hd: true
  },
  ui: {
    date: 'input#input-date'
  },
  events: {
    'click button.btn-search': 'onFind'
  },
  initialize() {
    this.collection = new Schema.Pictures();
  },
  onFind(e) {
    e.preventDefault();
    this.collection.fetch({
      data: this.data,
      success: _.bind(function(response) {
        this.render();
      }, this)
    });
    return false;
  },
  onRender() {
    var d = this.getUI('date');

    d.datepicker({
      language: 'en',
      dateFormat: 'yyyy-mm-dd',
      autoClose: true,
      onSelect: _.bind(function(fd, d) {
        this.data['date'] = fd;
      }, this)
    });
  },
  serializeData() {
    return {
      title: 'Home'
    }
  }
});

module.exports = HomeView;
