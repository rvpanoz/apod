const config = require('app-config');
const Marionette = require('backbone.marionette');
const Schema = require('schemas/picture');
const template = require('templates/home.hbs');
const Picture = require('views/picture');
const moment = require('moment');
const Calendar = require('fullcalendar');
const async = require('async');

var fd = moment().format('YYYY-MM-DD');

var HomeView = Marionette.View.extend({
  template: template,
  className: 'container home',
  regions: {
    pictureRegion: '#picture-modal'
  },
  data: {
    date: fd,
    hd: true
  },
  initialize() {
    this.collection = new Schema.Pictures();
  },
  onBeforeRender() {

  },
  onAttach() {
    var _this = this;

    var events = [];
    var now = moment();
    var startOf = moment().startOf('month');
    var diff = now.diff(startOf, 'days');

    if (diff == 0) {
      diff = 1;
    }

    var d = startOf;
    for (var z = 0; z < diff; z++) {
      d = d.add(1, 'days');

      var model = new Schema.Picture();

      model.fetch({
        data: {
          date: d.format('YYYY-MM-DD')
        },
        success() {
          _this.render();

          events.push({
            title: model.get('title'),
            start: d.format('YYYY-MM-DD')
          });

          _this.$('#calendar').fullCalendar({
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: moment().format('YYYY-MM-DD'),
            defaultView: 'month',
            nowIndicator: true,
            events: events,
            eventRender: function(event, element) {
              // console.log($(this).fullCalendar('getDate'));
            },
            dayClick: function(date, jsEvent, view) {
              // var dateFormatted = moment(new Date(date)).format('YYYY-MM-DD');
              //
              // _this.data['date'] = dateFormatted;
              // _this.collection.fetch({
              //   data: _this.data,
              //   success: _.bind(function(c) {
              //     var apod = new Picture({
              //       model: c.first()
              //     });
              //     _this.showChildView('pictureRegion', apod);
              //   }, _this)
              // });
            }
          });
        }
      });


    }


  },
  serializeData() {
    if (!this.collection.length) return;
    return _.extend(this.collection.first().toJSON());
  }
});

module.exports = HomeView;
