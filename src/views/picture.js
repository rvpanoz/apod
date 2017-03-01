const _ = require('lodash');
const Marionette = require('backbone.marionette');
const template = require('../templates/picture.hbs');
const config = require('../config');

const moment = require('moment');

var PictureView = Marionette.View.extend({
  template: template,
  className: 'col-lg-3 col-md-4 col-xs-6 thumb',
  serializeData() {
    var model = this.model;
    return _.extend(model.toJSON());
  }
});

module.exports = PictureView;
