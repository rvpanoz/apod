const Marionette = require('backbone.marionette');
const Bootstrap = require('bootstrap/dist/js/bootstrap.min');
const template = require('templates/layout.hbs');

const datepicker = require('../plugins/datepicker/js/datepicker.min');
const datepickerEN =  require('../plugins/datepicker/js/i18n/datepicker.en');

const bootstrapCSS = require('bootstrap/dist/css/bootstrap.min.css');
const appCSS = require('../assets/css/app.css');
const fullCalendarCSS = require('fullcalendar/dist/fullcalendar.css');
const datepickerCSS = require('../plugins/datepicker/css/datepicker.min.css');

var Layout = Marionette.View.extend({
  template: template,
  className: 'wrapper',
  regions: {
    mainRegion: '#main-content',
  },
  initialize() {
    //loadView: attach view to mainRegion content
    this.listenTo(app, 'app:loadView', _.bind(function (url) {
      var View = require("views/" + url.cls);
      var params = _.extend(url.params, {});

      app.activeView = new View(params);
      this.showChildView('mainRegion', app.activeView);
    }, this));
  }
});

module.exports = Layout;
