const Marionette = require('backbone.marionette');
const template = require('../templates/discover.hbs')
const config = require('../config');
const moment = require('moment');
const Schema = require('schemas/schema');

require('../plugins/datepicker/js/datepicker.min');
require('../plugins/datepicker/js/i18n/datepicker.en');
require('../plugins/datepicker/css/datepicker.min.css');

var DiscoverView = Marionette.View.extend({
  template: template,
  date: moment(),
  isFullpageInitialized: false,
  modelEvents: {
    'sync': 'render'
  },
  ui: {
    img: 'img.apod',
    date: '.datepicker-here'
  },
  events: {
    'click div.navigate': 'onNavigate'
  },
  initialize() {
    this.model = new Schema.Picture();
    this.model.fetch({
      data: {
        hd: true
      }
    });
  },

  onRender() {
    var apod = this.getUI('apod');
    var src = this.model.get('url');

    //** entry_date
    this.ui.date.datepicker({
      language: 'en',
      dateFormat: 'yyyy/mm/dd',
      autoClose: false,
      onSelect: _.bind(function(fd, d) {
        this.date = moment(d);
        this.model.fetch({
          data: {
            date: this.date.format('YYYY-MM-DD'),
            hd: true
          }
        });
      }, this)
    });
  },
  onNavigate(e) {
    e.preventDefault();
    var date = moment();
    var control = $(e.currentTarget);
    var action = control.data('slide');
    var isInvalid = false;

    switch (action) {
      case 'next':
        var nextDate = this.date.add(1, 'days');
        if (date > nextDate) {
          this.date = nextDate;
        } else {
          this.date = date;
          isInvalid = true;
        }
        break;
      default:
        this.date.subtract(1, "days");
    }

    if (!isInvalid) {
      this.model.fetch({
        data: {
          date: this.date.format('YYYY-MM-DD'),
          hd: true
        }
      });
    } else {
      console.info('Date is greater than today.. no APOD found.');
    }

  },
  serializeData() {
    return _.extend(this.model.toJSON(), {
      pageTitle: 'Discover'
    });
  }
});

module.exports = DiscoverView;
